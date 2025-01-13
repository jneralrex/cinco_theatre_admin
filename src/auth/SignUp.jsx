import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/cinco-logo.png";
import Api from "../utils/AxiosInstance";

const SignUp = () => {
  const navigate = useNavigate();

  const [regWebAdmin, setWebAdmin] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    role: import.meta.env.VITE_ADMIN_ROLE_NAME,
    profilePhoto: "",
    password: "",
  });
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInput = (e) => {
    setWebAdmin({ ...regWebAdmin, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await Api.post(`/auth/web-admin/signup`, regWebAdmin);
      console.log(res);
      navigate("/otp");
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setSignInAdmin({ usernameOrEmail: "", password: "" });
    } finally {
      setLoading(false);
    }
  };
  console.log(regWebAdmin);
  return (
    <div>
      <div className="flex justify-center items-center">
        <img src={Logo} alt="" className="h-40" />
      </div>
      <div className="p-3 max-w-lg mx-auto">
        <p className="text-center text-2xl text-gray-500 p-2">Web Admin</p>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form className="flex flex-col gap-4" onSubmit={register}>
          <label htmlFor="">
            User Name
            <input
              type="text"
              name="username"
              value={regWebAdmin.username}
              onChange={handleInput}
              className="w-full border rounded-lg p-2"
              placeholder="name"
            />
          </label>
          <label htmlFor="">
            Email
            <input
              type="text"
              name="email"
              value={regWebAdmin.email}
              onChange={handleInput}
              className="w-full border rounded-lg p-2"
              placeholder="email@mail.com"
            />
          </label>
          <label htmlFor="">
            Mobile Number
            <input
              type="text"
              name="phoneNumber"
              onChange={handleInput}
              value={regWebAdmin.phoneNumber}
              className="w-full border rounded-lg p-2"
              placeholder="+11 111 11"
            />
          </label>
          <label htmlFor="">
            Password
            <input
              type="password"
              name="password"
              onChange={handleInput}
              value={regWebAdmin.password}
              className="w-full border rounded-lg p-2"
              placeholder="password"
            />
          </label>
          <button
            className="w-full bg-purple-700 rounded-lg p-2 text-white text-lg"
            disabled={loading}
          >
            {loading ? "Submitting" : "Submit"}
          </button>
        </form>
        <div className="w-full flex flex-row gap-3">
          Already have an account?
          <Link to="/sign-in">
            <span className="text-blue-600">sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
