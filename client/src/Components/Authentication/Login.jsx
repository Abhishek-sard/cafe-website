import { useState } from "react";
import React from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        try {
            const res = await axios.post("/auth/login", data);
            localStorage.setItem("accesstoken", res.data.accessToken);
            localStorage.setItem("role", res.data.user.role);
            navigate(res.data.user.role === "admin" ? "/admin" : "/user/dashboard");
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

                <input name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2 mb-4 rounded" />

                <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border p-2 mb-4 rounded" />

                <button onClick={handleSubmit} className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
            </div>
        </div>

    );

};
export default Login;