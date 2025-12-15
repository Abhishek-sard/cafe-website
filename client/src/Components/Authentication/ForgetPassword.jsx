import { useState } from "react";
import axios from "../utils/axiosInstance";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("/auth/forgot-password", { email });
      alert("Check your email for reset link");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
