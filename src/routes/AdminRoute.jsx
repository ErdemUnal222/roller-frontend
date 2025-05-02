import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoute() {
  const token = useSelector((state) => state.user.token);
  const role = useSelector((state) => state.user.role);

  if (!token) return <Navigate to="/login" />;
  if (role !== 'admin') return <Navigate to="/unauthorized" />;

  return <Outlet />;
}

export default AdminRoute;
