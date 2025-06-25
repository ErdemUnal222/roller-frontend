import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAllUsers } from "../../api/admin";
import { Navigate } from "react-router-dom";

function UsersAdmin() {
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchAllUsers(token);
        setUsers(data);
      } catch (err) {
        console.error("❌ Failed to load users:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [token]);

  if (!user || user.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="admin-users">
      <h2 className="admin-title">👥 Manage Users</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>City</th><th>Role</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.firstName} {u.lastName}</td>
                <td>{u.email}</td>
                <td>{u.city}</td>
                <td>{u.role}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UsersAdmin;
