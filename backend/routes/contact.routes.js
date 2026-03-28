const express = require('express');
const ContactMessage = require('../models/ContactMessage');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ message: 'All fields required' });
  try {
    const newMsg = await ContactMessage.create({ name, email, message });
    res.status(201).json({ message: 'Message sent', data: newMsg });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;