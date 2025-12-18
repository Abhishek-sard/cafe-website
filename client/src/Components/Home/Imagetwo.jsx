import React from 'react';
import { Link } from "react-router-dom";

const Imagetwo = () => {
  return (
    <section className="w-full bg-[#2D1B18] py-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center px-4 gap-12">
        {/* Left Image */}
        <div className="md:w-1/2 relative group">
          <div className="absolute inset-0 bg-[#8B4513] rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
          <img
            src="/cafe.jpg"
            alt="Coffee"
            className="relative z-10 w-full h-auto rounded-2xl shadow-2xl object-cover transform transition-transform duration-500 hover:scale-[1.02]"
          />
        </div>

        {/* Right Text */}
        <div className="md:w-1/2 text-white">
          <span className="text-[#DEB887] font-bold tracking-widest uppercase text-sm border-b-2 border-[#8B4513] pb-1">
            Our Passion
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6 leading-tight">
            Experience the <span className="text-[#DEB887]">Finest</span> Coffee
          </h2>
          <p className="text-lg mb-8 text-gray-300 font-light leading-relaxed">
            Savor the rich aroma and bold flavors of our handcrafted coffee blends. Each cup is made with passion to ensure a delightful experience that awakens your senses.
          </p>
          <Link
            to="/menu"
            className="inline-block bg-[#8B4513] hover:bg-[#A0522D] text-white font-semibold px-8 py-3 rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            Order Now
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Imagetwo;
