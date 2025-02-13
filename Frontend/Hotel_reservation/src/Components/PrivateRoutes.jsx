import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ allowedRoles }) => {
  const token = sessionStorage.getItem("logintoken");
  const role = sessionStorage.getItem("role");

  if (!token || !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;


