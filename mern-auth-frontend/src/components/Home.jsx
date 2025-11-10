import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Home() {
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("Token being sent:", token);

        const res = await axios.get("/home", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (err) {
        setMsg("Unauthorized or server error");
      }
    };
    fetchHomeData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex flex-col items-center justify-center p-6 text-white">
      <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        Welcome to Payroll Management System
      </h1>

      {msg && <p className="text-red-500 text-lg mb-4">{msg}</p>}

      {data && (
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl w-full max-w-md text-center space-y-3">
          <p className="text-xl font-semibold">{data.msg}</p>
          <p>Total Employees: <span className="font-bold">{data.totalEmployees}</span></p>
          <p>Payroll Processed: <span className="font-bold">{data.payrollProcessed}</span></p>
          <p>Pending Approvals: <span className="font-bold">{data.pendingApprovals}</span></p>
          <p>Next Pay Date: <span className="font-bold">{data.nextPayDate}</span></p>
          <p>Compliance Status: <span className="font-bold">{data.complianceStatus}</span></p>
        </div>
      )}
    </div>
  );
}