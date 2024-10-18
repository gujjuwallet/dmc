const express = require('express');
const {
    getPackages,
    getPackageById,
    addPackage,
    updatePackage,
    deletePackage,
    validatePackageData
  } = require('../controllers/packageController');
//const validatePackageData = require('../middleware/validatePackageData');
const router = express.Router();

// GET all packages
router.get('/', getPackages);

// GET single package by ID
router.get('/:id', getPackageById);

// POST a new package
router.post('/', validatePackageData, addPackage);

// PUT to update a package
router.put('/:id', validatePackageData, updatePackage);

// DELETE a package
router.delete('/:id', deletePackage);

module.exports = router;
