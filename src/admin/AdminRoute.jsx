
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../UserAuthContext/AuthContext";

const AdminRoute = ({ children }) => {
  const { isLoggedIn, isAdmin } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/Login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;


