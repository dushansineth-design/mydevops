const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const { verifyUser } = require('../middleware/auth');

// @route   GET /api/employees
// @desc    Get all employees
// @access  Private
router.get('/', verifyUser, async (req, res) => {
    try {
        const employees = await Employee.find().sort({ dateJoined: -1 });
        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/employees
// @desc    Add new employee
// @access  Private
router.post('/', verifyUser, async (req, res) => {
    const { firstName, lastName, email, position, department, salary } = req.body;

    try {
        const newEmployee = new Employee({
            firstName,
            lastName,
            email,
            position,
            department,
            salary
        });

        const employee = await newEmployee.save();
        res.json(employee);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/employees/:id
// @desc    Update employee
// @access  Private
router.put('/:id', verifyUser, async (req, res) => {
    const { firstName, lastName, email, position, department, salary } = req.body;

    // Build employee object
    const employeeFields = {};
    if (firstName) employeeFields.firstName = firstName;
    if (lastName) employeeFields.lastName = lastName;
    if (email) employeeFields.email = email;
    if (position) employeeFields.position = position;
    if (department) employeeFields.department = department;
    if (salary) employeeFields.salary = salary;

    try {
        let employee = await Employee.findById(req.params.id);

        if (!employee) return res.status(404).json({ msg: 'Employee not found' });

        employee = await Employee.findByIdAndUpdate(
            req.params.id,
            { $set: employeeFields },
            { new: true }
        );

        res.json(employee);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/employees/:id
// @desc    Delete employee
// @access  Private
router.delete('/:id', verifyUser, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) return res.status(404).json({ msg: 'Employee not found' });

        await Employee.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Employee removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
