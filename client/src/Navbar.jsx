import React, { useState } from "react";
import { FaBars, FaCoffee, FaShoppingCart, FaUser } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);

  return (
    <nav className="bg-black text-white border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center text-2xl font-bold">
          <FaCoffee className="text-yellow-500 mr-2" />
          Elite<span className="text-yellow-500 ml-1">Cafe</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </button>

        {/* Nav Links */}
        <div
          className={`md:flex space-x-8 absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent p-5 md:p-0 transition-all ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          {[
            "Home",
            "Menu",
            "About Us",
            "Company Profile",
            "Contact",
            "Dashboard",
          ].map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase().replace(" ", "")}`}
              className="text-gray-300 hover:text-white text-lg block md:inline-block py-2"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Icons Section */}
        <div className="flex items-center gap-6">

          {/* User Login Button */}
          <button className="hidden sm:flex items-center gap-2 border border-gray-600 px-3 py-1 rounded hover:bg-gray-900 transition">
            <FaUser />
            <span>Login</span>
          </button>

          {/* Cart */}
          <div className="relative cursor-pointer" onClick={() => setCartCount(cartCount + 1)}>
            <FaShoppingCart className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {cartCount}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
