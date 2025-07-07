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

app.use(cors({ 
  origin: 'https://kdp-production-frontend-7rwu.vercel.app/', 
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

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(5000, () => console.log('Server running on http://localhost:5000'));
}).catch((err)=>{console.log("MongoDB Error : " , err)});
