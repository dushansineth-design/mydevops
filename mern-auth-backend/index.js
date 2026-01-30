require('dotenv').config();
console.log('PORT from .env:', process.env.PORT);
console.log('MONGO_URI from .env:', process.env.MONGO_URI);

const express = require('express');
const app = express();

const mongoose = require('mongoose');

const cors = require("cors");

app.use(cors({
  //origin: 'http://localhost:5174',
  origin: 'http://3.91.209.132:5174',
  credentials: true
}));

app.use(express.json());



app.use('/api/auth', require('./routes/auth'));
app.use('/api/home', require('./routes/home'));
app.use('/api/employees', require('./routes/employee'));
app.use('/api/payroll', require('./routes/payroll'));


const mongoURI = process.env.MONGO_URI || 'mongodb://mongo:27017/mern_auth';
console.log('Connecting to MongoDB at:', mongoURI);

//mongoose.connect(mongoURI);
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('connected', () => console.log('✅ Mongoose connected'));
db.on('error', err => console.error('❌ Mongoose error:', err));
db.on('disconnected', () => console.warn('⚠️ Mongoose disconnected'));


app.get('/', (req, res) => {
  res.send('API is running');
});

const { verifyUser } = require('./middleware/auth');
console.log('verifyUser is:', typeof verifyUser);
app.get('/api/dashboard', verifyUser, (req, res) => {
  res.json({ msg: `Welcome user ${req.userId}` });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ msg: "Internal server error" });
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