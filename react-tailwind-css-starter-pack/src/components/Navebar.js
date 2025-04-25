import React, { useState } from 'react'
import { Menu, X } from "lucide-react";
import logo from "../assets/images/navabarLogo2.png"

const Navebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <img src={logo} width={'200px'}></img>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <ul className={`md:flex md:space-x-6 absolute md:relative bg-gray-800 md:bg-transparent w-full md:w-auto left-0 top-16 md:top-auto p-4 md:p-0 transition-transform duration-300 ease-in-out ${isOpen ? "block" : "hidden"}`}>
          <li><a href="#" className="block py-2 px-4 text-white hover:text-gray-300">Home</a></li>
          <li><a href="#" className="block py-2 px-4 text-white hover:text-gray-300">About</a></li>
          <li><a href="#" className="block py-2 px-4 text-white hover:text-gray-300">Services</a></li>
          <li><a href="#" className="block py-2 px-4 text-white hover:text-gray-300">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navebar