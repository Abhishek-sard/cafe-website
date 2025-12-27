import { useState } from "react";
import axios from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/auth/forgot-password", { email });
      setSent(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC] p-6">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-md p-8 md:p-12">
        {!sent ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#8B4513] font-serif mb-2">Forgot Password?</h2>
              <p className="text-gray-500">Enter your email and we'll send you a link to reset your password.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <FaEnvelope className="absolute top-4 left-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#8B4513] transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition transform duration-200 disabled:opacity-50"
              >
                {loading ? "SENDING..." : "SEND RESET LINK"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="bg-green-100 text-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaEnvelope className="text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-[#8B4513] font-serif mb-2">Check Your Email</h2>
            <p className="text-gray-500 mb-8">
              We've sent a password reset link to <span className="font-bold">{email}</span>.
            </p>
            <button
              onClick={() => setSent(false)}
              className="text-[#8B4513] font-bold hover:underline"
            >
              Didn't receive it? Try again
            </button>
          </div>
        )}

        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <Link to="/login" className="text-gray-500 hover:text-[#8B4513] flex items-center justify-center gap-2 transition">
            <FaArrowLeft className="text-xs" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
