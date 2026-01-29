const express = require('express');
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const { verifyUser, verifyAdmin } = require('../middleware/auth');

const router = express.Router();


router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  console.log('Signup request:', req.body);

  if (!email || !password) return res.status(400).json({ msg: 'Missing fields' });

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ msg: 'Email in use' });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash, role: 'admin' });
  res.status(201).json({ msg: 'User created', userId: user._id });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ msg: 'Logged in', token });
});


router.get('/dashboard', verifyUser, (req, res) => {
  res.json({ msg: `Welcome user ${req.userId}` });
});


router.get('/admin', verifyAdmin, (req, res) => {
  res.json({ msg: `Welcome admin ${req.userId}` });
});

module.exports = router;