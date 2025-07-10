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
const contactUser= require('./routes/contact');
dotenv.config();
const app = express();

const allowedOrigins = [
  // 'http://localhost:5173',
  'https://kdp-production-frontend-7rwu.vercel.app'
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
app.set('trust proxy', 1); // Trust first proxy


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    httpOnly: true,
    secure: true, // should be true only in production with HTTPS
    sameSite: 'none', // or 'none' if secure:true in production
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
}));

app.use((req, res, next) => {
  console.log("🔍 Session User:", req.session.user);
  next();
});


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/members', teamMembers);
app.use('/api/contacts',contactUser);


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
