// /src/components/RequireAdmin.jsx

import { Navigate, useLocation } from "react-router-dom";

/**
 * RequireAdmin component
 * A wrapper to protect admin-only routes.
 * Redirects non-authenticated users to login and non-admins to an unauthorized page.
 */
function RequireAdmin({ children }) {
  const location = useLocation();

  /**
   * Securely parse user object from localStorage.
   * Returns null if parsing fails.
   */
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  const isAdmin = user?.role === "admin";

  // Case 1: User is not logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Case 2: User is logged in but not an admin
  if (!isAdmin) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  // Case 3: User is an authenticated admin — allow access
  return children;
}

export default RequireAdmin;
