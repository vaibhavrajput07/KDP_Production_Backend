// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const teamMembers =require('./routes/teamMembers');

dotenv.config();
const app = express();

const allowedOrigins = [
  'https://kdp-production-frontend-7rwu.vercel.app',
  'https://kdp-production-frontend-7rwu-mgfm2n73k.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    httpOnly: true,
    secure: false, // should be true only in production with HTTPS
    sameSite: 'lax', // or 'none' if secure:true in production
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
}));


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/members', teamMembers);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000; 
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });
