import { useState } from "react";
import React from "react";
import axios from "../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/auth/login", data);
            localStorage.setItem("accesstoken", res.data.accessToken);
            localStorage.setItem("role", res.data.user.role);
            // Store user ID - try _id first (MongoDB), then id
            const userId = res.data.user._id || res.data.user.id;
            if (userId) {
                localStorage.setItem("userId", userId);
            }
            // Clear guest cart on login - user will get their own cart
            const guestCartKey = "eliteCafeCart_guest";
            localStorage.removeItem(guestCartKey);
            navigate(res.data.user.role === "admin" ? "/admin" : "/user/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC]">
            <div className="bg-white shadow-2xl rounded-2xl overflow-hidden flex w-full max-w-4xl h-[600px]">

                {/* Image Section */}
                <div className="hidden md:flex w-1/2 bg-cover bg-center items-center justify-center p-12 text-white"
                    style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf')" }}>
                    <div className="text-center">
                        <h2 className="text-4xl font-bold mb-4 font-serif">Welcome Back</h2>
                        <p className="text-lg">Experience the finest coffee blend with Elite Cafe.</p>
                    </div>
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                    <h2 className="text-4xl font-bold text-[#8B4513] mb-2 font-serif text-center md:text-left">Login</h2>
                    <p className="text-gray-500 mb-8 text-center md:text-left">Sign in to your account</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <FaEnvelope className="absolute top-4 left-4 text-gray-400" />
                            <input
                                name="email"
                                placeholder="Email Address"
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#8B4513] transition"
                            />
                        </div>

                        <div className="relative">
                            <FaLock className="absolute top-4 left-4 text-gray-400" />
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#8B4513] transition"
                            />
                        </div>

                        <button className="w-full bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition transform duration-200">
                            LOGIN
                        </button>
                    </form>

                    <div className="mt-8 text-center text-gray-500">
                        Don't have an account? <Link to="/register" className="text-[#8B4513] font-bold hover:underline">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;