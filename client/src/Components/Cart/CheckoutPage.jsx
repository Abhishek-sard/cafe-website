import React, { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { FaCreditCard, FaPaypal, FaWallet, FaUser, FaMapMarkerAlt, FaCity, FaGlobe, FaMailBulk } from "react-icons/fa";

const CheckoutPage = () => {
    const { cartList, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState({
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("Credit Card");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = (e) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    };

    const handlePayment = async () => {
        if (!shippingAddress.fullName || !shippingAddress.address) {
            alert("Please fill in shipping details");
            return;
        }

        setIsProcessing(true);

        // Simulate payment delay
        setTimeout(async () => {
            try {
                await axios.post("/orders", {
                    items: cartList,
                    totalAmount: cartTotal * 1.05, // Including tax
                    shippingAddress,
                    paymentMethod,
                });

                clearCart();
                alert("Payment Successful! Order Placed.");
                navigate("/user/dashboard");
            } catch (error) {
                alert("Order Failed: " + (error.response?.data?.message || "Unknown error"));
            } finally {
                setIsProcessing(false);
            }
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">

                {/* Shipping Details */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4 text-brown-800 flex items-center gap-2">
                        <FaMapMarkerAlt /> Shipping Details
                    </h2>
                    <div className="space-y-4">

                        {/* Full Name */}
                        <div className="relative">
                            <FaUser className="absolute left-3 top-3 text-gray-400" />
                            <input
                                name="fullName"
                                placeholder="Full Name"
                                onChange={handleChange}
                                className="w-full border p-2 pl-10 rounded focus:outline-none focus:border-orange-500"
                            />
                        </div>

                        {/* Address */}
                        <div className="relative">
                            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                            <input
                                name="address"
                                placeholder="Address"
                                onChange={handleChange}
                                className="w-full border p-2 pl-10 rounded focus:outline-none focus:border-orange-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* City */}
                            <div className="relative">
                                <FaCity className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    name="city"
                                    placeholder="City"
                                    onChange={handleChange}
                                    className="w-full border p-2 pl-10 rounded focus:outline-none focus:border-orange-500"
                                />
                            </div>

                            {/* Postal Code */}
                            <div className="relative">
                                <FaMailBulk className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    name="postalCode"
                                    placeholder="Postal Code"
                                    onChange={handleChange}
                                    className="w-full border p-2 pl-10 rounded focus:outline-none focus:border-orange-500"
                                />
                            </div>
                        </div>

                        {/* Country */}
                        <div className="relative">
                            <FaGlobe className="absolute left-3 top-3 text-gray-400" />
                            <input
                                name="country"
                                placeholder="Country"
                                onChange={handleChange}
                                className="w-full border p-2 pl-10 rounded focus:outline-none focus:border-orange-500"
                            />
                        </div>

                    </div>
                </div>

                {/* Payment & Order Summary */}
                <div className="bg-white p-6 rounded-lg shadow space-y-6">

                    {/* Summary */}
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-brown-800">Order Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span>Subtotal:</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total (Inc. Tax):</span>
                            <span>${(cartTotal * 1.05).toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-brown-800">Payment Method</h2>
                        <div className="flex gap-4 mb-6">
                            <button onClick={() => setPaymentMethod("Credit Card")} className={`flex-1 p-4 border rounded flex flex-col items-center gap-2 ${paymentMethod === "Credit Card" ? "bg-orange-100 border-orange-500" : ""}`}>
                                <FaCreditCard className="text-2xl" /> <span>Card</span>
                            </button>
                            <button onClick={() => setPaymentMethod("PayPal")} className={`flex-1 p-4 border rounded flex flex-col items-center gap-2 ${paymentMethod === "PayPal" ? "bg-orange-100 border-orange-500" : ""}`}>
                                <FaPaypal className="text-2xl text-blue-600" /> <span>PayPal</span>
                            </button>
                            <button onClick={() => setPaymentMethod("Wallet")} className={`flex-1 p-4 border rounded flex flex-col items-center gap-2 ${paymentMethod === "Wallet" ? "bg-orange-100 border-orange-500" : ""}`}>
                                <FaWallet className="text-2xl text-brown-600" /> <span>Wallet</span>
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className={`w-full py-3 rounded text-white font-bold transition ${isProcessing ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                        {isProcessing ? "Processing Payment..." : `Pay $${(cartTotal * 1.05).toFixed(2)}`}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
