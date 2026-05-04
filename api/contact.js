import express from 'express';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const recipientEmail = process.env.CONTACT_EMAIL_RECIPIENT;

  if (!recipientEmail) {
    console.error('CONTACT_EMAIL_RECIPIENT not configured in environment variables.');
    // In a production scenario, you might want to return a generic error or log this to a monitoring service.
    // For now, we'll proceed but indicate it might not be emailed.
    // return res.status(500).json({ message: 'Server configuration error. Email recipient not set.' });
  }

  console.log('Received contact message:', { name, email, message, recipient: recipientEmail });

  try {
    // --- Email Sending Logic Placeholder ---
    // This is where you would integrate your email sending service (e.g., Nodemailer, SendGrid, etc.)
    // Example using Nodemailer (requires setup and credentials):
    /*
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true', // Use 'true' if port 465, false otherwise
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER}>`, // Sender address
      to: recipientEmail, // Recipient address
      subject: `New Contact Message from ${name}`, // Subject line
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b> ${message}</p>`, // HTML body
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    */
    // --- End of Email Sending Logic Placeholder ---

    // For now, we'll just log and confirm receipt.
    res.status(200).json({ message: 'Message received successfully! (Email sending not yet configured)' });

  } catch (error) {
    console.error('Error processing contact message:', error);
    // In a real scenario, you'd want more specific error handling.
    res.status(500).json({ message: 'Failed to send message. Please try again later.', error: error.message });
  }
});

export default router;
