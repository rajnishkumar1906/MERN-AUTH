import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {
  const { backendUrl } = useContext(AppContext);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const sendOtp = async () => {
      try {
        await axios.post(`${backendUrl}/api/auth/send-verify-otp`, {}, { withCredentials: true });
        toast.success("OTP sent to your email!");
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to send OTP");
      } finally {
        setSendingOtp(false);
      }
    };
    sendOtp();
  }, [backendUrl]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/verify-account`,
        { otp },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("Email verified successfully!");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600">
      <form
        onSubmit={handleVerify}
        className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-lg w-80 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Verify Your Email</h2>
        <p className="text-gray-600 text-sm text-center">
          Enter the OTP sent to your registered email
        </p>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={loading || sendingOtp}
          className={`bg-indigo-600 text-white px-4 py-2 rounded w-full transition hover:bg-indigo-700 ${
            loading || sendingOtp ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Verifying..." : sendingOtp ? "Sending OTP..." : "Verify Email"}
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
