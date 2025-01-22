import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserStore from "../store/UserStore";
import ValidationHelper from "../utility/ValidationHelper";
import SubmitButton from "../utility/SubmitButton";

const Register = () => {
  const Navigate = useNavigate();
  const { RegisterFormValue, RegisterFormOnChange, RegisterRequest } = UserStore();

  const onFormSubmit = async (event) => {
    event.preventDefault();

    const { fullName, email, password, confirmPassword } = RegisterFormValue;

    // Basic Validation
    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    // Validate email format
    if (!ValidationHelper.IsEmail(RegisterFormValue.email)) {
      toast.error("Invalid email format!");
      return;
    }

    // Check password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const postBody = { ...RegisterFormValue };
    try {
      let response = await RegisterRequest(postBody);
      if (response.status === "success") {
        toast.success("Registration Success");
        Navigate("/login");
      } else {
        toast.error("Registration Failure");
      }
    } catch (err) {
      toast.error(`Error registering user: ${err.message || "Unexpected error occurred"}`);
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
          Join us today to manage your image compression tasks efficiently. 
          Simple, secure, and fast!
        </p>
      </div>

      {/* Right Section (Register Form) */}
      <div className="w-full lg:w-1/2 max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md border-2 border-blue-300 animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Create Your Account
        </h2>
        <form className="space-y-4" onSubmit={onFormSubmit}>
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              value={RegisterFormValue.fullName}
              onChange={(event) => RegisterFormOnChange("fullName", event.target.value)}
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              value={RegisterFormValue.email}
              onChange={(event) => RegisterFormOnChange("email", event.target.value)}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              value={RegisterFormValue.password}
              onChange={(event) => RegisterFormOnChange("password", event.target.value)}
              type="password"
              id="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              value={RegisterFormValue.confirmPassword}
              onChange={(event) => RegisterFormOnChange("confirmPassword", event.target.value)}
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {/* Submit Button */}
          <SubmitButton
            text="Register"
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          />
        </form>
        {/* Additional Links */}
        <div className="text-sm text-center text-gray-500">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
