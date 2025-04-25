import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navebar";
import LoginSignupPage from "./pages/LoginSignupPage";
import Privateroute from "./components/Privateroute";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashbord from "./pages/EmployeeDashbord";
import ManagerDashboard from "./pages/ManagerDashboard";
import DisableBackButton from "./components/DisableBackButton";
import LandingPage from "./pages/LandingPage"; // ✅ Import LandingPage

const App = () => {
  const [isLogin, setisLogin] = useState(false);

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/auth"
            element={<LoginSignupPage setisLogin={setisLogin} />}
          />
          <Route
            path="/admin"
            element={
              <Privateroute isLogin={isLogin}>
                <Navbar />
                <AdminDashboard />
              </Privateroute>
            }
          />

          <Route
            path="/manager"
            element={
              <Privateroute isLogin={isLogin}>
                <Navbar />
                <ManagerDashboard />
              </Privateroute>
            }
          />

          <Route
            path="/employee"
            element={
              <Privateroute isLogin={isLogin}>
                <Navbar />
                <EmployeeDashbord />
              </Privateroute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
