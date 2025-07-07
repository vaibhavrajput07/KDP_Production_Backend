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

  // ✅ Store only safe fields in session
  req.session.user = {
    _id: user._id,
    username: user.username,
    role: user.role,
  };

  console.log('✅ Session set for user:', req.session.user);

  res.json({ msg: 'Logged in', user: req.session.user });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid', {
      path: '/',
      secure: true,
      sameSite: 'none',
    });
    res.json({ msg: 'Logged out' });
  });
});

router.get('/me', (req, res) => {
  console.log('🔍 Session:', req.session); // For debugging
  if (!req.session.user) return res.status(401).json({ msg: 'Not logged in' });
  res.json(req.session.user);
});

module.exports = router;
