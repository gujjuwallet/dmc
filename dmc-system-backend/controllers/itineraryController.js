const Itinerary = require('../models/Itinerary');

// Get all itineraries
const getItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find().populate('hotel transport package');
    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a single itinerary by ID
const getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id).populate('hotel transport package');
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add new itinerary
const addItinerary = async (req, res) => {
  try {
    const { package, hotel, transport, additionalServices, startDate, endDate, price, availability } = req.body;

    const newItinerary = new Itinerary({
      package,
      hotel,
      transport,
      additionalServices,
      startDate,
      endDate,
      price,
      availability: availability ?? true
    });

    await newItinerary.save();
    res.status(201).json(newItinerary);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update an itinerary
const updateItinerary = async (req, res) => {
  try {
    const { package, hotel, transport, additionalServices, startDate, endDate, price, availability } = req.body;

    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    itinerary.package = package;
    itinerary.hotel = hotel;
    itinerary.transport = transport;
    itinerary.additionalServices = additionalServices;
    itinerary.startDate = startDate;
    itinerary.endDate = endDate;
    itinerary.price = price;
    itinerary.availability = availability;

    const updatedItinerary = await itinerary.save();
    res.json(updatedItinerary);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete an itinerary
const deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    await itinerary.remove();
    res.json({ message: 'Itinerary deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getItineraries,
  getItineraryById,
  addItinerary,
  updateItinerary,
  deleteItinerary
};
