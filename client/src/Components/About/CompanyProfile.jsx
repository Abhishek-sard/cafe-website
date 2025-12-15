import React from "react";
import { FaMugHot, FaBullseye, FaEye } from "react-icons/fa";

const CompanyProfile = () => {
  return (
    <div className="bg-cream text-dark-text font-sans">


      {/* COVER SECTION */}
      <section
        className="h-[80vh] bg-cover bg-center bg-fixed flex items-center justify-center text-light-text text-center px-6"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,69,19,0.85),rgba(139,69,19,0.9)),url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1147&q=80')",
        }}
      >
        <div>
          <div className="text-6xl text-accent-gold mb-4 text-center flex justify-center text-yellow-500">
            <FaMugHot />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-white">Welcome to Elite Cafe</h1>
          <p className="text-xl text-white">
            The perfect blend of taste, quality & tradition.
          </p>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 bg-white">
        <h2 className="section-title text-center text-4xl font-bold text-primary-brown mb-12 relative mx-auto after:content-[''] after:w-24 after:h-1 after:bg-accent-gold after:block after:mx-auto after:mt-2">
          About Us
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6">
          <div>
            <img
              src="https://images.unsplash.com/photo-1517244869275-5bc002b2a9f7"
              className="rounded-lg shadow-xl"
              alt=""
            />
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-secondary-brown mb-4">
              Our Story
            </h3>
            <p className="mb-6">
              Elite Cafe started its journey to bring the finest taste experience
              to coffee lovers. With passion and dedication, we grew to become a
              trusted name.
            </p>

            {/* TIMELINE */}
            <div>
              <div className="mb-4 pl-8 relative">
                <span className="absolute left-0 top-1 w-4 h-4 bg-yellow-500 rounded-full"></span>
                <p className="font-bold text-primary-brown">2010</p>
                <p>Founded Elite Cafe with a small team.</p>
              </div>

              <div className="mb-4 pl-8 relative">
                <span className="absolute left-0 top-1 w-4 h-4 bg-yellow-500 rounded-full"></span>
                <p className="font-bold text-primary-brown">2015</p>
                <p>Expanded to multiple locations.</p>
              </div>

              <div className="mb-4 pl-8 relative">
                <span className="absolute left-0 top-1 w-4 h-4 bg-yellow-500 rounded-full"></span>
                <p className="font-bold text-primary-brown">2020</p>
                <p>Launched premium product line.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION / VISION / VALUES */}
      <section className="py-20 bg-cream">
        <h2 className="text-center text-4xl font-bold text-primary-brown mb-12">
          Our Mission, Vision & Values
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {/* Mission */}
          <div className="bg-white rounded-xl shadow-md p-8 text-center hover:-translate-y-2 transition">
            <div className="w-20 h-20 rounded-full bg-light-brown text-primary-brown flex items-center justify-center mx-auto mb-4 text-3xl text-[#8B4513] bg-orange-100">
              <FaBullseye />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Mission</h3>
            <p>To serve exceptional coffee with warmth and hospitality.</p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-xl shadow-md p-8 text-center hover:-translate-y-2 transition">
            <div className="w-20 h-20 rounded-full bg-light-brown text-primary-brown flex items-center justify-center mx-auto mb-4 text-3xl text-[#8B4513] bg-orange-100">
              <FaEye />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Vision</h3>
            <p>To be the most loved coffee brand nationwide.</p>
          </div>

          {/* Values */}
          <div className="bg-white rounded-xl shadow-md p-8 hover:-translate-y-2 transition">
            <h3 className="text-2xl font-semibold mb-3 text-center">Values</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2">
                <span className="text-yellow-500 font-bold">✓</span> Quality
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-500 font-bold">✓</span> Integrity
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-500 font-bold">✓</span> Customer
                Care
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
export default CompanyProfile;
