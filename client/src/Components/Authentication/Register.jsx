import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Register = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", data);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC]">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden flex w-full max-w-4xl h-[600px]">

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-[#8B4513] mb-2 font-serif text-center md:text-left">Join Us</h2>
          <p className="text-gray-500 mb-8 text-center md:text-left">Create your account today</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <FaUser className="absolute top-4 left-4 text-gray-400" />
              <input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#8B4513] transition"
              />
            </div>

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
              REGISTER
            </button>
          </form>

          <div className="mt-8 text-center text-gray-500">
            Already have an account? <Link to="/login" className="text-[#8B4513] font-bold hover:underline">Login</Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden md:flex w-1/2 bg-cover bg-center items-center justify-center p-12 text-white"
          style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1509042239860-f550ce710b93')" }}>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4 font-serif">Welcome</h2>
            <p className="text-lg">Join the community of coffee lovers.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
export default Register;
