import React from "react";
import { Link } from "react-router-dom";
import { FaAward, FaHeart, FaLeaf, FaUsers, FaCoffee, FaClock } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] flex items-center justify-center text-center text-white overflow-hidden">
        {/* Background Image */}
        <img
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/src/assets/about-hero.png"
          alt="Elite Cafe Story"
        />

        {/* Light Overlay for Clarity & Readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

        <div className="relative z-20 max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">Our Story</h1>
          <p className="text-xl md:text-2xl text-amber-200 max-w-3xl mx-auto drop-shadow-md">
            Crafting exceptional coffee experiences since 2010, one cup at a time
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Passion for Perfect Coffee
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                At Elite Cafe, we believe that great coffee is more than just a beverage -
                it's an experience that brings people together. Founded in 2010 by two coffee
                enthusiasts, Sarah and Michael, our journey began with a simple mission: to
                serve the finest coffee while creating a warm, welcoming space for our community.
              </p>
              <p className="text-lg text-gray-700">
                Every bean we source, every cup we brew, and every pastry we bake is crafted
                with attention to detail and a commitment to excellence that has made us a
                beloved destination for coffee lovers.
              </p>
            </div>
            <div className="space-y-8">
              <div className="relative group">
                <div className="absolute -inset-4 bg-[#8B4513]/5 rounded-2xl blur-lg group-hover:bg-[#8B4513]/10 transition duration-500"></div>
                <img
                  src="/src/assets/our-story.png"
                  className="rounded-2xl shadow-2xl relative z-10 transition duration-500 hover:scale-[1.02] w-full h-[300px] object-cover"
                  alt="Our Coffee Passion"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-amber-100 rounded-2xl p-6 text-center border border-amber-200">
                  <FaCoffee className="text-4xl text-[#8B4513] mx-auto mb-4" />
                  <h3 className="font-bold text-[#8B4513] text-lg">50+</h3>
                  <p className="text-amber-900 text-sm">Coffee Varieties</p>
                </div>
                <div className="bg-orange-100 rounded-2xl p-6 text-center border border-orange-200">
                  <FaUsers className="text-4xl text-[#8B4513] mx-auto mb-4" />
                  <h3 className="font-bold text-[#8B4513] text-lg">10,000+</h3>
                  <p className="text-orange-900 text-sm">Happy Customers</p>
                </div>
                <div className="bg-orange-100 rounded-2xl p-6 text-center border border-orange-200">
                  <FaAward className="text-4xl text-[#8B4513] mx-auto mb-4" />
                  <h3 className="font-bold text-[#8B4513] text-lg">15</h3>
                  <p className="text-orange-900 text-sm">Industry Awards</p>
                </div>
                <div className="bg-amber-100 rounded-2xl p-6 text-center border border-amber-200">
                  <FaClock className="text-4xl text-[#8B4513] mx-auto mb-4" />
                  <h3 className="font-bold text-[#8B4513] text-lg">13 Years</h3>
                  <p className="text-amber-900 text-sm">Of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              The principles that guide everything we do at Elite Cafe
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaLeaf className="text-3xl text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sustainability</h3>
              <p className="text-gray-700">
                We partner with ethical farms that practice sustainable agriculture
                and ensure fair wages for coffee growers. Our packaging is 100%
                recyclable and we compost all our coffee grounds.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-3xl text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality</h3>
              <p className="text-gray-700">
                From bean selection to brewing techniques, we never compromise on quality.
                Our baristas are trained to craft each drink with precision and passion,
                ensuring consistency in every cup.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUsers className="text-3xl text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community</h3>
              <p className="text-gray-700">
                We're more than just a coffee shop - we're a gathering place. We support
                local artists, host community events, and create spaces where connections
                can flourish over great coffee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Coffee Journey
            </h2>
            <p className="text-xl text-gray-700">
              From farm to cup, excellence in every step
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brown-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brown-900">1</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Ethical Sourcing</h3>
              <p className="text-gray-700 text-sm">
                We directly source from sustainable farms in Ethiopia, Colombia,
                and Guatemala, ensuring fair trade practices.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brown-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brown-900">2</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Artisan Roasting</h3>
              <p className="text-gray-700 text-sm">
                Our master roasters use small-batch techniques to bring out the
                unique flavor profiles of each bean variety.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brown-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brown-900">3</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Expert Preparation</h3>
              <p className="text-gray-700 text-sm">
                Certified baristas craft each drink with precision, using state-of-the-art
                equipment and traditional methods.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brown-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brown-900">4</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Perfect Serving</h3>
              <p className="text-gray-700 text-sm">
                Every beverage is served at the ideal temperature with attention to
                presentation and customer preference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Founders
            </h2>
            <p className="text-xl text-gray-700">
              The passionate minds behind Elite Cafe
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full flex items-center justify-center text-4xl">
                  👩‍💼
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Sarah Johnson</h3>
                  <p className="text-orange-600 font-semibold mb-4">Co-Founder & Head Roaster</p>
                  <p className="text-gray-700">
                    With 15 years in the specialty coffee industry, Sarah's expertise in
                    bean selection and roasting has been instrumental in defining our
                    signature flavor profiles. Her passion for sustainable sourcing drives
                    our ethical practices.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full flex items-center justify-center text-4xl">
                  👨‍💼
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Michael Chen</h3>
                  <p className="text-orange-600 font-semibold mb-4">Co-Founder & Operations</p>
                  <p className="text-gray-700">
                    Michael's background in hospitality and business management ensures
                    that every aspect of Elite Cafe operates seamlessly. He focuses on
                    creating exceptional customer experiences and fostering community
                    connections.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brown-800 to-brown-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-6">
            Experience the Elite Difference
          </h2>
          <p className="text-xl text-amber-600 mb-8 max-w-2xl mx-auto">
            Visit us today and discover why we've been the community's favorite coffee
            destination for over a decade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-orange-600 hover:bg-orange-700 text-center text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105">
              Visit Our Cafe
            </Link>
            <Link to="/menu" className="border-2 border-orange-600 hover:bg-white hover:text-brown-900 text-center text-amber-600 px-8 py-3 rounded-full font-semibold transition-all">
              View Our Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;