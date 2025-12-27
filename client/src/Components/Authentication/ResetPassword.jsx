import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { FaLock, FaCheckCircle } from "react-icons/fa";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    setLoading(true);
    try {
      await axios.post(`/auth/reset-password/${token}`, { password });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC] p-6">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-md p-8 md:p-12">
        {!success ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#8B4513] font-serif mb-2">Reset Password</h2>
              <p className="text-gray-500">Create a new, strong password for your account.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <FaLock className="absolute top-4 left-4 text-gray-400" />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#8B4513] transition"
                />
              </div>

              <div className="relative">
                <FaLock className="absolute top-4 left-4 text-gray-400" />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#8B4513] transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition transform duration-200 disabled:opacity-50"
              >
                {loading ? "RESETTING..." : "RESET PASSWORD"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="bg-green-100 text-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-[#8B4513] font-serif mb-2">Password Reset!</h2>
            <p className="text-gray-500 mb-8">
              Your password has been changed successfully. Redirecting you to login...
            </p>
            <Link to="/login" className="bg-[#8B4513] text-white px-8 py-3 rounded-full font-bold hover:bg-[#A0522D] transition inline-block">
              GO TO LOGIN
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
