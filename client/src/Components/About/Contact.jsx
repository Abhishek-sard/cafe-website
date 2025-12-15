import React from "react";
import {  FaLocationDot, FaPhone, FaEnvelope, } from "react-icons/fa6";

const Contact = () => {
  return (
    <div className="bg-[#F5F5DC] text-[#5D4037]">



      {/* HERO */}
      <section
        className="text-white text-center py-24 px-6"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139, 69, 19, 0.85), rgba(139, 69, 19, 0.9)), url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Have questions or need assistance? We're here to help you with anything related to Elite Cafe.
        </p>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        {/* Title */}
        <h2 className="text-4xl text-[#8B4513] font-bold mb-2 relative pb-2 inline-block">
          Get in Touch
          <span className="absolute bottom-0 left-0 w-20 h-1 bg-[#D4AF37]"></span>
        </h2>
        <p className="text-lg text-[#A0522D] mb-12">We're always ready to serve you better.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* CONTACT INFO */}
          <div className="bg-white rounded-lg shadow-xl p-8 space-y-6">

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="bg-[#DEB887] p-4 rounded-full text-[#8B4513] text-3xl">
                <FaPhone />
              </div>
              <div>
                <h3 className="text-2xl text-[#8B4513] font-bold">Phone</h3>
                <p className="mt-1 text-lg">+977-9800000000</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="bg-[#DEB887] p-4 rounded-full text-[#8B4513] text-3xl">
                <FaEnvelope />
              </div>
              <div>
                <h3 className="text-2xl text-[#8B4513] font-bold">Email</h3>
                <p className="mt-1 text-lg">contact@elitecafe.com</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="bg-[#DEB887] p-4 rounded-full text-[#8B4513] text-3xl">
                <FaLocationDot />
              </div>
              <div>
                <h3 className="text-2xl text-[#8B4513] font-bold">Address</h3>
                <p className="mt-1 text-lg">New Baneshwor, Kathmandu, Nepal</p>
              </div>
            </div>

          </div>

          {/* CONTACT FORM */}
          <form className="bg-white rounded-lg shadow-xl p-8 space-y-4">

            <h3 className="text-3xl font-bold text-[#8B4513] mb-4">Send a Message</h3>

            <input type="text" placeholder="Your Name"
              className="w-full border border-[#DEB887] rounded-md p-3 focus:border-[#8B4513] outline-none" />

            <input type="email" placeholder="Your Email"
              className="w-full border border-[#DEB887] rounded-md p-3 focus:border-[#8B4513] outline-none" />

            <input type="text" placeholder="Subject"
              className="w-full border border-[#DEB887] rounded-md p-3 focus:border-[#8B4513] outline-none" />

            <textarea placeholder="Your Message" rows="5"
              className="w-full border border-[#DEB887] rounded-md p-3 focus:border-[#8B4513] outline-none"></textarea>

            <button className="bg-[#8B4513] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#A0522D] w-full">
              Send Message
            </button>

          </form>

        </div>
      </section>

    </div>
  );
};

export default Contact;
