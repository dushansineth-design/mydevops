import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";

import Dashboard from "./components/Dashboard";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import Payroll from "./components/Payroll";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/add" element={<EmployeeForm />} />
          <Route path="/employees/edit/:id" element={<EmployeeForm />} />
          <Route path="/payroll" element={<Payroll />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;