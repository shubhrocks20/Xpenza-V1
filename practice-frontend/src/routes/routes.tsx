import App from "@/pages/App";
import Home from "@/pages/Home";
import ProtectedRoute from "@/components/AuthWrapper";
import PrivateRoute from "@/components/PrivateRoute";
import { createBrowserRouter } from "react-router-dom";
import XpenzaUpload from "@/components/Hero";
import Dashboard from "@/pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
  },
{
  path: '/dashboard',
  element: (
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  )
}
  
]);
