import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log(`Login attempt for user: ${username}`);
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1d' }
    );

    console.log('Login successful');
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    console.error('CRITICAL LOGIN ERROR:', err);
    res.status(500).json({ message: 'Server error', details: err.message });
  }
});

// EMERGENCY SETUP ROUTE - DELETE AFTER USE
router.get('/setup-admin-emergency', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash('Zacks911', 10);
    const user = await User.findOneAndUpdate(
      { username: 'hairth' },
      { username: 'hairth', password: hashedPassword },
      { upsert: true, new: true }
    );
    res.json({ message: 'Admin user created/updated successfully', user: { username: user.username } });
  } catch (err) {
    res.status(500).json({ message: 'Setup failed', error: err.message });
  }
});

export default router;
