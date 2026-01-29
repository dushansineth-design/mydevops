const mongoose = require('mongoose');

const PayrollSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    basicSalary: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    netSalary: {
        type: Number,
        required: true
    },
    payDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Payroll', PayrollSchema);
