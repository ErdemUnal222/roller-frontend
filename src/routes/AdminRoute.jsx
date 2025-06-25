import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoute() {
  const user = useSelector((state) => state.user.user);

  console.log("🔍 USER FROM REDUX:", user);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role?.toLowerCase() !== 'admin') {
    console.warn("⛔ Not admin:", user.role);
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
