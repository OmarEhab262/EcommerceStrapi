import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import CookieService from "../services/CookieService";

const PrivateRoute = ({ children, redirectPath }) => {
  const isLogged = CookieService.get("jwt"); // Get JWT token
  console.log("token: ", !!isLogged);

  // Redirect if not logged in
  if (!isLogged) {
    return <Navigate to={redirectPath} replace />;
  }

  // If logged in, render children (protected component)
  return children;
};

// Define PropTypes for the component
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // children should be a React node (e.g., JSX elements)
  redirectPath: PropTypes.string.isRequired, // redirectTo should be a string
};

export default PrivateRoute;
