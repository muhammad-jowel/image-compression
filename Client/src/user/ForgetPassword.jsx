import React from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md border-2 border-blue-300 animate-fade-in">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Forgot Password
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Please create another account using another email. Thanks!
        </p>
        <div className="flex justify-center">
          <Link to='/register'
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
