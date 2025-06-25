import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function PrivateRoute() {
  const token = useSelector((state) => state.user.token);
  const location = useLocation();

  if (!token) {
    console.warn('🔒 Access denied: no token found, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
