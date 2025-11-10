const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/auth');
const User = require('../models/User');

router.get('/', verifyAdmin, async (req, res) => {
  console.log("Auth Header:", req.headers.authorization);
  try {
    const totalEmployees = await User.countDocuments();
    res.json({
      msg: `Welcome Admin ${req.userId}`,
      totalEmployees,
      payrollProcessed: 3,
      pendingApprovals: 2,
      nextPayDate: '2025-11-15',
      complianceStatus: 'Up to date'
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;