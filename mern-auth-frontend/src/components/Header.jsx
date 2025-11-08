import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg hover:scale-105 transition-transform duration-300">PrimeNova</div>
        <nav className="space-x-25 text-sm font-medium">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/signup" className="hover:underline">Sign Up</Link>
        </nav>
      </div>
    </header>
  );
}