import { useLocation } from "react-router-dom";

export default function ShowLayout(props) {
    const location = useLocation();

    return (
        (location.pathname !== '/login' && location.pathname !== '/unauthorized') ? props.children : props.child     
    );
}