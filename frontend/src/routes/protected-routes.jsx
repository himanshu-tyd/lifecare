import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/auth-context";


const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { token,role } = useContext(authContext);

  const isAllowed = allowedRoles.includes(role); //this determines if user is allowed to access base on their roles
  const accessiableRoute =
    token && isAllowed ? children : <Navigate to="/home" replace={true} />;
  return accessiableRoute;
};
export default ProtectedRoutes;
