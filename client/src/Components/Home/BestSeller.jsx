import React, { useState, useEffect } from "react";
import { FaMugHot, FaPlus, FaCheck, FaCoffee } from "react-icons/fa";
import { useCart } from "../Cart/CartContext.jsx";
import axios from "../utils/axiosInstance";

const BestSellers = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartAdded, setCartAdded] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/products");
        // Transform database products to match component structure
        const transformedProducts = data.map((product) => ({
          id: product._id,
          category: product.category?.toLowerCase() || "all",
          title: product.name,
          description: product.description || "",
          price: product.price,
          image: product.image || "",
          badge: null, // No badges for now, can be added by admin later
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

  // Dynamic categories based on products
  const categories = [
    { id: "all", label: "All Products" },
    ...Array.from(new Set(products.map((p) => p.category)))
      .filter((cat) => cat && cat !== "all")
      .map((cat) => ({
        id: cat,
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
      })),
  ];

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
    });
    setCartAdded((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setCartAdded((prev) => ({ ...prev, [product.id]: false }));
    }, 1000);
  };

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="py-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[#8B4513] font-bold tracking-widest uppercase text-sm border-b-2 border-[#DEB887] pb-1">
            Curated Selection
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
            Our Favorites
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Handpicked by our master roasters, these selections represent the
            pinnacle of coffee perfection.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 text-sm tracking-wide ${
                activeCategory === cat.id
                  ? "bg-[#8B4513] text-white shadow-lg transform -translate-y-1"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#8B4513] hover:text-[#8B4513]"
              }`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin h-12 w-12 border-4 border-[#8B4513] rounded-full border-t-transparent mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading products...</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <FaCoffee className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-400 mb-2">
                  No Products Available
                </h3>
                <p className="text-gray-500">
                  Products will appear here once the admin adds them.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  >
                    {/* Product Image Area */}
                    <div className="h-48 overflow-hidden relative bg-[#F5F5F5] flex items-center justify-center">
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300"></div>
                      {product.image &&
                      (product.image.startsWith("http") ||
                        product.image.startsWith("/uploads")) ? (
                        <img
                          src={
                            product.image.startsWith("/uploads")
                              ? `https://cafeserver.novaitsolutionnp.com${product.image}`
                              : product.image
                          }
                          alt={product.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="transform group-hover:scale-110 transition-transform duration-500">
                          <FaCoffee
                            size={48}
                            className="text-[#8B4513] opacity-80"
                          />
                        </div>
                      )}
                    </div>

                    {/* Product Content */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xl font-bold text-gray-900 font-serif group-hover:text-[#8B4513] transition-colors">
                          {product.title}
                        </h4>
                        <span className="text-lg font-bold text-[#8B4513] font-mono">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 mb-6 line-clamp-2 h-10">
                        {product.description}
                      </p>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`w-full py-3 rounded-xl font-bold tracking-wide transition-all flex items-center justify-center gap-2 ${
                          cartAdded[product.id]
                            ? "bg-green-600 text-white"
                            : "bg-gray-900 text-white hover:bg-[#8B4513] hover:shadow-lg"
                        }`}
                      >
                        {cartAdded[product.id] ? (
                          <>
                            Added <FaCheck />
                          </>
                        ) : (
                          <>
                            Add to Cart <FaPlus size={12} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
export default BestSellers;
