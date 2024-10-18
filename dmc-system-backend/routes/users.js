const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/authMiddleware');

// Register new users (Admin, Agent, CorporateClient)
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ name, email, password, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  // Ensure email and password are provided
  if (!email || !password) {
    console.log('Email or password missing');
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Email not found:', email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    bcrypt.compare(password, user.password, function(err, isMatch) {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (!isMatch) {
        console.log('Password mismatch for email:', email);
        return res.status(400).json({ message: 'Invalid password' });
      }

      // Password matches, generate JWT token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      console.log('Login successful for email:', email);
      res.json({
         token,
         user: {
          id: user._id,
          name: user.name, // Include the name
          email: user.email,
          role: user.role
        }
         });
    });
    
  } catch (error) {
    console.error('Error during login:', error);
    next(error); // Passes any errors to the error handler
  }
});

// Test Password Hashing Route
router.post('/test-password', async (req, res) => {
  const { password } = req.body; // Get password from request body

  // Load the hashed password from your database
  const user = await User.findOne({ email: 'admin@dmc.com' }); // Adjust email as necessary
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Compare the provided password with the stored hash
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error comparing passwords' });
    }

    if (result) {
      return res.json({ message: 'Password is correct' });
    } else {
      return res.json({ message: 'Password is incorrect' });
    }
  });
});


// Protected route (only accessible by Admins)
router.get('/admin-only', authMiddleware('Admin'), (req, res) => {
  res.status(200).json({ message: 'Welcome, Admin!' });
});

// Protected route (only accessible by Agents)
router.get('/agent-only', authMiddleware('Agent'), (req, res) => {
  res.status(200).json({ message: 'Welcome, Agent!' });
});

// Protected route (only accessible by Corporate Clients)
router.get('/corporate-only', authMiddleware('CorporateClient'), (req, res) => {
  res.status(200).json({ message: 'Welcome, Corporate Client!' });
});

module.exports = router;