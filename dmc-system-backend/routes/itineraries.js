const express = require('express');
const {
  getItineraries,
  getItineraryById,
  addItinerary,
  updateItinerary,
  deleteItinerary
} = require('../controllers/itineraryController');

const router = express.Router();

// GET all itineraries
router.get('/', getItineraries);

// GET a single itinerary by ID
router.get('/:id', getItineraryById);

// POST a new itinerary
router.post('/', addItinerary);

// PUT update an existing itinerary
router.put('/:id', updateItinerary);

// DELETE an itinerary
router.delete('/:id', deleteItinerary);

module.exports = router;