import App from "@/pages/App";
import Dashboard from "@/pages/Dashboard";
import ProtectedRoute from "@/components/AuthWrapper";
import PrivateRoute from "@/components/PrivateRoute";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
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
]);
