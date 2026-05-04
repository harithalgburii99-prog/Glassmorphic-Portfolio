import app, { connectDB } from '../server.js';

export default async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (err) {
    res.status(500).json({ message: 'Database connection failed', error: err.message });
  }
};
