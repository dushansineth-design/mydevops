require('dotenv').config();
console.log('PORT from .env:', process.env.PORT);
console.log('MONGO_URI from .env:', process.env.MONGO_URI);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));


app.use(express.json());
app.use('/api/auth', require('./routes/auth'));



 const mongoURI = process.env.MONGO_URI || 'mongodb://mongo:27017/mern_auth';
console.log('Connecting to MongoDB at:', mongoURI);

mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on('connected', () => console.log('✅ Mongoose connected'));
db.on('error', err => console.error('❌ Mongoose error:', err));
db.on('disconnected', () => console.warn('⚠️ Mongoose disconnected'));

// Basic health check
app.get('/', (req, res) => {
  res.send('API is running');
});

const {verifyUser} = require('./middleware/auth');
console.log('verifyUser is:', typeof verifyUser);
app.get('/api/dashboard', verifyUser, (req, res) => {
  res.json({ msg: `Welcome user ${req.userId}` });
});


app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
});