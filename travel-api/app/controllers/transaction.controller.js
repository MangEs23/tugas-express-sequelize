const { sequelize } = require("../../db/models");
const { QueryTypes } = require("sequelize");
const db = require("../../db/models");

const Transaction = db.Transaction;
const Admin = db.Admin;
const Transportation = db.Transportation;

const createTransaction = async (req, res) => {
  const transportation = await Transportation.findOne({
    where: {
      id: req.body.transportation_id,
    },
  });
  const admin = await Admin.findOne({
    where: {
      id: req.body.admin_id
    }
  })
  const banyak = req.body.banyak;
  const total = transportation.harga * banyak;
  const transaction = {
    nama: req.body.nama,
    banyak: banyak,
    total: total,
    transportation_id: transportation.id,
    admin_id: admin.id,
    tanggal: new Date(),
  };
  if (transportation.seat == 0 || transportation.seat == null) {
    res.status(500).send({ error: "Seat has Full" });
    return;
  }
  const updatedSeat = { seat: transportation.seat - banyak };
  await transportation.update(updatedSeat);
  Transaction.create(transaction)
    .then((transaction) => {
      res.status(201).send(transaction);
    })
    .catch((error) => {
      console.error("Error creating transaction:", error);
      res.status(500).send({ error: "Error creating transaction" });
    });
};

const getAllTransaction = async (req, res) => {
  await sequelize
    .query(
      "SELECT `Transactions`.`id` AS `id`, `nama`, `banyak`, `total`, `Transportation`.`plat` AS `plat`, `Transportation`.`mobil` AS `mobil`, `Transportation`.`supir` AS `supir`, `Transportation`.`harga` AS `harga`, `Transportation`.`rute` AS `rute` FROM `Transactions` LEFT JOIN `Transportation` ON `Transactions`.`transportation_id` = `Transportation`.`id`; ",
      { type: QueryTypes.SELECT }
    )
    .then((transaction) => {
      res.send(transaction);
    })
    .catch((error) => {
      console.error("Error retrieving transaction:", error);
      res.status(500).send({ error: "Error retrieving transaction" });
    });
};

const getTransactionById = async (req, res) => {
  await sequelize
    .query(
      "SELECT `Transactions`.`id` AS `id`, `nama`, `banyak`, `total`, `Transportation`.`plat` AS `plat`, `Transportation`.`mobil` AS `mobil`, `Transportation`.`supir` AS `supir`, `Transportation`.`harga` AS `harga`, `Transportation`.`rute` AS `rute`, `Transportation`.`keberangkatan` FROM `Transactions` LEFT JOIN `Transportation` ON `Transactions`.`transportation_id` = `Transportation`.`id` WHERE `Transactions`.`id` = :paramsId ; ",
      {
        replacements: {
          paramsId: req.params.id,
        },
        type: QueryTypes.SELECT,
      }
    )
    .then((transaction) => {
      res.send(transaction);
    })
    .catch((error) => {
      console.error("Error retrieving transaction:", error);
      res.status(500).send({ error: "Error retrieving transaction" });
    });
};

const deleteTransaction = async (req, res, next) => {
  const { id } = req.params;
  const transaction = await Transaction.findByPk(id);
  if (!transaction) {
    res.status(404).send({ error: "transaction not found" });
    return;
  }
  const transportation = await Transportation.findOne({
    where: {
      id: transaction.transportation_id,
    },
  });
  const updatedSeat = { seat: transportation.seat + transaction.banyak };
  await transportation.update(updatedSeat);
  transaction
    .destroy()
    .then(() => {
      res.send({ message: "transaction deleted successfully" });
      next()
    })
    .catch((error) => {
      console.error("Error deleting transaction:", error);
      res.status(500).send({ error: "Error deleting transaction" });
    });
};

module.exports = {
  createTransaction,
  getAllTransaction,
  getTransactionById,
  deleteTransaction,
};
