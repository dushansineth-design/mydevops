import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("success"); 
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { email, password }, { withCredentials: true });
      console.log('Login response:', res.data);

      localStorage.setItem("token", res.data.token);

      setType("success");
      setMsg("Login successful!");
      setTimeout(() => {setMsg(""); navigate("/");}, 1000); 
      
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setType("error");
      setMsg(err.response?.data?.msg || "Login failed");
      setTimeout(() => setMsg(""), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center relative">
      <form
        onSubmit={handleLogin}
        className="bg-white/20 backdrop-blur-2xl border border-white/30 p-8 rounded-2xl shadow-3xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login to Your Account</h2>
        
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
        
        <button
          type="submit"
          className="w-full py-5 rounded-3xl bg-black/20 border border-white/30 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-[0_0_15px_rgba(131,90,255,0.6)] hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(131,90,255,0.9)] transition-transform duration-300"
        >
          Login
        </button>
      </form>

      {msg && (
        <div className={`
          absolute top-10 left-1/2 transform -translate-x-1/2
          px-6 py-3 rounded-2xl text-lg font-bold
          ${type === "success" ? "bg-green-500/80 text-white" : "bg-red-500/80 text-white"}
          shadow-lg animate-bounce
          backdrop-blur-md
        `}>
          {msg}
        </div>
      )}
    </div>
  );
}