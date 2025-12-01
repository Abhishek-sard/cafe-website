import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaCoffee, FaHome, FaUtensils, FaInfoCircle, FaUsers, FaBuilding, FaEnvelope, 
  FaShoppingCart, FaUser, FaPhone, FaFacebookF, FaTwitter, FaInstagram 
} from "react-icons/fa";
import { useCart } from "./Components/Cart/CartContext.jsx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { cartCount } = useCart();

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
            <Link to="/" className="text-2xl font-bold text-[#8B4513]">Elite Cafe</Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6">
            <li>
              <Link to="/" className="flex items-center gap-2 text-[#5D4037] hover:text-[#8B4513] hover:bg-yellow-100 px-4 py-2 rounded-md">
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to="/menu" className="flex items-center gap-2 text-[#5D4037] hover:text-[#8B4513] hover:bg-yellow-100 px-4 py-2 rounded-md">
                <FaUtensils /> Menu
              </Link>
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
                  <Link to="/about" className="flex items-center gap-2 px-4 py-2 hover:bg-yellow-100">
                    <FaUsers /> About Us
                  </Link>
                  <Link to="/CompanyProfile" className="flex items-center gap-2 px-4 py-2 hover:bg-yellow-100">
                    <FaBuilding /> Company Profile
                  </Link>
                  <Link to="/contact" className="flex items-center gap-2 px-4 py-2 hover:bg-yellow-100">
                    <FaEnvelope /> Contact
                  </Link>
                </div>
              )}
            </li>

            <li>
              <Link
                to="/cart"
                className="relative flex items-center gap-2 text-[#5D4037] hover:text-[#8B4513] hover:bg-yellow-100 px-4 py-2 rounded-md"
              >
                <FaShoppingCart /> Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-500 text-[#3E2723] text-xs rounded-full px-2 font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>

          {/* Icons + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Link to="/account" className="w-10 h-10 bg-yellow-100 flex items-center justify-center rounded-full text-[#8B4513] cursor-pointer hover:bg-[#8B4513] hover:text-white">
              <FaUser />
            </Link>

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
          <ul className="md:hidden bg-white shadow-md flex flex-col gap-2 px-6 py-4">
            <Link to="/" className="flex items-center gap-2 py-2"><FaHome /> Home</Link>
            <Link to="/menu" className="flex items-center gap-2 py-2"><FaUtensils /> Menu</Link>

            {/* Mobile dropdown */}
            <div onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div className="flex items-center gap-2 py-2 cursor-pointer"><FaInfoCircle /> About</div>

              {dropdownOpen && (
                <div className="bg-gray-100 rounded-md ml-4 mt-2 p-2 flex flex-col gap-2">
                  <Link to="/about" className="flex gap-2 py-2"><FaUsers /> About Us</Link>
                  <Link to="/CompanyProfile" className="flex gap-2 py-2"><FaBuilding /> Company Profile</Link>
                  <Link to="/contact" className="flex gap-2 py-2"><FaEnvelope /> Contact</Link>
                </div>
              )}
            </div>

            <Link to="/cart" className="flex items-center gap-2 py-2">
              <FaShoppingCart /> Cart
              {cartCount > 0 && (
                <span className="ml-auto bg-yellow-500 text-[#3E2723] text-xs rounded-full px-2">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/account" className="flex items-center gap-2 py-2"><FaUser /> Account</Link>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
