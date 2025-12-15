import { useState } from "react";
import React from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await axios.post("/auth/register", data);
      alert("Check your email for verification link");
      navigate("/login");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
