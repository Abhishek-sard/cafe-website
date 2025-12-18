import { useEffect, useState } from "react";
import React from "react";
import axios from "../utils/axiosInstance";
import { FaBox, FaMoneyBillWave, FaClock, FaCheckCircle, FaSearch, FaCoffee, FaEnvelope, FaTrash, FaPlus } from "react-icons/fa";

const AdminDashboard = () => {
    // Orders State
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [orderStats, setOrderStats] = useState({ totalOrders: 0, totalRevenue: 0, pendingOrders: 0, completedOrders: 0 });
    const [orderLoading, setOrderLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    // Products State
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: "", category: "", price: "", description: "", image: "" });
    const [showAddProduct, setShowAddProduct] = useState(false);

    // Queries State
    const [queries, setQueries] = useState([]);

    const [activeTab, setActiveTab] = useState("orders");

    const fetchOrders = async () => {
        try {
            const [ordersRes, statsRes] = await Promise.all([
                axios.get("/orders/all"),
                axios.get("/orders/stats")
            ]);
            setOrders(ordersRes.data);
            setFilteredOrders(ordersRes.data);
            setOrderStats(statsRes.data);
        } catch (error) {
            console.error(error);
        } finally {
            setOrderLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get("/products");
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchQueries = async () => {
        try {
            const { data } = await axios.get("/queries");
            setQueries(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        if (activeTab === "products") fetchProducts();
        if (activeTab === "queries") fetchQueries();
    }, [activeTab]);

    // Order Filtering Logic
    useEffect(() => {
        let result = orders;
        if (filterStatus !== "All") {
            result = result.filter(o => o.status === filterStatus);
        }
        if (searchTerm) {
            result = result.filter(o =>
                o._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (o.user?.email || "").toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredOrders(result);
    }, [orders, filterStatus, searchTerm]);

    // Handlers
    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axios.put(`/orders/${id}/status`, { status: newStatus });
            setOrders(prev => prev.map(o => o._id === id ? { ...o, status: newStatus } : o));
            fetchOrders();
            alert("Order updated successfully");
        } catch (error) {
            alert("Failed to update order");
        }
    };

    const handleAddProduct = async () => {
        try {
            await axios.post("/products", newProduct);
            alert("Product added!");
            setShowAddProduct(false);
            setNewProduct({ name: "", category: "", price: "", description: "", image: "" });
            fetchProducts();
        } catch (error) {
            alert("Failed to add product");
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!confirm("Are you sure?")) return;
        try {
            await axios.delete(`/products/${id}`);
            fetchProducts();
        } catch (error) {
            alert("Failed to delete product");
        }
    };

    if (orderLoading && activeTab === 'orders') return <div className="p-10 flex justify-center"><div className="animate-spin h-10 w-10 border-4 border-orange-500 rounded-full border-t-transparent"></div></div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-[#8B4513]">Admin Dashboard</h1>

            {/* Navigation Tabs */}
            <div className="flex gap-4 mb-8 border-b">
                <button onClick={() => setActiveTab("orders")} className={`pb-2 px-4 font-semibold ${activeTab === 'orders' ? 'border-b-4 border-[#8B4513] text-[#8B4513]' : 'text-gray-500'}`}>Orders</button>
                <button onClick={() => setActiveTab("products")} className={`pb-2 px-4 font-semibold ${activeTab === 'products' ? 'border-b-4 border-[#8B4513] text-[#8B4513]' : 'text-gray-500'}`}>Products</button>
                <button onClick={() => setActiveTab("queries")} className={`pb-2 px-4 font-semibold ${activeTab === 'queries' ? 'border-b-4 border-[#8B4513] text-[#8B4513]' : 'text-gray-500'}`}>Queries</button>
            </div>

            {/* ORDERS TAB */}
            {activeTab === "orders" && (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 flex items-center justify-between">
                            <div>
                                <p className="text-gray-500">Total Orders</p>
                                <h3 className="text-2xl font-bold">{orderStats.totalOrders}</h3>
                            </div>
                            <FaBox className="text-3xl text-blue-200" />
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 flex items-center justify-between">
                            <div>
                                <p className="text-gray-500">Total Revenue</p>
                                <h3 className="text-2xl font-bold">${orderStats.totalRevenue.toFixed(2)}</h3>
                            </div>
                            <FaMoneyBillWave className="text-3xl text-green-200" />
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500 flex items-center justify-between">
                            <div>
                                <p className="text-gray-500">Pending</p>
                                <h3 className="text-2xl font-bold">{orderStats.pendingOrders}</h3>
                            </div>
                            <FaClock className="text-3xl text-yellow-200" />
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500 flex items-center justify-between">
                            <div>
                                <p className="text-gray-500">Completed</p>
                                <h3 className="text-2xl font-bold">{orderStats.completedOrders}</h3>
                            </div>
                            <FaCheckCircle className="text-3xl text-purple-200" />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="bg-white p-6 rounded-t-xl shadow-sm border-b flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex gap-2">
                            {["All", "Pending", "Processing", "Delivered"].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition ${filterStatus === status ? 'bg-[#8B4513] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-64">
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                            <input
                                placeholder="Search order ID or email..."
                                className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:border-orange-500"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="bg-white shadow-sm rounded-b-xl overflow-hidden border border-t-0 border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-[#FAF9F6] text-gray-600 uppercase text-xs leading-normal tracking-wider border-b border-gray-200">
                                    <tr>
                                        <th className="py-4 px-6 text-left font-bold">Order ID</th>
                                        <th className="py-4 px-6 text-left font-bold">Customer</th>
                                        <th className="py-4 px-6 text-left font-bold">Items</th>
                                        <th className="py-4 px-6 text-left font-bold">Total</th>
                                        <th className="py-4 px-6 text-left font-bold">Status</th>
                                        <th className="py-4 px-6 text-left font-bold">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {filteredOrders.map((order) => (
                                        <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-6 text-left whitespace-nowrap font-mono text-xs font-bold text-[#8B4513]">
                                                {order._id.slice(-6).toUpperCase()}
                                            </td>
                                            <td className="py-4 px-6 text-left">
                                                <div className="font-bold text-gray-800">{order.user?.name}</div>
                                                <div className="text-xs text-gray-400">{order.user?.email}</div>
                                            </td>
                                            <td className="py-4 px-6 text-left">
                                                <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                                                    {order.items.length} items
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-left font-bold text-gray-800">
                                                ${order.totalAmount.toFixed(2)}
                                            </td>
                                            <td className="py-4 px-6 text-left">
                                                <span className={`py-1.5 px-3 rounded-full text-[10px] font-bold uppercase tracking-wider
                                                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                        order.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                                            'bg-blue-100 text-blue-700'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-left">
                                                <select
                                                    className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#8B4513] focus:ring-1 focus:ring-[#8B4513] bg-white cursor-pointer"
                                                    value={order.status}
                                                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Processing">Processing</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filteredOrders.length === 0 && (
                            <div className="p-12 text-center">
                                <p className="text-gray-400 text-lg">No orders found matching criteria.</p>
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* PRODUCTS TAB */}
            {activeTab === "products" && (
                <div className="space-y-6">
                    <button onClick={() => setShowAddProduct(!showAddProduct)} className="bg-[#8B4513] text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-[#A0522D]">
                        <FaPlus /> Add Product
                    </button>

                    {showAddProduct && (
                        <div className="bg-white p-6 rounded shadow-md border animate-fade-in">
                            <h3 className="font-bold mb-4">Add New Product</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <input placeholder="Product Name" className="border p-2 rounded" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
                                <input placeholder="Category" className="border p-2 rounded" value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} />
                                <input placeholder="Price" type="number" className="border p-2 rounded" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
                                <input placeholder="Image URL" className="border p-2 rounded" value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} />
                                <textarea placeholder="Description" className="border p-2 rounded col-span-2" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
                            </div>
                            <button onClick={handleAddProduct} className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save Product</button>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(product => (
                            <div key={product._id} className="bg-white p-4 rounded shadow flex flex-col relative">
                                <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded mb-4" />
                                <h3 className="font-bold text-lg">{product.name}</h3>
                                <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                                <p className="text-gray-700 flex-grow">{product.description}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="font-bold text-xl text-[#8B4513]">${product.price}</span>
                                    <button onClick={() => handleDeleteProduct(product._id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* QUERIES TAB */}
            {activeTab === "queries" && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-[#FAF9F6] text-gray-600 uppercase text-xs leading-normal tracking-wider border-b border-gray-200">
                                <tr>
                                    <th className="py-4 px-6 text-left font-bold">Date</th>
                                    <th className="py-4 px-6 text-left font-bold">Name</th>
                                    <th className="py-4 px-6 text-left font-bold">Email</th>
                                    <th className="py-4 px-6 text-left font-bold">Subject</th>
                                    <th className="py-4 px-6 text-left font-bold">Message</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {queries.map((q) => (
                                    <tr key={q._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6 text-left whitespace-nowrap text-xs text-gray-400">{new Date(q.createdAt).toLocaleDateString()}</td>
                                        <td className="py-4 px-6 text-left font-medium text-gray-800">{q.name}</td>
                                        <td className="py-4 px-6 text-left text-[#8B4513] underline text-xs">{q.email}</td>
                                        <td className="py-4 px-6 text-left font-bold text-gray-800">{q.subject}</td>
                                        <td className="py-4 px-6 text-left max-w-xs truncate">{q.message}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {queries.length === 0 && <div className="p-12 text-center text-gray-400">No new messages from customers.</div>}
                </div>
            )}
        </div>
    );
};
export default AdminDashboard;