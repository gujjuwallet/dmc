const Package = require('../models/Package');

// Get all packages
const getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get a single package by ID
const getPackageById = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(package);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Add a new package
const addPackage = async (req, res) => {
  try {
    const {
      name,
      description,
      tags,
      destinations,
      tripType,
      isOneWay,
      departureAirport,
      returnAirport,
      domesticDetails,
      internationalDetails,
      weekendDetails,
      agentRate,
      clientRate,
      availability,
    } = req.body;

    let packageData = {
      name,
      description,
      tags,
      destinations,
      tripType,
      isOneWay,
      departureAirport,
      returnAirport,
      agentRate,
      clientRate,
      availability,
    };

    // Attach the specific tripType details
    if (tripType === 'Domestic') {
      packageData.domesticDetails = domesticDetails;
    } else if (tripType === 'International') {
      packageData.internationalDetails = internationalDetails;
    } else if (tripType === 'Weekend') {
      packageData.weekendDetails = weekendDetails;
    }

    const newPackage = new Package(packageData);
    await newPackage.save();

    res.status(201).json(newPackage);
  } catch (error) {
    console.error('Error adding package:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update a package by ID
const updatePackage = async (req, res) => {
  try {
    const {
      name,
      description,
      tags,
      destinations,
      tripType,
      isOneWay,
      departureAirport,
      returnAirport,
      domesticDetails,
      internationalDetails,
      weekendDetails,
      agentRate,
      clientRate,
      availability,
    } = req.body;

    let packageData = {
      name,
      description,
      tags,
      destinations,
      tripType,
      isOneWay,
      departureAirport,
      returnAirport,
      agentRate,
      clientRate,
      availability,
    };

    // Attach the specific tripType details
    if (tripType === 'Domestic') {
      packageData.domesticDetails = domesticDetails;
    } else if (tripType === 'International') {
      packageData.internationalDetails = internationalDetails;
    } else if (tripType === 'Weekend') {
      packageData.weekendDetails = weekendDetails;
    }

    const updatedPackage = await Package.findByIdAndUpdate(req.params.id, packageData, { new: true });

    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.json(updatedPackage);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Delete a package by ID
const deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Validate package data before adding/updating
const validatePackageData = (req, res, next) => {
  const { tripType, domesticDetails, internationalDetails, weekendDetails } = req.body;

  if (tripType === 'Domestic' && !domesticDetails) {
    return res.status(400).json({ message: 'Domestic details are required for Domestic trips.' });
  }
  if (tripType === 'International' && !internationalDetails) {
    return res.status(400).json({ message: 'International details are required for International trips.' });
  }
  if (tripType === 'Weekend' && !weekendDetails) {
    return res.status(400).json({ message: 'Weekend details are required for Weekend trips.' });
  }

  next();
};

module.exports = {
  getPackages,
  getPackageById,
  addPackage,
  updatePackage,
  deletePackage,
  validatePackageData,
};
