const db = require('../../db/models');

const Transportation = db.Transportation

const createTransportation = (req, res) => {
  const transportation = {
    plat: req.body.plat.toUpperCase(), 
    mobil: req.body.mobil, 
    supir: req.body.supir, 
    harga: req.body.harga, 
    rute: req.body.rute.toUpperCase(), 
    keberangkatan: req.body.keberangkatan, 
    seat: req.body.seat
  }
  Transportation.create(transportation)
    .then(transportation => {
      res.status(201).json(transportation);
    })
    .catch(error => {
      console.error('Error creating transportation:', error);
      res.status(500).json({ error: 'Error creating transportation' });
    });
};

const getAllTransportations = (req, res) => {
  Transportation.findAll()
    .then(transportations => {
      res.json(transportations);
    })
    .catch(error => {
      console.error('Error retrieving transportations:', error);
      res.status(500).json({ error: 'Error retrieving transportations' });
    });
};

const getTransportationById = (req, res) => {
  const { id } = req.params;
  Transportation.findByPk(id)
    .then(transportation => {
      if (transportation) {
        res.json(transportation);
      } else {
        res.status(404).json({ error: 'Transportation not found' });
      }
    })
    .catch(error => {
      console.error('Error retrieving transportation:', error);
      res.status(500).json({ error: 'Error retrieving transportation' });
    });
};

const updateTransportation = async (req, res) => {
  const { id } = req.params;
  const transportation = {
    plat: req.body.plat.toUpperCase(), 
    mobil: req.body.mobil, 
    supir: req.body.supir, 
    harga: req.body.harga, 
    rute: req.body.rute.toUpperCase(), 
    keberangkatan: req.body.keberangkatan, 
    seat: req.body.seat
  }
  const theTransportation = await Transportation.findByPk(id)
  theTransportation.update(transportation)
  theTransportation.save()
    .then(transportation => {
      if (transportation) {
        res.json(transportation);
      } else {
        res.status(404).json({ error: 'Transportation not found' });
      }
    })
    .catch(error => {
      console.error('Error updating transportation:', error);
      res.status(500).json({ error: 'Error updating transportation' });
    });
};

const deleteTransportation = (req, res) => {
  const { id } = req.params;
  Transportation.findByPk(id)
    .then(transportation => {
      if (transportation) {
        return transportation.destroy();
      } else {
        res.status(404).json({ error: 'Transportation not found' });
      }
    })
    .then(() => {
      res.json({ message: 'Transportation deleted successfully' });
    })
    .catch(error => {
      console.error('Error deleting transportation:', error);
      res.status(500).json({ error: 'Error deleting transportation' });
    });
};

module.exports = {
  createTransportation,
  getAllTransportations,
  getTransportationById,
  updateTransportation,
  deleteTransportation
}


