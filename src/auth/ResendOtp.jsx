import React, { useState } from "react";
import Api from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

const ResendOtp = () => {
  const [resendAdminOtp, setResendAdminOtp] = useState({ email: "" });
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleInput = (e) => {
    setResendAdminOtp({ ...resendAdminOtp, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resendAdminOtp.email) {
      setError("Email required.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await Api.post(`auth/resendotp`, resendAdminOtp);
      setResponse(res.data.message);
      if (res.data.message === "New OTP sent to your email. Please verify.") {
        navigate("/otp");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setResendAdminOtp({ email: "" });
    } finally {
      setLoading(false);
    }
  };
  console.log(response);
  return (
    <div>
      <div className="flex justify-center items-center">
        <div>VerifyOtp</div>
      </div>
      <div>
        <div className="p-3 max-w-lg mx-auto">
          <p className="text-center text-2xl text-gray-500 p-2">Web Admin</p>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label htmlFor="">
              Email
              <input
                type="text"
                name="email"
                value={resendAdminOtp.email}
                onChange={handleInput}
                id=""
                className="w-full border rounded-lg p-2"
                placeholder="registered email"
              />
            </label>

            <button
              className="w-full bg-purple-700 rounded-lg p-2 text-white text-lg"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
        <div className="text-center mt-4">
          {!response ? <p className="text-green-500">{response}</p> : ""}
        </div>
      </div>
    </div>
  );
};

export default ResendOtp;
