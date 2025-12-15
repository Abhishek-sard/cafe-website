import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        await axios.get(`/auth/verify/${token}`);
        alert("Email verified successfully");
        navigate("/login");
      } catch (err) {
        alert(err.response.data.message);
      }
    };
    verify();
  }, []);

  return <h1 className="text-center mt-20 text-xl">Verifying your email...</h1>;
};

export default VerifyEmail;
