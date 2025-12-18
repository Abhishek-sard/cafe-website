import React from "react";
import { FaMinus, FaPlus, FaTrashAlt, FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext.jsx";

const CartPage = () => {
  const {
    cartList,
    cartCount,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (cartList.length === 0) {
    return (
      <section className="min-h-[70vh] bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white shadow-lg rounded-3xl p-10 max-w-lg w-full space-y-4">
          <FaShoppingBag className="text-5xl text-orange-500 mx-auto" />
          <h2 className="text-2xl font-bold text-[#3E2723]">
            Your cart is feeling lonely
          </h2>
          <p className="text-gray-600">
            Browse our menu and add your favorite coffees or pastries to get
            started.
          </p>
          <Link
            to="/menu"
            className="inline-flex justify-center bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-700 transition"
          >
            Explore Menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-orange-50 via-white to-amber-50 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-orange-500">
            Cart Overview
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#3E2723]">
            Ready to Checkout
          </h1>
          <p className="text-gray-600">
            You have {cartCount} item{cartCount > 1 ? "s" : ""} in your cart
            totalling ${cartTotal.toFixed(2)}.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {cartList.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-2xl shadow flex flex-col md:flex-row md:items-center gap-4 border border-orange-100"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#3E2723]">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-orange-600"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="w-10 text-center font-semibold text-[#3E2723]">
                      {item.quantity}
                    </span>
                    <button
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-orange-600"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#3E2723]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="bg-white rounded-2xl shadow-lg p-6 space-y-4 border border-orange-100">
            <h3 className="text-xl font-semibold text-[#3E2723]">
              Order Summary
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span>${(cartTotal * 0.05).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-[#3E2723] text-base pt-2 border-t border-gray-100">
                <span>Total</span>
                <span>${(cartTotal * 1.05).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={clearCart}
              className="w-full text-sm text-red-500 hover:text-red-600 underline"
            >
              Clear Cart
            </button>

            <Link to="/checkout" className="block w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-full font-semibold transition text-center">
              Proceed to Checkout
            </Link>
            <p className="text-xs text-gray-400 text-center">
              * Secure checkout supports cards, wallets and PayPal.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CartPage;


