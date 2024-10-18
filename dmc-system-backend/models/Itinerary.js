const mongoose = require('mongoose');

// Itinerary Schema
const ItinerarySchema = new mongoose.Schema({
  package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true }, // Linked package
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  transport: { type: mongoose.Schema.Types.ObjectId, ref: 'Transport', required: true },
  additionalServices: [String], // e.g., ['City Tour', 'Safari']
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  price: { type: Number, required: true }, // Total price for the itinerary
  availability: { type: Boolean, default: true },
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);