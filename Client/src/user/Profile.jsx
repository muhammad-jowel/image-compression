import React, { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserStore from "../store/UserStore";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Profile = () => {

  const { ProfileDetailsRequest, ProfileDetails, LogoutRequest, DeleteUserRequest } = UserStore();

  useEffect(() => {
    (async () => {
      await ProfileDetailsRequest();
    })()
  }, []);


  const onLogout = async () => {
    let res = await LogoutRequest();
    if (res) {
      toast.success("Logged Out Successfully!");
      setTimeout(() => { 
        Cookies.remove("token");
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = "/login";
       }, 1000);
    }
  };


  const deleteHandle = async () => {
    let res = await DeleteUserRequest();
    if (res) {
      toast.success("Account Delete Successfully!");
      setTimeout(() => { 
        Cookies.remove("token");
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = "/register";
       }, 1000);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-10 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 border-2 border-blue-300  animate-fade-in">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl sm:text-3xl text-gray-800 mb-4 sm:mb-0 font-bold">Profile Details</h2>
          <Link to='/' className="text-blue-500 hover:text-blue-700 text-3xl mt-4 sm:mt-0">
            <FaHome />
          </Link>
        </div>

        {/* Profile Information */}
        <div className="mb-8">
          <div className="space-y-4 justify-center">
            <div className="flex justify-center space-x-2">
              <p className="text-gray-600 text-sm sm:text-base">Full Name:</p>
              <p className="font-medium text-sm sm:text-base">{ProfileDetails?.fullName || 'Please Wait..'}</p>
            </div>
            <div className="flex justify-center space-x-2">
              <p className="text-gray-600 text-sm sm:text-base">Email:</p>
              <p className="font-medium text-sm sm:text-base">{ProfileDetails?.email || 'Please Wait..'}</p>
            </div>
            {/* Add more dynamic user info here */}
          </div>
        </div>

        {/* Buttons for Logout and Delete */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base w-auto"
            onClick={onLogout}
          >
            Logout
          </button>
          <button
            className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base w-auto"
            onClick={deleteHandle}
          >
            Delete Account
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-sm text-gray-500 text-center">
          <a
            href="https://www.facebook.com/softdevjowel"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            Developed by Muhammad Jowel
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
