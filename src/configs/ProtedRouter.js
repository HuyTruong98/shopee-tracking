import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('ACCESSTOKEN') ?? null;

  if (token === null) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
