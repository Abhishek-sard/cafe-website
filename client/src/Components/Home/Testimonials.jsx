import React, { useState, useEffect } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const testimonialsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Verified Customer",
    rating: 5,
    text: "The caramel latte from Elite Cafe is the best I've ever had. Truly exceptional quality and service.",
    image: "👩‍💼",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Regular",
    rating: 5,
    text: "I order coffee for our entire team every morning. The quality is consistently excellent!",
    image: "👨‍💼",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 5,
    role: "Food Enthusiast",
    text: "As a coffee enthusiast, I appreciate the quality of their beans. The Pour Over is exceptional.",
    image: "👩‍🎓",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1 mb-2">
    {[...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`text-sm ${index < rating ? "text-[#DEB887]" : "text-gray-200"}`}
      />
    ))}
  </div>
);

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonialsData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonialsData[current];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">

        <span className="text-[#8B4513] font-bold tracking-widest uppercase text-sm border-b-2 border-[#DEB887] pb-1">
          Testimonials
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mt-4 mb-4">
          What They Say
        </h2>
        <p className="text-gray-500 text-lg mb-12">
          Join thousands of satisfied customers who start their day with us.
        </p>

        <div className="relative">
          <div className="bg-[#FAF9F6] rounded-3xl p-10 md:p-14 shadow-xl transition-all duration-500 transform relative overflow-hidden flex flex-col items-center">

            <FaQuoteLeft className="text-4xl text-[#DEB887] mb-6 opacity-50" />

            <p className="text-gray-800 text-lg md:text-2xl leading-relaxed mb-8 italic font-serif">
              "{testimonial.text}"
            </p>

            <StarRating rating={testimonial.rating} />

            <div className="mt-4 text-center">
              <h4 className="font-bold text-gray-900 text-xl">
                {testimonial.name}
              </h4>
              <p className="text-[#8B4513] text-sm uppercase tracking-wide mt-1">{testimonial.role}</p>
            </div>

          </div>

          <div className="flex justify-center mt-8 gap-3">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current ? "bg-[#8B4513] w-6" : "bg-gray-300 hover:bg-[#DEB887]"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
