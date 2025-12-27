import React from "react";
import { FaMugHot, FaBullseye, FaEye } from "react-icons/fa";

const CompanyProfile = () => {
  return (
    <div className="bg-cream text-dark-text font-sans">


      {/* COVER SECTION */}
      <section
        className="h-[80vh] bg-cover bg-center bg-fixed flex items-center justify-center text-light-text text-center px-6 relative overflow-hidden"
      >
        {/* HD Background Image */}
        <img
          src="/src/assets/company-hero.png"
          className="absolute inset-0 w-full h-full object-cover z-0"
          alt="Elite Cafe Interior"
        />
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        <div className="relative z-20">
          <div className="text-6xl text-accent-gold mb-4 text-center flex justify-center text-yellow-500">
            <FaMugHot />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-2xl">Welcome to Elite Cafe</h1>
          <p className="text-xl text-white font-light tracking-wide drop-shadow-lg">
            The perfect blend of taste, quality & tradition since 2010.
          </p>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-24 bg-white">
        <h2 className="section-title text-center text-4xl font-bold text-[#8B4513] mb-16 relative mx-auto after:content-[''] after:w-24 after:h-1 after:bg-yellow-500 after:block after:mx-auto after:mt-2">
          About Us
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 px-6 items-center">
          <div className="grid grid-cols-2 gap-4 relative group">
            *
            <div className="pt-12 col-span-2">
              <div className="relative">
                <div className="absolute -inset-2 bg-yellow-500/10 rounded-xl blur-md"></div>
                <img
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80"
                  className="rounded-xl shadow-xl relative z-10 transition duration-500 w-full h-120 max-w-2xl mx-auto hover:scale-[1.05]"
                  alt="Our Story 3"
                />
              </div>
            </div>

          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-[#8B4513] mb-6 border-l-4 border-yellow-500 pl-4">
                Our Legacy of Flavor
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                Elite Cafe started its journey with a singular vision: to create a sanctuary for coffee lovers where every sip tells a story of craftsmanship. What began as a small corner shop has blossomed into a destination known for its uncompromising standards and warm community spirit.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4 text-lg">
                We take pride in our direct-trade relationships with coffee farmers, ensuring that every bean is ethically sourced and roasted to perfection in small batches to preserve its unique character.
              </p>
            </div>

            {/* TIMELINE */}
            <div className="space-y-6 pt-4">
              <div className="flex gap-6 items-start">
                <div className="mt-1">
                  <span className="w-10 h-10 bg-yellow-100 text-[#8B4513] rounded-full flex items-center justify-center font-bold text-sm border-2 border-yellow-500">2010</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Foundation</h4>
                  <p className="text-gray-600">The first Elite Cafe opened its doors, fueled by passion and a dream to redefine coffee culture.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="mt-1">
                  <span className="w-10 h-10 bg-yellow-100 text-[#8B4513] rounded-full flex items-center justify-center font-bold text-sm border-2 border-yellow-500">2015</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Expansion</h4>
                  <p className="text-gray-600">Recognized as the region's top-rated cafe, we expanded to five vibrant new locations.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="mt-1">
                  <span className="w-10 h-10 bg-yellow-100 text-[#8B4513] rounded-full flex items-center justify-center font-bold text-sm border-2 border-yellow-500">2020</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Innovation</h4>
                  <p className="text-gray-600">Launched our proprietary cold-brew technique and ultra-premium Reserve bean line.</p>
                </div>
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
