import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post(`/auth/reset-password/${token}`, { password });
      alert("Password reset successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
