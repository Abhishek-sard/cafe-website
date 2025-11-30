import React from 'react';

const Imagetwo = () => {
  return (
    <section className="w-full bg-black py-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center px-4 gap-8">
        {/* Left Image */}
        <div className="md:w-1/2">
          <img
            src="/cafe.jpg" // Replace with your image path
            alt="Coffee"
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Right Text */}
        <div className="md:w-1/2 text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Experience the Finest Coffee
          </h2>
          <p className="text-sm md:text-lg mb-6 text-white/80">
            Savor the rich aroma and bold flavors of our handcrafted coffee blends. Each cup is made with passion to ensure a delightful experience that awakens your senses.
          </p>
          <a
            href="#order"
            className="bg-[#8B4513] hover:bg-[#D2691E] text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Order Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Imagetwo;
