// routes.js
const express = require("express");
const routes = express();

const transportationController = require("../controllers/transportation.controller");
const transactionController = require("../controllers/transaction.controller");
const authJWT = require('../middleware/authJWT')

routes.use(authJWT)
//transaction
routes.post("/transaction", transactionController.createTransaction);
routes.get("/transaction", transactionController.getAllTransaction);
routes.get("/transaction/:id", transactionController.getTransactionById);
routes.delete("/transaction/:id", transactionController.deleteTransaction);

// transportation
routes.post("/transportation", transportationController.createTransportation);
routes.get("/transportation", transportationController.getAllTransportations);
routes.get(
  "/transportation/:id",
  transportationController.getTransportationById
);
routes.put(
  "/transportation/:id",
  transportationController.updateTransportation
);
routes.delete(
  "/transportation/:id",
  transportationController.deleteTransportation
);

module.exports = routes;
