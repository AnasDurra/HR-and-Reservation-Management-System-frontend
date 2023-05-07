import { Navigate, Outlet, useLocation } from "react-router-dom";
import getUser from "../../redux/utils/cookiesUtils";

const AccessRoute = ({ allowedRoutes }) => {

    const user = getUser();
    const location = useLocation();

    return(
        user?.roles?.find(role => allowedRoutes?.includes(role))
            ? <Outlet />
            : user 
                ? <Navigate to="/unauthorized" state={{ from: location }} replace/>
                : <Navigate to="/login" state={{ from: location }} replace />  
    );
};

export default AccessRoute;