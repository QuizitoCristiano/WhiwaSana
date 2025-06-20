import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../UserAuthContext/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/Login" />;
};

export default ProtectedRoute;
