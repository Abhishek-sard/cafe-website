import React from "react";
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, 
  FaHome, FaUtensils, FaInfoCircle, FaBuilding, FaShoppingCart, FaUser,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock,
  FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal, FaCcApplePay, FaGoogleWallet
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#3E2723] text-white">
      {/* Footer Container */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-6">
        {/* About Section */}
        <div>
          <h3 className="text-[#F4A460] text-lg font-semibold mb-2 relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-[2px] after:bg-[#F4A460]">
            About Elite Cafe
          </h3>
          <p className="text-[#FFF8DC] text-sm mb-3">
            Elite Cafe offers premium coffee with carefully sourced beans, expertly crafted beverages, and a warm, inviting atmosphere.
          </p>
          <div className="flex gap-2 mt-2">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
              <a key={idx} href="#" className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full hover:bg-[#F4A460] transition text-sm">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-[#F4A460] text-lg font-semibold mb-2 relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-[2px] after:bg-[#F4A460]">
            Quick Links
          </h3>
          <ul className="space-y-1 text-sm">
            <li><a className="flex items-center gap-1 hover:text-[#F4A460]" href="#"><FaHome /> Home</a></li>
            <li><a className="flex items-center gap-1 hover:text-[#F4A460]" href="#"><FaUtensils /> Menu</a></li>
            <li><a className="flex items-center gap-1 hover:text-[#F4A460]" href="#"><FaInfoCircle /> About Us</a></li>
            <li><a className="flex items-center gap-1 hover:text-[#F4A460]" href="#"><FaShoppingCart /> Order Online</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-[#F4A460] text-lg font-semibold mb-2 relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-[2px] after:bg-[#F4A460]">
            Contact Us
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <FaEnvelope className="text-[#F4A460] mt-0.5" /> elitecafe23@gmail.com
            </li>
            <li className="flex items-start gap-2">
              <FaPhone className="text-[#F4A460] mt-0.5" /> +1 251 280 5086
            </li>
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-[#F4A460] mt-0.5" /> 123 Coffee Street, Brew City, BC
            </li>
            <li className="flex items-start gap-2">
              <FaClock className="text-[#F4A460] mt-0.5" /> Mon-Sun: 7 AM - 10 PM
            </li>
          </ul>
        </div>

        {/* Newsletter & Payments */}
        <div>
          <h3 className="text-[#F4A460] text-lg font-semibold mb-2 relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-[2px] after:bg-[#F4A460]">
            Newsletter
          </h3>
          <form className="flex flex-col sm:flex-row gap-2 mb-4 text-sm">
            <input type="email" placeholder="Email address" required className="flex-1 p-2 rounded-l-md text-black outline-none text-sm" />
            <button type="submit" className="bg-[#F4A460] text-[#3E2723] px-3 py-2 rounded-r-md font-semibold hover:bg-[#FFF8DC] transition text-sm">Subscribe</button>
          </form>

          <h4 className="text-[#F4A460] font-semibold mb-2 text-sm">We Accept</h4>
          <div className="flex flex-wrap gap-2 text-xl">
            {[FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal, FaCcApplePay, FaGoogleWallet].map((Icon, idx) => (
              <Icon key={idx} className="hover:text-[#F4A460] transition text-lg" />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/20 py-4 px-4 flex flex-col md:flex-row justify-between items-center text-sm max-w-6xl mx-auto">
        <p>&copy; 2023 Elite Cafe. All rights reserved.
          Powered by Nova IT Solutions
        </p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-[#F4A460]">Privacy Policy</a>
          <a href="#" className="hover:text-[#F4A460]">Terms of Service</a>
          <a href="#" className="hover:text-[#F4A460]">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
