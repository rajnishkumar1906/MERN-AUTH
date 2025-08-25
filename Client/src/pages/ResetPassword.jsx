import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
      if (data.success) {
        toast.success("OTP sent to your email!");
        setStep(2);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, {
        email,
        otp,
        newPassword,
      });
      if (data.success) {
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {step === 1 ? (
        <form onSubmit={handleSendOtp} className="bg-white p-6 rounded-lg shadow-md w-80">
          <h2 className="text-xl font-bold mb-4">Reset Password</h2>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 mb-4 rounded"
            required
          />
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded w-full">
            Send OTP
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword} className="bg-white p-6 rounded-lg shadow-md w-80">
          <h2 className="text-xl font-bold mb-4">Enter OTP & New Password</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border p-2 mb-4 rounded"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border p-2 mb-4 rounded"
            required
          />
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded w-full">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
