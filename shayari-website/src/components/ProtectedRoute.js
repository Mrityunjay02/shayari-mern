import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, isAdmin, redirectPath = "/login" }) => {
  const location = useLocation();

  if (!isAdmin) {
    // Redirect to login page with the current location (so user can be redirected back)
    return <Navigate to={redirectPath} state={{ from: location }} />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  redirectPath: PropTypes.string,
};

export default ProtectedRoute;
