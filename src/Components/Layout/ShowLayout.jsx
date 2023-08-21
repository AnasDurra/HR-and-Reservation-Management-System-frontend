import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import getUser from "../../redux/utils/cookiesUtils";

export default function ShowLayout(props) {
    const location = useLocation();

    const user = getUser();
    const permissionsReducer = useSelector(state => state.userReducer.permissions);
    const stringified = Cookies.get('perms');
    const permissions = stringified ? JSON.parse(stringified) : permissionsReducer;

    return (
        (location.pathname !== '/login' && location.pathname !== '/unauthorized' && (permissions.length !== 0 && Number(user?.user_type) === 1)) || Number(user?.user_type) === 2  ? props.children : props.child     
    );
}