const express = require('express');
const router = express.Router();
const Payroll = require('../models/Payroll');
const Employee = require('../models/Employee');
const { verifyUser } = require('../middleware/auth');

// @route   POST /api/payroll/calculate
// @desc    Calculate payroll for an employee
// @access  Private
router.post('/calculate', verifyUser, async (req, res) => {
    const { employeeId } = req.body;

    try {
        const employee = await Employee.findById(employeeId);
        if (!employee) return res.status(404).json({ msg: 'Employee not found' });

        const basicSalary = employee.salary;
        const tax = basicSalary * 0.1; // Simple 10% tax for example
        const netSalary = basicSalary - tax;

        res.json({
            employeeId,
            name: `${employee.firstName} ${employee.lastName}`,
            basicSalary,
            tax,
            netSalary
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/payroll/pay
// @desc    Process payment and save record
// @access  Private
router.post('/pay', verifyUser, async (req, res) => {
    const { employeeId, month, year, basicSalary, tax, netSalary } = req.body;

    try {
        // Check if already paid for this month/year
        let payroll = await Payroll.findOne({ employee: employeeId, month, year });
        if (payroll) {
            return res.status(400).json({ msg: 'Payment already processed for this period' });
        }

        payroll = new Payroll({
            employee: employeeId,
            month,
            year,
            basicSalary,
            tax,
            netSalary
        });

        await payroll.save();
        res.json(payroll);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/payroll/history/:employeeId
// @desc    Get payroll history for an employee
// @access  Private
router.get('/history/:employeeId', verifyUser, async (req, res) => {
    try {
        const history = await Payroll.find({ employee: req.params.employeeId }).sort({ payDate: -1 });
        res.json(history);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/payroll/all
// @desc    Get all payroll records
// @access  Private
router.get('/all', verifyUser, async (req, res) => {
    try {
        const history = await Payroll.find().populate('employee', ['firstName', 'lastName', 'email']);
        res.json(history);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
