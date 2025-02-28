import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const getAccessToken = () => Cookies.get("access_token");
  console.log(getAccessToken())

  return getAccessToken() ? children : Navigate({to: '/login'});
};

export default ProtectedRoute;
