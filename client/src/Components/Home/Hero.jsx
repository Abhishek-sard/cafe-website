import React, { useState, useEffect } from "react";
import { FaArrowRight, FaCoffee, FaShoppingCart, FaSmile } from "react-icons/fa";

const statsData = [
  { label: "Coffee Items", end: 50,  },
  { label: "Orders Running", end: 1200, },
  { label: "Happy Customers", end: 500,  },
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
    <section className="relative w-full h-[300px] md:h-[450px] overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/1130.mp4"
        autoPlay
        loop
        muted
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
          Discover the <span className="text-[#F4A460]">Art of Perfect Coffee</span>
        </h1>
        <p className="text-white/80 max-w-xl text-sm md:text-lg mb-6">
          Experience the rich, bold flavors of our exquisite coffee blends—crafted to awaken your senses and make every sip unforgettable.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#order"
            className="bg-[#8B4513] hover:bg-[#D2691E] text-white font-semibold px-6 py-3 rounded-full flex items-center justify-center transition"
          >
            Order Now <FaArrowRight className="ml-2" />
          </a>
          <a
            href="#menu"
            className="border border-white hover:bg-white hover:text-[#8B4513] text-white font-semibold px-6 py-3 rounded-full flex items-center justify-center transition"
          >
            Explore Menu <FaArrowRight className="ml-2" />
          </a>
        </div>
      </div>

      {/* Counter Section at Left-Bottom */}
      <div className="absolute bottom-4 left-4 flex flex-col md:flex-row gap-6 bg-black/10 p-4 rounded-lg">
        {statsData.map((stat, idx) => (
          <div key={idx} className="text-center text-white">
           
            <h3 className="text-xl md:text-2xl font-bold">
              {counts[idx]}
              {stat.label === "Orders Running" ? "+" : ""}
            </h3>
            <p className="text-sm md:text-lg text-[#fdfdfd]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
