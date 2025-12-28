import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFilter,
  FaPlus,
  FaCheck,
  FaStar,
  FaFire,
  FaCoffee,
  FaLeaf,
  FaSnowflake,
  FaBreadSlice,
  FaMugHot,
} from "react-icons/fa";
import { useCart } from "../Cart/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [addedItems, setAddedItems] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { cartCount, addToCart } = useCart();

  // Dynamic categories based on products in database
  const [menuCategories, setMenuCategories] = useState([
    { id: "all", label: "All Items", icon: <FaCoffee /> },
  ]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/products");
        // Transform database products to match menu item structure
        const transformedProducts = data.map((product) => ({
          id: product._id,
          name: product.name,
          category: product.category?.toLowerCase() || "all",
          description: product.description || "",
          price: product.price,
          image: product.image || "☕", // Use image URL or default emoji
          popular: false,
          featured: false,
          rating: 4.5, // Default rating for database products
        }));
        setProducts(transformedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Update categories based on available products
  useEffect(() => {
    if (products.length > 0) {
      const categoryMap = {
        espresso: { id: "espresso", label: "Espresso", icon: <FaMugHot /> },
        brew: { id: "brew", label: "Brewed", icon: <FaCoffee /> },
        cold: { id: "cold", label: "Cold Brew", icon: <FaSnowflake /> },
        tea: { id: "tea", label: "Tea", icon: <FaLeaf /> },
        pastry: { id: "pastry", label: "Pastries", icon: <FaBreadSlice /> },
        special: { id: "special", label: "Specialty", icon: <FaStar /> },
        specialty: { id: "special", label: "Specialty", icon: <FaStar /> },
        black: { id: "black", label: "Black Coffee", icon: <FaCoffee /> },
        simple: { id: "simple", label: "Simple Coffee", icon: <FaCoffee /> },
        milk: { id: "milk", label: "Milk Coffee", icon: <FaMugHot /> },
      };

      const uniqueCategories = new Set();
      products.forEach((product) => {
        const cat = product.category?.toLowerCase();
        if (cat && categoryMap[cat]) {
          uniqueCategories.add(cat);
        } else if (cat && !categoryMap[cat]) {
          // For unknown categories, create a generic entry
          uniqueCategories.add(cat);
        }
      });

      const dynamicCategories = [
        { id: "all", label: "All Items", icon: <FaCoffee /> },
        ...Array.from(uniqueCategories).map(
          (cat) =>
            categoryMap[cat] || {
              id: cat,
              label: cat.charAt(0).toUpperCase() + cat.slice(1),
              icon: <FaCoffee />,
            }
        ),
      ];

      setMenuCategories(dynamicCategories);
    }
  }, [products]);

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
    });
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(
      () => setAddedItems((prev) => ({ ...prev, [item.id]: false })),
      900
    );
  };

  // Use only database products - no hardcoded items
  const allMenuItems = products;

  const filteredItems = allMenuItems.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
              index < Math.floor(rating) ? "text-[#DEB887]" : "text-gray-200"
            }`}
          />
        ))}
        <span className="text-xs text-gray-400 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30 transition-shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-serif font-bold text-gray-900">
                Our Menu
              </h1>
              <p className="text-sm text-gray-500">
                Handcrafted beverages & fresh pastries
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80 group">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#8B4513] transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-full focus:bg-white focus:border-[#DEB887] focus:ring-4 focus:ring-[#DEB887]/20 outline-none transition-all shadow-inner"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap border ${
                  activeCategory === category.id
                    ? "bg-[#8B4513] text-white border-[#8B4513] shadow-md transform scale-105"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#8B4513] hover:text-[#8B4513]"
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 self-end lg:self-auto">
            <FaFilter className="text-[#8B4513]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-2 pr-8 py-2 bg-transparent border-none font-semibold text-gray-700 cursor-pointer focus:ring-0 hover:text-[#8B4513] transition-colors text-right"
            >
              <option value="popular">Popularity</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin h-12 w-12 border-4 border-[#8B4513] rounded-full border-t-transparent mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading menu items...</p>
          </div>
        )}

        {/* Menu Items Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {sortedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col"
              >
                {/* Image Area */}
                <div className="relative h-48 bg-[#F5F5F5] rounded-t-2xl overflow-hidden flex items-center justify-center p-6">
                  <div className="absolute inset-0 bg-[#8B4513]/5 group-hover:bg-[#8B4513]/10 transition-colors"></div>
                  {item.image &&
                  (item.image.startsWith("http") ||
                    item.image.startsWith("/uploads")) ? (
                    <img
                      src={
                        item.image.startsWith("/uploads")
                          ? `https://cafeserver.novaitsolutionnp.com:3000${item.image}`
                          : item.image
                      }
                      alt={item.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-6xl transform group-hover:scale-110 transition-transform duration-500 drop-shadow-sm filter">
                      {item.image || "☕"}
                    </span>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                    {item.popular && (
                      <span className="bg-[#DEB887] text-[#5D4037] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        Popular
                      </span>
                    )}
                    {item.featured && (
                      <span className="bg-[#8B4513] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif font-bold text-gray-900 text-lg leading-tight group-hover:text-[#8B4513] transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-bold text-[#8B4513] text-lg bg-[#FAF9F6] px-2 py-0.5 rounded-md">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                    <StarRating rating={item.rating} />

                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                        addedItems[item.id]
                          ? "bg-green-500 text-white transform scale-110"
                          : "bg-white text-gray-900 border border-gray-200 hover:bg-[#8B4513] hover:text-white hover:border-[#8B4513]"
                      }`}
                    >
                      {addedItems[item.id] ? (
                        <FaCheck size={14} />
                      ) : (
                        <FaPlus size={12} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && sortedItems.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 opacity-20 filter grayscale">☕</div>
            <h3 className="text-xl font-bold text-gray-400 mb-2 font-serif">
              {products.length === 0
                ? "No Products Available"
                : "No items found"}
            </h3>
            <p className="text-gray-400">
              {products.length === 0
                ? "Products will appear here once the admin adds them to the menu."
                : "We couldn't find any items matching your search."}
            </p>
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          className={`${
            cartCount > 0
              ? "bg-[#8B4513] hover:bg-[#A0522D] shadow-2xl scale-100"
              : "bg-gray-400 scale-95 opacity-80"
          } text-white pl-6 pr-2 py-2 rounded-full font-bold flex items-center gap-3 transition-all transform hover:-translate-y-1`}
          disabled={cartCount === 0}
          onClick={() => cartCount > 0 && navigate("/cart")}
        >
          <span className="text-sm uppercase tracking-wider">Cart</span>
          <span className="bg-white text-[#8B4513] rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold shadow-inner">
            {cartCount}
          </span>
        </button>
      </div>
    </div>
  );
};

export default MenuPage;
