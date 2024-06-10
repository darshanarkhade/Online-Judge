// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated , isAdmin, isAdminReq}) => {
  if(!isAuthenticated){
    return <Navigate to="/login" />;
  }
  if(isAdminReq && isAdmin){
    return <Outlet />;
  }
  if(!isAdminReq && !isAdmin){
    return <Outlet />;
  }
  if(isAdminReq && !isAdmin){
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
