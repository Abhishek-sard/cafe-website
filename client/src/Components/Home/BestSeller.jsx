import React, { useState } from "react";
import { FaMugHot, FaPlus, FaCheck, FaCoffee } from "react-icons/fa";
import { useCart } from "../Cart/CartContext.jsx";

const productsData = [
    {
        id: 1,
        category: "black",
        title: "Classic Americano",
        description: "Rich espresso shots topped with hot water for a bold, smooth flavor",
        price: 3.5,
        badge: "Bestseller",
        icon: <FaMugHot size={30} className="text-white" />,
    },
    {
        id: 2,
        category: "black",
        title: "Ethiopian Pour Over",
        description: "Single-origin beans with floral notes and bright acidity",
        price: 4.75,
    },
    {
        id: 3,
        category: "simple",
        title: "House Blend Drip",
        description: "Our signature medium-roast blend with balanced flavor",
        price: 2.95,
        badge: "Bestseller",
    },
    {
        id: 5,
        category: "milk",
        title: "Caramel Macchiato",
        description: "Espresso with vanilla syrup, steamed milk and caramel drizzle",
        price: 5.25,
        badge: "Bestseller",
    },
    {
        id: 6,
        category: "milk",
        title: "Hazelnut Latte",
        description: "Smooth espresso with steamed milk and hazelnut syrup",
        price: 4.95,
        badge: "New",
    },
    {
        id: 8,
        category: "milk",
        title: "Mocha Delight",
        description: "Rich chocolate and espresso blend with steamed milk",
        price: 5.5,
    },
];

const BestSellers = () => {
    const [activeCategory, setActiveCategory] = useState("all");
    const [cartAdded, setCartAdded] = useState({});
    const { addToCart, items: cartItems } = useCart();

    const categories = [
        { id: "all", label: "All Coffees" },
        { id: "black", label: "Black Coffee" },
        { id: "simple", label: "Simple Coffee" },
        { id: "milk", label: "Milk Coffee" },
    ];

    const handleAddToCart = (product) => {
        addToCart({
            id: `best-${product.id}`,
            name: product.title,
            price: product.price,
            description: product.description,
        });
        setCartAdded((prev) => ({ ...prev, [product.id]: true }));
        setTimeout(() => {
            setCartAdded((prev) => ({ ...prev, [product.id]: false }));
        }, 1000);
    };

    const filteredProducts =
        activeCategory === "all"
            ? productsData
            : productsData.filter((p) => p.category === activeCategory);

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
                        Handpicked by our master roasters, these selections represent the pinnacle of coffee perfection.
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 text-sm tracking-wide ${activeCategory === cat.id
                                ? "bg-[#8B4513] text-white shadow-lg transform -translate-y-1"
                                : "bg-white text-gray-600 border border-gray-200 hover:border-[#8B4513] hover:text-[#8B4513]"
                                }`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
                        >
                            {product.badge && (
                                <span
                                    className={`z-10 absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${product.badge === "Bestseller"
                                        ? "bg-[#DEB887] text-[#5D4037]"
                                        : "bg-[#8B4513] text-white"
                                        }`}
                                >
                                    {product.badge}
                                </span>
                            )}

                            {/* Product Image Area */}
                            <div className="h-48 overflow-hidden relative bg-[#F5F5F5] flex items-center justify-center">
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300"></div>
                                <div className={`transform group-hover:scale-110 transition-transform duration-500`}>
                                    {product.icon || <FaCoffee size={48} className="text-[#8B4513] opacity-80" />}
                                </div>
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
                                    className={`w-full py-3 rounded-xl font-bold tracking-wide transition-all flex items-center justify-center gap-2 ${cartAdded[product.id]
                                        ? "bg-green-600 text-white"
                                        : "bg-gray-900 text-white hover:bg-[#8B4513] hover:shadow-lg"
                                        }`}
                                >
                                    {cartAdded[product.id] ? (
                                        <>Added <FaCheck /></>
                                    ) : (
                                        <>Add to Cart <FaPlus size={12} /></>
                                    )}
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default BestSellers;
