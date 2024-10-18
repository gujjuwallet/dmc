const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Schema for domestic-specific fields
const DomesticSchema = new mongoose.Schema({
  cities: { type: [String] }, // e.g., ['Delhi', 'Agra']
  transport: { type: String }, // e.g., 'Bus', 'Train'
  accommodations: { type: String }, // e.g., '3-star hotel'
  localAttractions: { type: [String], default: [] }, // e.g., ['Taj Mahal', 'Qutub Minar']
}, { _id: false });

// Schema for international-specific fields
const InternationalSchema = new mongoose.Schema({
  visaRequired: { type: Boolean }, // Optional
  currency: { type: String }, // Optional
  airportTransfer: { type: Boolean, default: false },
  layovers: { type: [String], default: [] }, // List of layovers if applicable
}, { _id: false });

// Schema for weekend-specific fields
const WeekendSchema = new mongoose.Schema({
  activities: { type: [String], default: [] }, // Optional
  duration: { type: String }, // Optional
  nearbyAttractions: { type: [String], default: [] }, // Optional
}, { _id: false });

// Main Package Schema
const PackageSchema = new mongoose.Schema({
  code: { 
    type: String, 
    default: () => uuidv4(), // Generate code using uuid
    unique: true 
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] }, // e.g., ['Luxury', 'Adventure', 'Family']
  destinations: { type: [String], required: true }, // e.g., ['Paris', 'London']
  tripType: {
    type: String,
    enum: ['Domestic', 'International', 'Weekend'],
    required: true
  },
  isOneWay: { type: Boolean, required: true }, // One-way or return trip
  departureAirport: { type: String, required: true }, // e.g., 'JFK'
  returnAirport: { type: String }, // Optional for return trips

  // Conditional sub-documents based on tripType
  domesticDetails: { type: DomesticSchema }, // Required for domestic packages
  internationalDetails: { type: InternationalSchema }, // Not required for domestic packages
  weekendDetails: { type: WeekendSchema }, // Not required for domestic packages

  // Pricing and availability
  agentRate: { type: Number, required: true },
  clientRate: { type: Number, required: true },
  availability: { type: Boolean, default: true } // Whether package is available
});

module.exports = mongoose.model('Package', PackageSchema);
