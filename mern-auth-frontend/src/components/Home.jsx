import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 tracking-tight mb-6 animate-fade-in-down">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Payroll System</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-10 animate-fade-in-up max-w-2xl mx-auto leading-relaxed">
          The next generation of payroll management. <br />
          Simple. Fast. Secure.
        </p>

        <div className="flex justify-center gap-6 animate-fade-in-up animation-delay-500">
          <Link to="/login" className="px-8 py-4 bg-gray-900 text-white text-lg font-semibold rounded-full hover:bg-gray-800 transition-all hover:scale-105 shadow-xl hover:shadow-2xl">
            Get Started
          </Link>
          <Link to="/about" className="px-8 py-4 bg-white text-gray-900 text-lg font-semibold rounded-full border-2 border-gray-200 hover:border-gray-900 transition-all hover:scale-105">
            Learn More
          </Link>
        </div>
      </div>

      {/* CSS for custom animations if not in tailwind config */}
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
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
          animation-fill-mode: backwards;
        }
      `}</style>
    </div>
  );
}