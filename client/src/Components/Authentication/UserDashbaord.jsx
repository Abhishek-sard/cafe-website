import { useEffect, useState } from "react";
import React from "react";
import axios from "../utils/axiosInstance";

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

    if (loading) return <div className="p-10">Loading...</div>;

    return (
        <div className="p-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-[#8B4513]">My Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white p-6 rounded-lg shadow border border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <p className="font-bold text-lg">Order #{order._id.slice(-6)}</p>
                                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold 
                  ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="border-t pt-4">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm mb-2">
                                        <span>{item.name} x {item.quantity}</span>
                                        <span>${item.price}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                                    <span>Total</span>
                                    <span>${order.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default UserDashboard;