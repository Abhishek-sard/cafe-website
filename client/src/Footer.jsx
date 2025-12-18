import React from "react";
import {
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn,
  FaHome, FaUtensils, FaInfoCircle, FaShoppingCart,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock,
  FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal, FaCcApplePay, FaGoogleWallet
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#3E2723] text-white font-sans">

      {/* Top Section */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* About */}
        <div>
          <h3 className="text-[#F4A460] text-lg font-bold mb-4 border-b-2 border-[#F4A460] inline-block pb-1">
            About Elite Cafe
          </h3>
          <p className="text-[#FFF8DC] text-sm leading-relaxed mb-4">
            Elite Cafe offers premium coffee, expertly crafted beverages, and a warm inviting atmosphere.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
              <a key={idx} href="#"
                className="w-8 h-8 flex items-center justify-center 
                            bg-white/10 rounded-full hover:bg-[#F4A460] transition text-sm hover:scale-110">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-[#F4A460] text-lg font-bold mb-4 border-b-2 border-[#F4A460] inline-block pb-1">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-[#F4A460] flex items-center gap-2 transition"><FaHome /> Home</Link></li>
            <li><Link to="/menu" className="hover:text-[#F4A460] flex items-center gap-2 transition"><FaUtensils /> Menu</Link></li>
            <li><Link to="/about" className="hover:text-[#F4A460] flex items-center gap-2 transition"><FaInfoCircle /> About Us</Link></li>
            <li><Link to="/cart" className="hover:text-[#F4A460] flex items-center gap-2 transition"><FaShoppingCart /> Order Online</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[#F4A460] text-lg font-bold mb-4 border-b-2 border-[#F4A460] inline-block pb-1">
            Contact Us
          </h3>

          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><FaEnvelope className="text-[#F4A460] mt-1" /> elitecafe23@gmail.com</li>
            <li className="flex items-start gap-2"><FaPhone className="text-[#F4A460] mt-1" /> +1 251 280 5086</li>
            <li className="flex items-start gap-2"><FaMapMarkerAlt className="text-[#F4A460] mt-1" /> New Baneshwor, Kathmandu</li>
            <li className="flex items-start gap-2"><FaClock className="text-[#F4A460] mt-1" /> Mon-Sun: 7 AM - 10 PM</li>
          </ul>
        </div>

        {/* Newsletter + Payments */}
        <div>
          <h3 className="text-[#F4A460] text-lg font-bold mb-4 border-b-2 border-[#F4A460] inline-block pb-1">
            Newsletter
          </h3>

          <form className="flex flex-col gap-2 mb-6" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email address"
              className="p-2 rounded-md text-black text-sm outline-none focus:ring-2 focus:ring-[#F4A460]"
              required
            />
            <button className="bg-[#F4A460] text-[#3E2723] font-bold py-2 rounded-md hover:bg-[#DEB887] transition">
              Subscribe
            </button>
          </form>

          <h4 className="text-[#F4A460] font-semibold mb-2 text-sm">We Accept</h4>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-xl">
            {[FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal, FaCcApplePay, FaGoogleWallet].map((Icon, idx) => (
              <Icon key={idx} className="text-white/80 hover:text-[#F4A460] transition text-2xl" />
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 bg-[#2D1B18]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs md:text-sm gap-4 text-white/60">

          <p className="text-center">
            © 2025 Elite Cafe. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link to="#" className="hover:text-[#F4A460] transition">Privacy Policy</Link>
            <Link to="#" className="hover:text-[#F4A460] transition">Terms of Service</Link>
            <Link to="#" className="hover:text-[#F4A460] transition">Cookie Policy</Link>
          </div>

        </div>
      </div>

    </footer>
  );
};
export default Footer;
