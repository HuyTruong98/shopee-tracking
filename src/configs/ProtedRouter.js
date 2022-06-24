import { Navigate } from 'react-router-dom';
import r from '../routes/routes';
import { ACCESSTOKEN } from './';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem(ACCESSTOKEN) ?? null;

  if (token === null) {
    return <Navigate to={r.LOGIN_PAGE} replace />;
  }

  return children;
};

export default ProtectedRoute;
