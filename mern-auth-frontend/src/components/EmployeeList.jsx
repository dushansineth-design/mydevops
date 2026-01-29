import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const res = await axios.get('/employees');
            setEmployees(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const deleteEmployee = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`/employees/${id}`);
            setEmployees(employees.filter(emp => emp._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Employees</h2>
                <Link to="/employees/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Add Employee
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Position</th>
                            <th className="py-3 px-6 text-left">Department</th>
                            <th className="py-3 px-6 text-right">Salary</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {employees.map((employee) => (
                            <tr key={employee._id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">{employee.firstName} {employee.lastName}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span>{employee.email}</span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span>{employee.position}</span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span>{employee.department}</span>
                                </td>
                                <td className="py-3 px-6 text-right">
                                    <span>${employee.salary.toLocaleString()}</span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                        <Link to={`/employees/edit/${employee._id}`} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </Link>
                                        <button onClick={() => deleteEmployee(employee._id)} className="w-4 transform hover:text-red-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
