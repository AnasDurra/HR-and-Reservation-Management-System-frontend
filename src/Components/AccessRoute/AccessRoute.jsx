import { Navigate, Outlet, useLocation } from "react-router-dom";
import getUser from "../../redux/utils/cookiesUtils";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import Spinner from "../Spinner/Spinner";

const AccessRoute = ({ allowedRoutes, userType }) => {

    const user = getUser();
    const permissionsReducer = useSelector(state => state.userReducer.permissions);
    const stringified = Cookies.get('perms');
    const permissions = stringified ? JSON.parse(stringified) : permissionsReducer;

    const location = useLocation();

    console.log(userType);
    if (Number(user?.user_type) !== Number(userType)) {
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    }
    if (location.pathname === '/login') {
        return user ? <Navigate to="/" replace /> : <Outlet />;
    }
    if (!allowedRoutes) {
        return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (permissions.length === 0 && user?.user_type === 1) {
        return <Spinner loading={true} />
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