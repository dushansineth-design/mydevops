import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalEmployees: 0,
        totalPayroll: 0
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('/employees', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const employees = response.data;
                const totalPayroll = employees.reduce((acc, emp) => acc + emp.salary, 0);

                setStats({
                    totalEmployees: employees.length,
                    totalPayroll
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            }
        };

        fetchStats();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Total Employees Card */}
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Employees</h2>
                    <p className="text-4xl font-bold text-blue-600">{stats.totalEmployees}</p>
                </div>

                {/* Total Payroll Card */}
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Monthly Payroll</h2>
                    <p className="text-4xl font-bold text-green-600">${stats.totalPayroll.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}
