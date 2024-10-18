const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config(); // Load environment variables
const User = require('./models/User'); // Adjust the path if needed

const saltRounds = 10; // Define salt rounds for bcrypt

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    seedAdminUser();
  })
  .catch(err => console.error(err));

// Function to create admin user
const seedAdminUser = async () => {
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@dmc.com' });

    if (!existingAdmin) {
      // Use bcrypt to hash password
      const plainPassword = 'Admin@1234'; // Original password

          const newAdmin = new User({
            name: 'Jay Dafda',
            email: 'admin@dmc.com',
            password: 'Admin@1234', // Save the hashed password
            role: 'Admin',  // Set role to 'Admin'
          });
            
          //  doller 85 ruppe  ,
          // gate way charge 3%
            
            await newAdmin.save(); // Save the new admin user to the database
            console.log('Admin user created successfully');

          // Disconnect from MongoDB after saving
          mongoose.disconnect();
      
    } else {
      console.log('Admin user already exists');
      mongoose.disconnect(); // Disconnect MongoDB if the admin user already exists
    }
  } catch (err) {
    console.error('Error creating admin user:', err);
    mongoose.disconnect(); // Ensure disconnection in case of an error
  }
};
