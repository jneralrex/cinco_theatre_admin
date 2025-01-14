import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/cinco-logo.png";
import Api from "../utils/AxiosInstance";
const SignIn = () => {
  const navigate = useNavigate();
  const [signInAdmin, setSignInAdmin] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInput = (e) => {
    setSignInAdmin({ ...signInAdmin, [e.target.name]: e.target.value });
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!signInAdmin.usernameOrEmail || !signInAdmin.password) {
      setError("Fields can not be empty");
    }
    setLoading(true);
    setError("");
    try {
      const res = await Api.post(`/auth/signin`, signInAdmin);
      if(res.data.message === "Login successful"){
        navigate("/dashboard")
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setSignInAdmin({ usernameOrEmail: "", password: "" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center">
        <img src={Logo} alt="" className="" />
      </div>
      <div className="p-3 max-w-lg mx-auto">
        <p className="text-center text-2xl text-gray-500 p-2">Web Admin</p>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
          <label htmlFor="">
            <input
              type="text"
              name="usernameOrEmail"
              id=""
              className="w-full border rounded-lg p-2"
              placeholder="name or email"
              value={signInAdmin.usernameOrEmail}
              onChange={handleInput}
            />
          </label>
          <label htmlFor="">
            Password
            <input
              type="password"
              name="password"
              id=""
              className="w-full border rounded-lg p-2"
              placeholder="password"
              value={signInAdmin.password}
              onChange={handleInput}
            />
          </label>
          <button
            className="w-full bg-purple-700 rounded-lg p-2 text-white text-lg"
            disabled={loading}
          >
            {loading ? "Submitting" : "Submit"}
          </button>
        </form>
        <div className="w-full flex flex-row justify-between text-[12px] md:text-[14px]">
          <div className=" flex flex-row gap-3">
            Dont have an account?
            <Link to='/sign-up'>
              <span className="text-blue-600">
                sign up
              </span>
            </Link>
          </div>
          <Link to='/forgot-password'>
            <div>
              Forgot password
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;