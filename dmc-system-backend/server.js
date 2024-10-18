const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // To load environment variables from a .env file

// Import Routes
const hotelRoutes = require('./routes/hotels');
const transportRoutes = require('./routes/transport');
const itineraryRoutes = require('./routes/itineraries');
const packageRoutes = require('./routes/packages');
const userRoutes = require('./routes/users');  // Import user routes

// Initialize Express App
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse incoming request bodies in JSON format
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Home Route
app.get('/', (req, res) => {
  res.send('Welcome to the DMC Backend API');
});

// Use Routes
app.use('/api/hotels', hotelRoutes);
app.use('/api/transport', transportRoutes);
app.use('/api/itineraries', itineraryRoutes);
app.use('/api/packages', packageRoutes); // This is for the package creation functionality
app.use('/api/users', userRoutes); // Add user routes for registration, login, and role-based access

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Server Error' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
