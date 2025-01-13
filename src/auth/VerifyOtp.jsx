import React, { useState } from "react";
import Api from "../utils/AxiosInstance";
import { Link, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [verifyAdminOtp, setVerifyAdminOtp] = useState({ email: "", otp: "" });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setVerifyAdminOtp({ ...verifyAdminOtp, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!verifyAdminOtp.email || !verifyAdminOtp.otp) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const res = await Api.post(`auth/verifyotp`, verifyAdminOtp);
      setResponse(res.data.message);
      if (res.data.message === "OTP verified. Registration complete.") {
        navigate("/sign-in");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      // Clear OTP field on error
      setVerifyAdminOtp({ ...verifyAdminOtp, otp: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <div>Verify OTP</div>
      </div>
      <div>
        <div className="p-3 max-w-lg mx-auto">
          <p className="text-center text-2xl text-gray-500 p-2">Web Admin</p>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                value={verifyAdminOtp.email}
                onChange={handleInput}
                id="email"
                className="w-full border rounded-lg p-2"
                placeholder="Registered email"
              />
            </label>
            <label htmlFor="otp">
              OTP
              <input
                type="text"
                name="otp"
                value={verifyAdminOtp.otp}
                onChange={handleInput}
                id="otp"
                className="w-full border rounded-lg p-2"
                placeholder="* * * * * *"
              />
            </label>
            <button
              type="submit"
              className="w-full bg-purple-700 rounded-lg p-2 text-white text-lg"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
        <div className="text-center mt-4">
          {!response ? (
            <Link to="/resend-otp" className="text-blue-500 underline">
              Resend OTP
            </Link>
          ) : (
            <p className="text-green-500">{response}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
