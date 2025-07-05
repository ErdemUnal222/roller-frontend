// /src/routes/AdminRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoute() {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    console.warn("🔒 No user found — redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (user.role?.toLowerCase() !== 'admin') {
    console.warn("⛔ Access denied — not admin:", user.role);
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
