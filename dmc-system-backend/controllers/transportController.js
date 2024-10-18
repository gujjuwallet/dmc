const Transport = require('../models/Transport');

// Get all transport options
const getTransportOptions = async (req, res) => {
  try {
    const transports = await Transport.find();
    res.json(transports);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a single transport option by ID
const getTransportById = async (req, res) => {
  try {
    const transport = await Transport.findById(req.params.id);
    if (!transport) {
      return res.status(404).json({ message: 'Transport option not found' });
    }
    res.json(transport);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add new transport option
const addTransport = async (req, res) => {
  try {
    const { vehicleType, route, rate, availability, timeOfDay } = req.body;

    const newTransport = new Transport({
      vehicleType,
      route,
      rate,
      availability,
      timeOfDay,
    });

    await newTransport.save();
    res.status(201).json(newTransport);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update an existing transport option
const updateTransport = async (req, res) => {
  try {
    const { vehicleType, route, rate, availability, timeOfDay } = req.body;

    const updatedTransport = await Transport.findByIdAndUpdate(
      req.params.id,
      { vehicleType, route, rate, availability, timeOfDay },
      { new: true }
    );

    if (!updatedTransport) {
      return res.status(404).json({ message: 'Transport option not found' });
    }

    res.json(updatedTransport);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a transport option
const deleteTransport = async (req, res) => {
  try {
    const transport = await Transport.findById(req.params.id);
    if (!transport) {
      return res.status(404).json({ message: 'Transport option not found' });
    }
    await transport.deleteOne();
    res.json({ message: 'Transport option deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getTransportOptions,
  getTransportById,
  addTransport,
  updateTransport,
  deleteTransport,
};
