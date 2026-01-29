import React from "react";
import { Link } from "react-router-dom";

export default function About() {
    const features = [
        {
            title: "Automated Payroll",
            desc: "Calculate salaries, taxes, and deductions instantly with our powerful engine.",
        },
        {
            title: "Secure Data",
            desc: "Your employee data is encrypted and stored with the highest security standards.",
        },
        {
            title: "Real-time Analytics",
            desc: "Gain insights into your expenses and workforce distribution with one click.",
        },
        {
            title: "Global Compliance",
            desc: "Stay compliant with local tax laws and labor regulations automatically.",
        },
    ];

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[10%] left-[-5%] w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
                <div className="absolute bottom-[20%] right-[-5%] w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <Link to="/" className="inline-block mb-6 px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-200 transition-colors">
                        ← Back to Home
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight animate-fade-in-down">
                        Smart. Simple. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                            Payroll Solved.
                        </span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto animate-fade-in-up">
                        PrimeNova simplifies the complex world of payroll into a seamless, automated experience.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-8 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <h3 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reusing the same animations from Home for consistency */}
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
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0; /* Important for delay to work */
          animation-fill-mode: forwards;
        }
      `}</style>
        </div>
    );
}
