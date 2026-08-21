import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const CustomerRoute = ({ children }) => {

    const { user, loading } = useAuth();

    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                state={{ from: location.pathname + location.search }}
                replace
            />
        );
    }

    if (user.role === "OWNER") {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return children;

};

export default CustomerRoute;