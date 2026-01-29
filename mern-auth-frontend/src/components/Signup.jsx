import { useState } from "react";
import axios from "../api/axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("success"); // 'success' or 'error'

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setType("error");
      setMsg("Passwords do not match");
      setTimeout(() => setMsg(""), 3000);
      return;
    }
    try {
      await axios.post('/auth/signup', { email, password });
      setType("success");
      setMsg("Signup successful!");
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setType("error");
      setMsg(err.response?.data?.msg || "Signup failed");
      setTimeout(() => setMsg(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl animate-fade-in-up">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">Create Account</h2>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-lg shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] transition-all duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>

      {msg && (
        <div className={`
          absolute top-6 left-1/2 transform -translate-x-1/2
          px-6 py-3 rounded-2xl text-sm font-bold shadow-xl animate-bounce backdrop-blur-md z-50
          ${type === "success" ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"}
        `}>
          {msg}
        </div>
      )}

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
