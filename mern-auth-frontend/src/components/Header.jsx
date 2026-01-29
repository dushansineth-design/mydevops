import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <header className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg hover:scale-105 transition-transform duration-300">PrimeNova</div>
        <nav className="space-x-25 text-sm font-medium flex items-center gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/employees" className="hover:underline">Employees</Link>
          <Link to="/payroll" className="hover:underline">Payroll</Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/signup" className="hover:underline">Sign Up</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded transition duration-200"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}