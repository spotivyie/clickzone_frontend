import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
    const token = localStorage.getItem("token");
    const user = token ? JSON.parse(atob(token.split('.')[1])) : null;

    // user deve ter isAdmin === true para acessar
    if (!token || !user?.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
}
