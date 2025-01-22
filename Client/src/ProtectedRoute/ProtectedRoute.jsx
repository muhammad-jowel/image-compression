import React from 'react';
import { Navigate } from 'react-router-dom';
import UserStore from '../store/UserStore';

const ProtectedRoute = ({children}) => {

    const { isLogin } = UserStore();
    
     
    if (!isLogin()) {
        return <Navigate to='/login'/>;
    } 
    return children;
    
};

export default ProtectedRoute;