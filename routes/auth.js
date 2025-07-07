// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  req.session.user = user;
  res.json({ msg: 'Logged in', user: { username: user.username, role: user.role } });
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.json({ msg: 'Logged out' });
});

router.get('/me', (req, res) => {
   console.log('🔍 Session:', req.session); // <== check if session exists
  if (!req.session.user) return res.status(401).json({ msg: 'Not logged in' });
  res.json(req.session.user);
});

module.exports = router;
