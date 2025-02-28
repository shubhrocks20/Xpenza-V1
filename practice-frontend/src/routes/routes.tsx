import App from "@/App";
import ProtectedRoute from "@/components/AuthWrapper";
import Dashboard from "@/components/Dashboard";
import PrivateRoute from "@/components/PrivateRoute";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute>
            <Dashboard />
            </ProtectedRoute>
    },
    {
        path: '/login',
        element: <PrivateRoute>
        <App />
        </PrivateRoute>
    },
    
])