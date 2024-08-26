import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin }) => {
  if (!isAdmin) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
