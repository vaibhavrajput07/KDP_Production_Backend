const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ['admin'], default: 'admin' },
});

// Prevent creation of more than one admin
userSchema.pre('save', async function (next) {
  const User = mongoose.model('User');

  // Only apply check if the user is an admin and is new
  if (this.isNew && this.role === 'admin') {
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      const error = new Error('Admin already exists. Only one admin allowed.');
      return next(error);
    }
  }

  next();
});

module.exports = mongoose.model('User', userSchema);
