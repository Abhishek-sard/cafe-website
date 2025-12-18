import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  FaCreditCard,
  FaPaypal,
  FaWallet,
  FaUser,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaMailBulk,
} from "react-icons/fa";

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

  const [isProcessing, setIsProcessing] = useState(false);
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    const loadPaypalScript = async () => {
      try {
        const { data: { clientId } } = await axios.get("/api/config/paypal");
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      } catch (error) {
          console.error("Failed to load PayPal SDK", error);
      }
    };
    
    loadPaypalScript();
  }, [paypalDispatch]);


  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const createPaypalOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: { value: (cartTotal * 1.05).toFixed(2) },
        },
      ],
    }).then((orderID) => {
        return orderID;
    });
  };

  const onPaypalApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
         setIsProcessing(true);
         const orderData = {
          items: cartList,
          totalAmount: cartTotal * 1.05,
          shippingAddress,
          paymentMethod: "PayPal",
          isPaid: true,
          paidAt: new Date().toISOString(),
          paymentResult: {
             id: details.id,
             status: details.status,
             update_time: details.update_time,
             email_address: details.payer.email_address,
          },
        };

        await axios.post("/orders", orderData);
        clearCart();
        alert("Payment Successful! Order Placed.");
        navigate("/user/dashboard");
      } catch (error) {
        alert("Order Failed: " + (error.response?.data?.message || "Unknown error"));
      } finally {
         setIsProcessing(false);
      }
    });
  };

  const onPaypalError = (err) => {
    alert("PayPal Error: " + err.message);
  }


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
            <h2 className="text-xl font-bold mb-4 text-brown-800">
              Order Summary
            </h2>
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
            <h2 className="text-xl font-bold mb-4 text-brown-800">
              Pay with
            </h2>
            <div className="w-full">
              {isPending ? <div className="text-center py-4">Loading Payment Options...</div> : (
                <PayPalButtons
                  createOrder={createPaypalOrder}
                  onApprove={onPaypalApprove}
                  onError={onPaypalError}
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
