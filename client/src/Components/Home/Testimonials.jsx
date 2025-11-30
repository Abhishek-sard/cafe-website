import React, { useState, useEffect } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const testimonialsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Regular Customer",
    rating: 5,
    text: "The caramel latte from Elite Cafe is the best I've ever had. The online ordering system is so convenient!",
    image: "👩‍💼",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Office Manager",
    rating: 5,
    text: "I order coffee for our entire team every morning. The quality is consistently excellent!",
    image: "👨‍💼",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 4,
    role: "Coffee Blogger",
    text: "As a coffee enthusiast, I appreciate the quality of their beans. The Ethiopian Pour Over is exceptional.",
    image: "👩‍🎓",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1 mb-1">
    {[...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`text-sm ${index < rating ? "text-yellow-400" : "text-gray-300"}`}
      />
    ))}
    <span className="text-xs text-gray-500 ml-2">({rating}.0)</span>
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
    <section className="py-12 bg-gradient-to-r from-gray-100 via-orange-50 to-gray-100">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <span className="text-orange-600 font-semibold tracking-widest uppercase text-sm">
          Customer Stories
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-0 mb-2">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base mb-6">
          Our customers love us! Read their stories and see why Elite Cafe is the daily choice for coffee lovers.
        </p>

        <div className="relative">
          <div className="bg-white rounded-2xl shadow-lg p-5 md:p-7 transition-all duration-500 transform animate-fadeIn relative overflow-hidden">
            {/* Quote Icon */}
            <FaQuoteLeft className="absolute top-3 right-3 text-orange-200 text-3xl" />

            {/* Rating */}
            <StarRating rating={testimonial.rating} />

            {/* Testimonial Text */}
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
              "{testimonial.text}"
            </p>

            {/* Customer Info */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center text-xl md:text-2xl">
                {testimonial.image}
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900 text-base md:text-lg">
                  {testimonial.name}
                </h4>
                <p className="text-gray-500 text-xs md:text-sm">{testimonial.role}</p>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-3 gap-2">
            {testimonialsData.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${index === current ? "bg-orange-600" : "bg-gray-300"
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
