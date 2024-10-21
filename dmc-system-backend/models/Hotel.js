const mongoose = require('mongoose');

// Hotel Schema
const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String },
  description: { type: String, required: true },
  facilities: [String], // e.g.,[parking, spa, pool]
  amenities: [String], // e.g., ['Pool', 'Wi-Fi', 'Breakfast']
  rating: { type: Number, min: 1, max: 5 }, // Rating between 1-5
  rooms: [
    {
      roomType: { type: String, required: true }, // e.g., 'Standard', 'Deluxe'
      rate: { type: Number, required: true },
      seasonalRates: [{ season: String, rate: Number }], // Seasonal pricing
      roomAmenities: [String], // e.g., ['AC', 'TV', 'Wi-Fi']
    }
  ],
  contractRates: {
    agentRate: { type: Number, required: true },
    corporateRate: { type: Number, required: true },
  },
  specialContractRates: { // New field for special contracts
    weekendRate: { type: Number },
    longStayRate: { type: Number },
  },
  cancellationPolicy: { type: String }, // e.g., 'Free cancellation within 24 hours'
  checkInTime: { type: String }, // e.g., '14:00'
  checkOutTime: { type: String }, // e.g., '12:00'
  availability: { type: Boolean, default: true },
});

module.exports = mongoose.model('Hotel', HotelSchema);
