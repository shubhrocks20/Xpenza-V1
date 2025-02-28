import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const getAccessToken = () => Cookies.get("access_token");
  const token = getAccessToken()
  console.log(token)

  return getAccessToken() ? Navigate({to: '/'}) : children  
};

export default PrivateRoute;
