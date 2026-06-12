import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const isAuthenticated = localStorage.getItem('dashboard_token') === import.meta.env.VITE_DASHBOARD_TOKEN

    return isAuthenticated
        ? <Outlet />
        : <Navigate to="/" />;
}