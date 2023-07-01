import { Navigate, Outlet, useLocation } from "react-router-dom";
import getUser from "../../redux/utils/cookiesUtils";
import { useSelector } from "react-redux";

const AccessRoute = ({ allowedRoutes }) => {

    const user = getUser();
    const permissions = useSelector(state => state.userReducer.permissions);
    const location = useLocation();

    if (location.pathname === '/login') {
        return user ? <Navigate to="/" replace /> : <Outlet />;
    }
    if (!allowedRoutes) {
        return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
    }

    const hasAllowedRole = permissions.some(role => allowedRoutes.includes(role));

    return (
        hasAllowedRole
            ? <Outlet />
            : user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default AccessRoute;