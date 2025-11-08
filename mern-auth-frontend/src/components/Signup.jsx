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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center relative">
      <form
        onSubmit={handleSignup}
        className="bg-white/20 backdrop-blur-2xl border border-white/30 p-8 rounded-2xl shadow-3xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create an Account</h2>
        
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/20 backdrop-blur-md text-white placeholder-gray-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/20 backdrop-blur-md text-white placeholder-gray-200"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/20 backdrop-blur-md text-white placeholder-gray-200"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        
        <button
          type="submit"
          className="w-full py-5 rounded-3xl bg-black/20 border border-white/30 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-[0_0_15px_rgba(131,90,255,0.6)] hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(131,90,255,0.9)] transition-transform duration-300"
        >
          Sign Up
        </button>
      </form>

      {/* Eye-catching popup message */}
      {msg && (
        <div
          className={`
            absolute top-10 left-1/2 transform -translate-x-1/2
            px-6 py-3 rounded-2xl text-lg font-bold
            ${type === "success" ? "bg-green-500/80 text-white" : "bg-red-500/80 text-white"}
            shadow-lg animate-bounce backdrop-blur-md
          `}
        >
          {msg}
        </div>
      )}
    </div>
  );
}
