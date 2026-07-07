import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const CustomerRoute = ({ children }) => {

    const { user } = useAuth();

    if (!user)
        return <Navigate to="/login" replace />;

    if (user.role !== "customer")
        return <Navigate to="/admin/dashboard" replace />;

    return children;

};

export default CustomerRoute;