import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RootRoute = () => {
  const permissions = useSelector((state) => state.userReducer.permissions);

  if (permissions && permissions.length > 0) {
    return <div>Main</div>;
  }

  return <Navigate to="/login" />;
};

export default RootRoute;
