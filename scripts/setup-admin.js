import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../backend/models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in .env');
  process.exit(1);
}

const setupAdmin = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const username = process.argv[2] || 'admin';
    const password = process.argv[3] || 'password123';

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log(`User ${username} already exists. Updating password...`);
      existingUser.password = await bcrypt.hash(password, 10);
      await existingUser.save();
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
      });
      await newUser.save();
      console.log(`Admin user created: ${username}`);
    }

    console.log('Setup complete');
    process.exit(0);
  } catch (err) {
    console.error('Error setting up admin:', err);
    process.exit(1);
  }
};

setupAdmin();
