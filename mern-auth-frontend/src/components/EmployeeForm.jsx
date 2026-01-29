import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        department: '',
        salary: ''
    });

    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    useEffect(() => {
        if (isEdit) {
            fetchEmployee();
        }
    }, [id]);

    const fetchEmployee = async () => {
        try {
            // The shared axios instance should handle 'x-auth-token' via an interceptor.
            // The baseURL should also be set, so we only need the path.
            const res = await axios.get(`/employees`); // In real app, might want getById endpoint or filter list
            // Since we don't have a direct getById exposed in router (wait, we check routes/employee.js, it might not have getById but has put by id. Let's check... 
            // Checking the file content provided earlier: 
            // router.put('/:id', verifyUser, ...) exists.
            // router.delete('/:id', verifyUser, ...) exists.
            // But NO router.get('/:id', verifyUser, ...). 
            // I should implement get by id or just filter from all. Filtering from all is inefficient but works for now.

            const employee = res.data.find(e => e._id === id);
            if (employee) {
                setFormData({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    email: employee.email,
                    position: employee.position,
                    department: employee.department,
                    salary: employee.salary
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const { firstName, lastName, email, position, department, salary } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            // Note: axios.post/put automatically sets Content-Type: application/json if sending an object, 
            // but we are stringifying it manually here? 
            // actually axios handles object best. Let's pass object directly.
            // If we use shared axios, we don't need to manually set content-type json usually, but let's keep it simple.
            // The original code used manual fetch style or manual axios config.

            // The shared axios instance should handle 'x-auth-token' via interceptor.
            // axios automatically sets 'Content-Type: application/json' when sending an object.
            // The baseURL should be set, so we only need the path.
            // Pass formData directly instead of stringifying.

            if (isEdit) {
                await axios.put(`/employees/${id}`, formData);
            } else {
                await axios.post('/employees', formData);
            }

            navigate('/employees');
        } catch (err) {
            console.error(err.response ? err.response.data : err);
            alert('Error saving employee');
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{isEdit ? 'Edit Employee' : 'Add Employee'}</h2>
            <form onSubmit={onSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                        <input type="text" name="firstName" value={firstName} onChange={onChange} required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                        <input type="text" name="lastName" value={lastName} onChange={onChange} required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Position</label>
                        <input type="text" name="position" value={position} onChange={onChange} required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Department</label>
                        <input type="text" name="department" value={department} onChange={onChange} required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Salary</label>
                    <input type="number" name="salary" value={salary} onChange={onChange} required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                    {isEdit ? 'Update Employee' : 'Add Employee'}
                </button>
            </form>
        </div>
    );
};

export default EmployeeForm;
