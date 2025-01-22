import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/forget-password" element={<ForgetPasswordPage/>}/>
        {/* <Route path="/otp-verify" element={<OtpVerifyPage/>}/>
        <Route path="/new-password" element={<NewPasswordPage/>}/> */}

        <Route path="/" element={<HomePage/>}/>
        <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
