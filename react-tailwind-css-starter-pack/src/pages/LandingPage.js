import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/images/backgroundimg.jpg";
import Navbar from "../components/Navebar";
import logo from "../assets/images/logo-removebg-preview.png";

export default function LandingPage() {

  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth"); // Redirects to login/signup page
  };

  const divStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  };

  return (
    <>
      <div style={divStyle}>
        <div className="md:flex items-center justify-center h-screen">
          <div className="wrapper shadow-xl h-100 flex items-center justify-center">
            <div className="flexdiv1c w-1/2">
              <div className="logo">
                <img src={logo} alt="" />
              </div>
            </div>
            <div className="flexdiv2 bg-[#C4C4C6] flex items-center justify-center h-96 text-center w-1/2 p-5">
              <div className="wrapper w-96">
                <h1 className="text-white font-bold text-xl">Welcome to</h1>
                <h1 className="text-white font-bold text-4xl">Enterprise Expence Management System</h1>
                <button onClick={handleGetStarted} className="border border-blue-600 bg-blue-600 text-white font-semibold my-3 py-3 px-5 rounded transition">Get Start</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
