const express = require('express');
const { getHotels, getHotelById, addHotel, updateHotel, deleteHotel } = require('../controllers/hotelController');
const router = express.Router();

// GET all hotels
router.get('/', getHotels);

// GET a single hotel by ID
router.get('/:id', getHotelById);

// POST a new hotel
router.post('/', addHotel);

// PUT update an existing hotel
router.put('/:id', updateHotel);

// DELETE a hotel by ID
router.delete('/:id', deleteHotel);

module.exports = router;