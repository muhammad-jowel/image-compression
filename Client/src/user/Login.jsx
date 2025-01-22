import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserStore from "../store/UserStore";
import SubmitButton from "../utility/SubmitButton";

const Login = () => {
  const Navigate = useNavigate();
  const { LoginFormValue, LoginFormOnChange, LoginRequest } = UserStore();

  const onFormSubmit = async (event) => {
    event.preventDefault();

    // Basic Validation
    if (!LoginFormValue.email || !LoginFormValue.password) {
      toast.error("Email and Password are required");
      return;
    }

    const postBody = { ...LoginFormValue };
    try {
      let response = await LoginRequest(postBody);
      if (response.status === "success") {
        toast.success("Login Success");
        Navigate("/");
      } else {
        toast.error(response.message || "Invalid email or password");
      }
    } catch (err) {
      toast.error(`Error logging in: ${err.message || "Unexpected error occurred"}`);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      {/* Left Section (Header) */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left mb-8 lg:mb-0 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600">
          Welcome to <span className="text-blue-800">Image Compression</span>
        </h1>
        <p className="mt-4 text-gray-600 text-sm sm:text-base max-w-md">
          Efficiently compress your images while maintaining quality. Fast, reliable, and easy to use.
        </p>
      </div>

      {/* Right Section (Login Form) */}
      <div className="w-full lg:w-1/2 max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md border-2 border-blue-300 animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Login to Your Account
        </h2>
        <form className="space-y-4" onSubmit={onFormSubmit}>
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              value={LoginFormValue.email}
              onChange={(event) => {
                LoginFormOnChange("email", event.target.value);
              }}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              value={LoginFormValue.password}
              onChange={(event) => {
                LoginFormOnChange("password", event.target.value);
              }}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {/* Submit Button */}
          <SubmitButton
            type="submit"
            text="Login"
            className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          />
        </form>
        {/* Additional Links */}
        <div className="text-sm text-center text-gray-500">
          <p>
            <Link to="/forget-password" className="text-blue-600 hover:underline">
              Forgot your password?
            </Link>
          </p>
          <p className="mt-1">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
