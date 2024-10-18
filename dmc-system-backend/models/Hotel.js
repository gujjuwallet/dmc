const mongoose = require('mongoose');

// Hotel Schema
const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String },
  amenities: [String], // e.g., ['Pool', 'Wi-Fi', 'Breakfast']
  rooms: [
    {
      roomType: { type: String, required: true }, // e.g., 'Standard', 'Deluxe'
      rate: { type: Number, required: true },
      seasonalRates: [{ season: String, rate: Number }], // Seasonal pricing
    }
  ],
  contractRates: {
    agentRate: { type: Number, required: true },
    corporateRate: { type: Number, required: true },
  },
  availability: { type: Boolean, default: true },
});

module.exports = mongoose.model('Hotel', HotelSchema);