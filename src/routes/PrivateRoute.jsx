import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
  const token = useSelector((state) => state.user.token);

  if (!token) return <Navigate to="/login" />;

  return <Outlet />;
}

export default PrivateRoute;
