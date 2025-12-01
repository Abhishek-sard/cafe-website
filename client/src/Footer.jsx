import React from "react";
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, 
  FaHome, FaUtensils, FaInfoCircle, FaShoppingCart,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock,
  FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal, FaCcApplePay, FaGoogleWallet
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#3E2723] text-white">

      {/* Top Section */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* About */}
        <div>
          <h3 className="text-[#F4A460] text-lg font-semibold mb-3 relative pb-1
                        after:absolute after:bottom-0 after:left-0 after:w-14 after:h-[2px] after:bg-[#F4A460]">
            About Elite Cafe
          </h3>
          <p className="text-[#FFF8DC] text-sm leading-relaxed">
            Elite Cafe offers premium coffee, expertly crafted beverages, and a warm inviting atmosphere.
          </p>

          {/* Social Icons */}
          <div className="flex gap-2 mt-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
              <a key={idx} href="#" 
                 className="w-8 h-8 flex items-center justify-center 
                            bg-white/10 rounded-full hover:bg-[#F4A460] transition text-sm">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-[#F4A460] text-lg font-semibold mb-3 relative pb-1
                        after:absolute after:bottom-0 after:left-0 after:w-12 after:h-[2px] after:bg-[#F4A460]">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#F4A460] flex items-center gap-2"><FaHome /> Home</li>
            <li className="hover:text-[#F4A460] flex items-center gap-2"><FaUtensils /> Menu</li>
            <li className="hover:text-[#F4A460] flex items-center gap-2"><FaInfoCircle /> About Us</li>
            <li className="hover:text-[#F4A460] flex items-center gap-2"><FaShoppingCart /> Order Online</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[#F4A460] text-lg font-semibold mb-3 relative pb-1
                        after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[2px] after:bg-[#F4A460]">
            Contact Us
          </h3>

          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><FaEnvelope className="text-[#F4A460]" /> elitecafe23@gmail.com</li>
            <li className="flex items-start gap-2"><FaPhone className="text-[#F4A460]" /> +1 251 280 5086</li>
            <li className="flex items-start gap-2"><FaMapMarkerAlt className="text-[#F4A460]" /> 123 Coffee Street, Brew City</li>
            <li className="flex items-start gap-2"><FaClock className="text-[#F4A460]" /> Mon-Sun: 7 AM - 10 PM</li>
          </ul>
        </div>

        {/* Newsletter + Payments */}
        <div>
          <h3 className="text-[#F4A460] text-lg font-semibold mb-3 relative pb-1
                        after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[2px] after:bg-[#F4A460]">
            Newsletter
          </h3>

          <form className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 p-2 rounded-md text-black text-sm outline-none"
              required
            />
            <button className="bg-[#F4A460] text-[#3E2723] px-4 py-2 rounded-md font-semibold hover:bg-[#FFF8DC] transition">
              Subscribe
            </button>
          </form>

          <h4 className="text-[#F4A460] font-semibold mb-2 text-sm">We Accept</h4>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-xl">
            {[FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal, FaCcApplePay, FaGoogleWallet].map((Icon, idx) => (
              <Icon key={idx} className="hover:text-[#F4A460] transition text-lg" />
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs md:text-sm gap-3">

          <p className="text-center">
            © 2025 Elite Cafe. All rights reserved. | Powered by Nova IT Solutions
          </p>

          <div className="flex gap-4">
            <a href="#" className="hover:text-[#F4A460]">Privacy Policy</a>
            <a href="#" className="hover:text-[#F4A460]">Terms of Service</a>
            <a href="#" className="hover:text-[#F4A460]">Cookie Policy</a>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
