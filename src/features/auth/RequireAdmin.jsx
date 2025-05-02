import { Navigate, useLocation } from "react-router-dom";

function RequireAdmin({ children }) {
  const location = useLocation();

  // Example: Replace with your actual logic
  const user = JSON.parse(localStorage.getItem("user")); // or useContext(AuthContext)
  const isAdmin = user?.role === "admin"; // Adjust based on your user model

  if (!user) {
    // Not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    // Logged in but not admin
    return <Navigate to="/unauthorized" replace />;
  }

  // Authorized
  return children;
}

export default RequireAdmin;
