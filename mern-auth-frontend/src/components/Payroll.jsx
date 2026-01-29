import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const Payroll = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [payrollData, setPayrollData] = useState(null);
    const [month, setMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));
    const [year, setYear] = useState(new Date().getFullYear());
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchEmployees();
        fetchPayrollHistory();
    }, []);

    const fetchEmployees = async () => {
        try {
            const res = await axios.get('/employees');
            setEmployees(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchPayrollHistory = async () => {
        try {
            const res = await axios.get('/payroll/all');
            setHistory(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCalculate = async () => {
        if (!selectedEmployee) return;
        try {
            const res = await axios.post('/payroll/calculate',
                { employeeId: selectedEmployee }
            );
            setPayrollData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handlePay = async () => {
        if (!payrollData) return;
        try {
            await axios.post('/payroll/pay',
                { ...payrollData, month, year }
            );
            alert('Payment processed successfully!');
            fetchPayrollHistory();
            setPayrollData(null);
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.msg || 'Error processing payment');
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Payroll Management</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Calculation Section */}
                <div className="p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-blue-600">Process Payroll</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Select Employee</label>
                        <select
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            value={selectedEmployee}
                            onChange={(e) => setSelectedEmployee(e.target.value)}
                        >
                            <option value="">-- Select --</option>
                            {employees.map(emp => (
                                <option key={emp._id} value={emp._id}>{emp.firstName} {emp.lastName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Month</label>
                            <input type="text" value={month} onChange={e => setMonth(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Year</label>
                            <input type="number" value={year} onChange={e => setYear(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                    </div>

                    <button
                        onClick={handleCalculate}
                        disabled={!selectedEmployee}
                        className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 disabled:bg-gray-400 mb-4"
                    >
                        Calculate Salary
                    </button>

                    {payrollData && (
                        <div className="bg-white p-4 rounded shadow mt-4">
                            <h4 className="font-bold border-b pb-2 mb-2">Summary for {payrollData.name}</h4>
                            <div className="flex justify-between mb-1"><span>Basic Salary:</span> <span>${payrollData.basicSalary}</span></div>
                            <div className="flex justify-between mb-1"><span>Tax (10%):</span> <span className="text-red-500">-${payrollData.tax}</span></div>
                            <div className="flex justify-between font-bold text-lg mt-2 border-t pt-2"><span>Net Salary:</span> <span className="text-green-600">${payrollData.netSalary}</span></div>

                            <button
                                onClick={handlePay}
                                className="w-full mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
                            >
                                Confirm & Pay
                            </button>
                        </div>
                    )}
                </div>

                {/* History Section */}
                <div className="overflow-x-auto">
                    <h3 className="text-xl font-semibold mb-4 text-blue-600">Recent Payments</h3>
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 text-sm">
                                <th className="py-2 px-4 text-left">Employee</th>
                                <th className="py-2 px-4 text-left">Period</th>
                                <th className="py-2 px-4 text-right">Net</th>
                                <th className="py-2 px-4 text-center">Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {history.slice(0, 5).map((record) => (
                                <tr key={record._id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{record.employee ? `${record.employee.firstName} ${record.employee.lastName}` : 'Unknown'}</td>
                                    <td className="py-2 px-4">{record.month} {record.year}</td>
                                    <td className="py-2 px-4 text-right font-medium">${record.netSalary}</td>
                                    <td className="py-2 px-4 text-center">{new Date(record.payDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {history.length === 0 && <tr><td colSpan="4" className="text-center py-4">No records found</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Payroll;
