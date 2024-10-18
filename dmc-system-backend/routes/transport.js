const express = require('express');
const { getTransportOptions, addTransport, getTransportById, updateTransport, deleteTransport } = require('../controllers/transportController');
const router = express.Router();

// GET all transport options
router.get('/', getTransportOptions);

// GET a single transport option by ID
router.get('/:id', getTransportById);

// POST a new transport option
router.post('/', addTransport);

// PUT to update an existing transport option
router.put('/:id', updateTransport);

// DELETE a transport option
router.delete('/:id', deleteTransport);

module.exports = router;