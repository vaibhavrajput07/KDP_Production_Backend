// backend/models/Contact.js
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters'],
    maxlength: [50, 'First name must be less than 50 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters'],
    maxlength: [50, 'Last name must be less than 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },
  phoneNo: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian phone number'],
  },
  buisness: {
    type: String,
    required: [true, 'Firm is required'],
    trim: true,
    minlength: [4, 'Firm must be 4 characters'],
  },
  work: {
    type: String,
    required: [true, 'Work field is required'],
    minlength: [3, 'Work must be at least 3 characters'],
    maxlength: [100, 'Work must be less than 100 characters'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    minlength: [10, 'Message must be at least 10 characters'],
    maxlength: [20, 'Message must be less than 1000 characters'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Contact_User', ContactSchema);
