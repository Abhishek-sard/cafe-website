import React, { useState } from "react";
import { FaSearch, FaFilter, FaPlus, FaCheck, FaStar, FaFire } from "react-icons/fa";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [sortBy, setSortBy] = useState("popular");

  const menuCategories = [
    { id: "all", label: "All Items", icon: "☕" },
    { id: "espresso", label: "Espresso", icon: "⚡" },
    { id: "brew", label: "Brewed Coffee", icon: "🔥" },
    { id: "cold", label: "Cold Brew", icon: "❄️" },
    { id: "tea", label: "Tea", icon: "🍃" },
    { id: "pastry", label: "Pastries", icon: "🥐" },
    { id: "special", label: "Specialty", icon: "⭐" },
  ];

  const menuItems = [
    // Espresso Category
    {
      id: 1,
      name: "Classic Espresso",
      category: "espresso",
      description: "Rich, bold single shot of our premium espresso",
      price: 3.25,
      image: "☕",
      popular: true,
      featured: false,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Double Espresso",
      category: "espresso",
      description: "Two shots of our signature espresso for extra strength",
      price: 4.50,
      image: "☕",
      popular: true,
      featured: false,
      rating: 4.9,
    },
    {
      id: 3,
      name: "Caramel Macchiato",
      category: "espresso",
      description: "Espresso with vanilla syrup, steamed milk and caramel drizzle",
      price: 5.75,
      image: "☕",
      popular: true,
      featured: true,
      rating: 4.9,
    },
    {
      id: 4,
      name: "Vanilla Latte",
      category: "espresso",
      description: "Smooth espresso with steamed milk and natural vanilla",
      price: 5.25,
      image: "☕",
      popular: false,
      featured: false,
      rating: 4.7,
    },

    // Brewed Coffee Category
    {
      id: 5,
      name: "House Blend Drip",
      category: "brew",
      description: "Our signature medium-roast blend with balanced flavor",
      price: 2.95,
      image: "☕",
      popular: true,
      featured: false,
      rating: 4.6,
    },
    {
      id: 6,
      name: "French Press",
      category: "brew",
      description: "Full-bodied coffee with rich oils and intense flavor",
      price: 4.25,
      image: "☕",
      popular: false,
      featured: false,
      rating: 4.5,
    },
    {
      id: 7,
      name: "Pour Over",
      category: "brew",
      description: "Single-origin beans brewed to perfection",
      price: 4.75,
      image: "☕",
      popular: false,
      featured: true,
      rating: 4.8,
    },

    // Cold Brew Category
    {
      id: 8,
      name: "Classic Cold Brew",
      category: "cold",
      description: "Smooth, less acidic cold brew steeped for 16 hours",
      price: 4.50,
      image: "🧊",
      popular: true,
      featured: false,
      rating: 4.7,
    },
    {
      id: 9,
      name: "Vanilla Sweet Cream Cold Brew",
      category: "cold",
      description: "Cold brew topped with house-made vanilla sweet cream",
      price: 5.75,
      image: "🧊",
      popular: true,
      featured: true,
      rating: 4.9,
    },
    {
      id: 10,
      name: "Iced Americano",
      category: "cold",
      description: "Espresso shots chilled with ice and water",
      price: 4.25,
      image: "🧊",
      popular: false,
      featured: false,
      rating: 4.6,
    },

    // Tea Category
    {
      id: 11,
      name: "Earl Grey",
      category: "tea",
      description: "Classic black tea with bergamot orange",
      price: 3.50,
      image: "🍃",
      popular: false,
      featured: false,
      rating: 4.4,
    },
    {
      id: 12,
      name: "Chamomile Herbal",
      category: "tea",
      description: "Soothing herbal tea with honey notes",
      price: 3.75,
      image: "🍃",
      popular: false,
      featured: false,
      rating: 4.3,
    },
    {
      id: 13,
      name: "Matcha Latte",
      category: "tea",
      description: "Premium matcha powder with steamed milk",
      price: 5.50,
      image: "🍃",
      popular: true,
      featured: true,
      rating: 4.7,
    },

    // Pastries Category
    {
      id: 14,
      name: "Almond Croissant",
      category: "pastry",
      description: "Flaky croissant filled with almond cream",
      price: 4.25,
      image: "🥐",
      popular: true,
      featured: false,
      rating: 4.8,
    },
    {
      id: 15,
      name: "Chocolate Chip Cookie",
      category: "pastry",
      description: "Freshly baked with premium chocolate chunks",
      price: 2.95,
      image: "🍪",
      popular: true,
      featured: false,
      rating: 4.9,
    },
    {
      id: 16,
      name: "Blueberry Muffin",
      category: "pastry",
      description: "Moist muffin bursting with fresh blueberries",
      price: 3.50,
      image: "🧁",
      popular: false,
      featured: false,
      rating: 4.5,
    },

    // Specialty Category
    {
      id: 17,
      name: "Seasonal Pumpkin Spice",
      category: "special",
      description: "Espresso with pumpkin spice and steamed milk",
      price: 6.25,
      image: "🎃",
      popular: true,
      featured: true,
      rating: 4.8,
    },
    {
      id: 18,
      name: "Hazelnut Mocha",
      category: "special",
      description: "Rich chocolate with hazelnut and espresso",
      price: 6.50,
      image: "⭐",
      popular: false,
      featured: true,
      rating: 4.7,
    },
  ];

  const handleAddToCart = (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: true
    }));
    setTimeout(() => {
      setCartItems(prev => ({
        ...prev,
        [itemId]: false
      }));
    }, 1000);
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "popular":
      default:
        if (a.popular && !b.popular) return -1;
        if (!a.popular && b.popular) return 1;
        return b.rating - a.rating;
    }
  });

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`text-xs ${
              index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-xs text-gray-600 ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-[#8B4513] shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-white">Discover our carefully crafted beverages and treats</p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all whitespace-nowrap ${
                activeCategory === category.id
                  ? "bg-orange-600 text-white shadow-lg transform -translate-y-0.5"
                  : "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow"
              }`}
            >
              <span className="text-base">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-700">
            <FaFilter className="text-orange-500" />
            <span className="font-medium">Sort by:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Item Image/Badge Area */}
              <div className="relative h-32 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                <span className="text-4xl">{item.image}</span>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {item.popular && (
                    <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <FaFire className="text-xs" />
                      Popular
                    </span>
                  )}
                  {item.featured && (
                    <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Item Content */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                  <span className="font-bold text-orange-600 text-lg">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <StarRating rating={item.rating} />
                  
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-all ${
                      cartItems[item.id]
                        ? "bg-green-500"
                        : "bg-orange-500 hover:bg-orange-600"
                    }`}
                  >
                    {cartItems[item.id] ? <FaCheck size={12} /> : <FaPlus size={12} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">☕</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No items found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full shadow-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105">
          <span>View Cart</span>
          <span className="bg-white text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
            3
          </span>
        </button>
      </div>
    </div>
  );
};

export default MenuPage;