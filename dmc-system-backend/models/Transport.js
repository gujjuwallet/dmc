const mongoose = require('mongoose');

// Transport Schema
const TransportSchema = new mongoose.Schema({
  vehicleType: { type: String, required: true }, // e.g., 'Bus', 'Car', 'Shuttle'
  route: {
    pickup: { type: String, required: true }, // e.g., 'Airport'
    dropoff: { type: String, required: true }, // e.g., 'Hotel'
  },
  rate: { type: Number, required: true }, // e.g., 50 (currency)
  availability: { type: Boolean, default: true }, // Available for booking or not
  timeOfDay: {
    type: String,
    enum: ['Morning', 'Afternoon', 'Evening', 'Night'],
    required: true
  },
});

module.exports = mongoose.model('Transport', TransportSchema);