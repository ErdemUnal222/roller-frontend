import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "/src/styles/main.scss";

/**
 * Admin Dashboard page
 * Displays a list of all users and allows editing or deleting them.
 * Access is restricted to admin users only.
 */
function Dashboard() {
  const user = useSelector((state) => state.user.user); // Get current user from Redux store
  const token = useSelector((state) => state.user.token); // Add this line
  const [users, setUsers] = useState([]); // List of users
  const [loading, setLoading] = useState(true); // Loading state
  const [editingUserId, setEditingUserId] = useState(null); // Currently editing user ID
  const [editFormData, setEditFormData] = useState({}); // Form state for user edit

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://ihsanerdemunal.ide.3wa.io:9500/api/v1/users", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error("Server did not return JSON. Response was: " + text);
        }

        const data = await res.json();
        if (data.result) setUsers(data.result); // Store retrieved users
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Enable form editing mode
  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditFormData({ ...user });
  };

  // Update form values when edited
  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  // Submit form to update user in backend
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://ihsanerdemunal.ide.3wa.io:9500/api/v1/users/${editingUserId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editFormData),
      });

      const data = await res.json();

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === editingUserId ? data.newUser : u))
        );
        setEditingUserId(null);
        setEditFormData({});
      } else {
        console.error("Failed to update user:", data.message);
      }
    } catch (err) {
      console.error("Edit request failed:", err);
    }
  };

  // Handle user deletion
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://ihsanerdemunal.ide.3wa.io:9500/api/v1/admin/user/${userId}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      const data = await res.json();

      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== userId));
      } else {
        console.error("Failed to delete user:", data.message);
      }
    } catch (err) {
      console.error("Delete request failed:", err);
    }
  };

  // If not an admin, redirect to unauthorized page
  if (!user || user.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <section className="dashboard-container" role="main" aria-labelledby="dashboard-title">
      <header className="dashboard-header">
        <h1 id="dashboard-title" className="dashboard-title">Admin Dashboard</h1>
        <p className="dashboard-welcome">Welcome, Admin</p>
      </header>

      {/* User table section */}
      <section className="dashboard-table" aria-labelledby="users-table-heading">
        <h2 id="users-table-heading" className="table-heading">User List</h2>
        {loading ? (
          <p className="loading-msg">Loading users...</p>
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
                    <button onClick={() => handleEdit(u)} className="btn-edit">Edit</button>
                    <button onClick={() => handleDelete(u.id)} className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Edit form section (appears only when editing) */}
      {editingUserId && (
        <section className="edit-form">
          <h3>Edit User</h3>
          <form onSubmit={handleEditSubmit}>
            <input
              name="firstName"
              value={editFormData.firstName || ''}
              onChange={handleEditChange}
              placeholder="First Name"
              required
            />
            <input
              name="lastName"
              value={editFormData.lastName || ''}
              onChange={handleEditChange}
              placeholder="Last Name"
              required
            />
            <input
              name="email"
              value={editFormData.email || ''}
              onChange={handleEditChange}
              placeholder="Email"
              required
            />
            <input
              name="city"
              value={editFormData.city || ''}
              onChange={handleEditChange}
              placeholder="City"
            />
            <input
              name="role"
              value={editFormData.role || ''}
              onChange={handleEditChange}
              placeholder="Role"
            />
            <button type="submit" className="btn-save">Save</button>
            <button type="button" onClick={() => setEditingUserId(null)}>Cancel</button>
          </form>
        </section>
      )}
    </section>
  );
}

export default Dashboard;
