import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/auth-context";


// The ProtectedRoutes component takes in children and allowedRoles as props
const ProtectedRoutes = ({ children, allowedRoles }) => {
  // Retrieve the token and role from the authContext using the useContext hook
  const { token, role } = useContext(authContext);

  // If there is no token or role, redirect to the "/home" page
  if (!token || !role) {
    return <Navigate to="/home" replace={true} />;
  }

  // Check if the user's role is allowed based on the allowedRoles array
  const isAllowed = allowedRoles.includes(role);
  // If the user's role is not allowed, redirect to the "/home" page
  if (!isAllowed) {
    return <Navigate to="/home" replace={true} />;
  }

  // If the user's role is allowed, render the children components
  return children;
};
export default ProtectedRoutes;
