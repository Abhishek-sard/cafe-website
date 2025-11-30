import React, { useState } from "react";
import { 
  FaCoffee, FaHome, FaUtensils, FaInfoCircle, FaUsers, FaBuilding, FaEnvelope, 
  FaShoppingCart, FaUser, FaPhone, FaFacebookF, FaTwitter, FaInstagram 
} from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="w-full bg-gray-100 text-brown-700">

      {/* ------------------ TOP CONTACT BAR ------------------ */}
      <div className="bg-[#8B4513] text-white text-sm py-2">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
          {/* Left side: contact info */}
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-1">
              <FaEnvelope /> <span>elitecafe23@gmail.com</span>
            </div>
            <div className="flex items-center gap-1">
              <FaPhone /> <span>+1 251 280 5086</span>
            </div>
          </div>

          {/* Right side: social icons */}
          <div className="flex gap-3 items-center">
            <a href="#" className="hover:text-yellow-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-yellow-400"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-400"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* ------------------ MAIN NAVBAR ------------------ */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-4">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <FaCoffee className="text-3xl text-[#8B4513]" />
            <h1 className="text-2xl font-bold text-[#8B4513]">Elite Cafe</h1>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6">
            <li>
              <a className="flex items-center gap-2 text-[#5D4037] hover:text-[#8B4513] hover:bg-yellow-100 px-4 py-2 rounded-md bg-[#8B4513] text-white">
                <FaHome /> Home
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 text-[#5D4037] hover:text-[#8B4513] hover:bg-yellow-100 px-4 py-2 rounded-md">
                <FaUtensils /> Menu
              </a>
            </li>

            {/* Dropdown */}
            <li className="relative">
              <button
                className="flex items-center gap-2 text-[#5D4037] hover:text-[#8B4513] hover:bg-yellow-100 px-4 py-2 rounded-md"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaInfoCircle /> About
              </button>

              {dropdownOpen && (
                <div className="absolute bg-white shadow-md w-48 rounded-md mt-2">
                  <a className="flex items-center gap-2 px-4 py-2 hover:bg-yellow-100">
                    <FaUsers /> About Us
                  </a>
                  <a className="flex items-center gap-2 px-4 py-2 hover:bg-yellow-100">
                    <FaBuilding /> Company Profile
                  </a>
                  <a className="flex items-center gap-2 px-4 py-2 hover:bg-yellow-100">
                    <FaEnvelope /> Contact
                  </a>
                </div>
              )}
            </li>

            <li>
              <a className="relative flex items-center gap-2 text-[#5D4037] hover:text-[#8B4513] hover:bg-yellow-100 px-4 py-2 rounded-md">
                <FaShoppingCart /> Cart
                <span className="absolute top-0 right-0 bg-yellow-500 text-[#3E2723] text-xs rounded-full px-2">
                  3
                </span>
              </a>
            </li>
          </ul>

          {/* Icons + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-yellow-100 flex items-center justify-center rounded-full text-[#8B4513] cursor-pointer hover:bg-[#8B4513] hover:text-white">
              <FaUser />
            </div>

            {/* Hamburger */}
            <button className="md:hidden flex flex-col gap-[6px]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span className="w-7 h-[3px] bg-[#8B4513] rounded"></span>
              <span className="w-7 h-[3px] bg-[#8B4513] rounded"></span>
              <span className="w-7 h-[3px] bg-[#8B4513] rounded"></span>
            </button>
          </div>
        </div>

        {/* ------------------ MOBILE MENU ------------------ */}
        {isMenuOpen && (
          <ul className="md:hidden bg-white shadow-md flex flex-col gap-4 px-6 py-4">
            <a className="flex items-center gap-2 py-2"><FaHome /> Home</a>
            <a className="flex items-center gap-2 py-2"><FaUtensils /> Menu</a>

            {/* Mobile dropdown */}
            <div onClick={() => setDropdownOpen(!dropdownOpen)}>
              <a className="flex items-center gap-2 py-2"><FaInfoCircle /> About</a>

              {dropdownOpen && (
                <div className="bg-gray-100 rounded-md ml-4 mt-2 p-2">
                  <a className="flex gap-2 py-2"><FaUsers /> About Us</a>
                  <a className="flex gap-2 py-2"><FaBuilding /> Company Profile</a>
                  <a className="flex gap-2 py-2"><FaEnvelope /> Contact</a>
                </div>
              )}
            </div>

            <a className="flex items-center gap-2 py-2"><FaShoppingCart /> Cart</a>
            <a className="flex items-center gap-2 py-2"><FaUser /> Account</a>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
