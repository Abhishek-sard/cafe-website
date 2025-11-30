import React, { useState } from "react";
import { FaCoffee, FaMugHot, FaPlus, FaCheck } from "react-icons/fa";

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
        id: 4,
        category: "simple",
        title: "French Press",
        description: "Full-bodied coffee with rich oils and intense flavor",
        price: 4.25,
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
        id: 7,
        category: "milk",
        title: "Vanilla Cappuccino",
        description: "Classic cappuccino with a hint of natural vanilla",
        price: 4.5,
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

    const categories = [
        { id: "all", label: "All Coffees" },
        { id: "black", label: "Black Coffee" },
        { id: "simple", label: "Simple Coffee" },
        { id: "milk", label: "Milk Coffee" },
    ];

    const handleAddToCart = (id) => {
        setCartAdded((prev) => ({ ...prev, [id]: true }));
        setTimeout(() => {
            setCartAdded((prev) => ({ ...prev, [id]: false }));
        }, 1000);
        console.log("Item added to cart:", id);
    };

    const filteredProducts =
        activeCategory === "all"
            ? productsData
            : productsData.filter((p) => p.category === activeCategory);

    return (
        <section className="py-16 bg-[#6b4021]">
            <div className="max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-white font-semibold tracking-widest uppercase text-sm">
                        Customer Favorites
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-2">
                        Our Best Selling Items
                    </h2>
                    <p className="text-white max-w-lg mx-auto text-sm md:text-base">
                        Discover our most popular coffee selections, carefully crafted to satisfy every palate
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            className={`px-5 py-2 rounded-full font-semibold shadow transition-all text-sm md:text-base ${activeCategory === cat.id
                                    ? "bg-orange-600 text-black transform -translate-y-1 shadow-lg"
                                    : "bg-black text-white hover:bg-orange-600 hover:text-white hover:translate-y-[-2px]"
                                }`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="relative bg-white rounded-xl shadow hover:shadow-xl transform hover:-translate-y-1 transition-all"
                        >
                            {product.badge && (
                                <span
                                    className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold ${product.badge === "Bestseller"
                                            ? "bg-yellow-400 text-brown-900"
                                            : "bg-green-500 text-white"
                                        }`}
                                >
                                    {product.badge}
                                </span>
                            )}

                            {/* Product Image */}
                            <div
                                className={`h-36 flex items-center justify-center rounded-t-xl ${product.category === "black"
                                        ? "bg-gradient-to-br from-gray-900 to-gray-700"
                                        : product.category === "simple"
                                            ? "bg-gradient-to-br from-gray-600 to-gray-400"
                                            : product.category === "milk"
                                                ? "bg-gradient-to-br from-gray-300 to-gray-200"
                                                : "bg-gray-200"
                                    }`}
                            >
                                {product.icon || <FaCoffee size={28} className="text-white" />}
                            </div>

                            {/* Product Content */}
                            <div className="p-4 md:p-5">
                                <span className="text-[10px] md:text-xs font-semibold text-orange-600 uppercase">
                                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)} Coffee
                                </span>
                                <h4 className="text-md md:text-lg font-bold text-gray-900 mt-1 mb-1">
                                    {product.title}
                                </h4>
                                <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2">
                                    {product.description}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-base md:text-lg font-bold text-orange-600">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    <button
                                        onClick={() => handleAddToCart(product.id)}
                                        className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white transition-all ${cartAdded[product.id]
                                                ? "bg-green-500"
                                                : "bg-orange-600 hover:bg-orange-700"
                                            }`}
                                    >
                                        {cartAdded[product.id] ? <FaCheck size={12} /> : <FaPlus size={12} />}
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BestSellers;
