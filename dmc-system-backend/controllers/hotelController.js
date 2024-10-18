const Hotel = require('../models/Hotel');

// Get all hotels
const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a single hotel by ID
const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add a new hotel
const addHotel = async (req, res) => {
  try {
    const { name, location, contact, amenities, rooms, contractRates, availability } = req.body;

    const newHotel = new Hotel({
      name,
      location,
      contact,
      amenities,
      rooms,
      contractRates,
      availability
    });

    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update an existing hotel
const updateHotel = async (req, res) => {
  try {
    const { name, location, contact, amenities, rooms, contractRates, availability } = req.body;

    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    hotel.name = name || hotel.name;
    hotel.location = location || hotel.location;
    hotel.contact = contact || hotel.contact;
    hotel.amenities = amenities || hotel.amenities;
    hotel.rooms = rooms || hotel.rooms;
    hotel.contractRates = contractRates || hotel.contractRates;
    hotel.availability = availability !== undefined ? availability : hotel.availability;

    const updatedHotel = await hotel.save();
    res.json(updatedHotel);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a hotel
const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    await hotel.deleteOne();
    res.json({ message: 'Hotel removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getHotels, getHotelById, addHotel, updateHotel, deleteHotel };