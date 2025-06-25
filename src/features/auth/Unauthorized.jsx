// /src/pages/Unauthorized.jsx

import "/src/styles/main.scss";

/**
 * Unauthorized Page Component
 * Displays a 403 error message when a user tries to access a protected
 * route without the necessary permissions (e.g., admin-only area).
 */
function Unauthorized() {
  return (
    <div className="unauthorized-page" role="alert" aria-live="assertive">
      <h1 className="unauthorized-title">403 - Unauthorized</h1>
      <p className="unauthorized-text">
        You do not have permission to access this page.
      </p>
    </div>
  );
}

export default Unauthorized;
