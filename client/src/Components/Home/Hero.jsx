import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const statsData = [
  { label: "Premium Blends", end: 50 },
  { label: "Daily Orders", end: 1200 },
  { label: "Happy Clients", end: 500 },
];

const Hero = () => {
  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((count, idx) => {
          if (count < statsData[idx].end) {
            const increment = Math.ceil(statsData[idx].end / 100);
            return count + increment > statsData[idx].end
              ? statsData[idx].end
              : count + increment;
          }
          return count;
        })
      );
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden flex items-center justify-center text-center text-white">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="https://joy1.videvo.net/videvo_files/video/free/2019-11/large_watermarked/190301_1_25_11_preview.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark Overlay for Readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

      {/* Content */}
      <div className="relative z-20 px-4 max-w-4xl mx-auto space-y-6 animate-fade-in-up">

        <h1 className="text-4xl md:text-7xl font-bold font-serif leading-tight tracking-tight drop-shadow-lg">
          Savor the <span className="text-[#DEB887]">Moment</span>
        </h1>

        <p className="text-lg md:text-2xl font-light text-gray-200 max-w-2xl mx-auto drop-shadow-md">
          Experience the rich, bold flavors of our handcrafted blends—brewed to perfection for the true coffee connoisseur.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center mt-8">
          <Link
            to="/menu"
            className="bg-[#8B4513] hover:bg-[#A0522D] text-white text-lg font-semibold px-8 py-3 rounded-full flex items-center justify-center transition-all transform hover:scale-105 shadow-xl"
          >
            Order Now <FaArrowRight className="ml-2" />
          </Link>
          <Link
            to="/about"
            className="border-2 border-white hover:bg-white hover:text-black text-white text-lg font-semibold px-8 py-3 rounded-full flex items-center justify-center transition-all transform hover:scale-105 shadow-xl"
          >
            Our Story
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-10 border-t border-white/20">
          {statsData.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-bold text-[#DEB887] font-mono">
                {counts[idx]}+
              </span>
              <span className="text-sm md:text-base uppercase tracking-widest text-gray-300 mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
export default Hero;
