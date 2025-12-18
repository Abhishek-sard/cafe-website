import { useEffect, useState } from "react";
import React from "react";
import axios from "../utils/axiosInstance";
import { FaShoppingBag, FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get("/orders/myorders");
                setOrders(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC]"><div className="animate-spin h-12 w-12 border-4 border-[#8B4513] rounded-full border-t-transparent"></div></div>;

    return (
        <div className="min-h-screen bg-[#F5F5DC] p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-[#8B4513] font-serif border-b-4 border-[#DEB887] pb-2 inline-block">My Orders</h1>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                        <FaShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-600 mb-2">No orders yet</h2>
                        <p className="text-gray-500 mb-6">Start exploring our delicious menu!</p>
                        <Link to="/menu" className="bg-[#8B4513] text-white px-8 py-3 rounded-full font-bold hover:bg-[#A0522D] transition shadow-md">
                            BROWSE MENU
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 border border-transparent hover:border-[#DEB887]">
                                <div className="bg-[#8B4513] text-white p-4 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <FaBoxOpen />
                                        <span className="font-mono font-bold">#{order._id.slice(-6).toUpperCase()}</span>
                                    </div>
                                    <span className="text-xs opacity-80">{new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                                            ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-blue-100 text-blue-700'}`}>
                                            {order.status}
                                        </span>
                                        <span className="text-2xl font-bold text-[#8B4513]">${order.totalAmount.toFixed(2)}</span>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        {order.items.slice(0, 3).map((item, idx) => (
                                            <div key={idx} className="flex justify-between text-sm text-gray-600">
                                                <span>{item.quantity}x {item.name}</span>
                                                <span>${item.price}</span>
                                            </div>
                                        ))}
                                        {order.items.length > 3 && (
                                            <p className="text-xs text-gray-400 italic">...and {order.items.length - 3} more items</p>
                                        )}
                                    </div>

                                    <div className="border-t pt-4">
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>Payment</span>
                                            <span className="font-medium text-gray-700">{order.paymentMethod}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
export default UserDashboard;