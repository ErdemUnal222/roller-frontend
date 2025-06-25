// Base URL for backend API calls.
// This can be switched to a relative path if a proxy is configured.
const base = "http://localhost:9500/api/v1";

// ========================== USERS ==========================

// Fetch all users (admin only)
export const fetchAllUsers = async (token) => {
  const res = await fetch(`${base}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Server responded with status ${res.status}`);
  }

  const json = await res.json();
  return json.result || [];
};

// Delete a user by ID (admin only)
export const deleteUserById = async (id, token) => {
  const res = await fetch(`${base}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorMsg = await res.text();
    throw new Error(`Delete failed: ${errorMsg}`);
  }

  return true;
};

// Update a user's details (admin only)
export const updateUser = async (id, body, token) => {
  const res = await fetch(`${base}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Failed to update user");

  const data = await res.json();
  return data.newUser;
};

// ========================== PRODUCTS ==========================

// Fetch all products (requires authentication)
export const fetchAllProducts = async (token) => {
  const res = await fetch(`${base}/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch products");

  const data = await res.json();
  return data.result || [];
};

// Delete a product by ID (admin only)
export const deleteProduct = async (id, token) => {
  const res = await fetch(`${base}/products/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to delete product");
};

// Update a product's information (admin only)
export const updateProduct = async (id, body, token) => {
  const res = await fetch(`${base}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Failed to update product");

  const data = await res.json();
  return data.updatedProduct;
};

// ========================== EVENTS ==========================

// Fetch all events (requires authentication)
export const fetchAllEvents = async (token) => {
  const res = await fetch(`${base}/events`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch events");

  const data = await res.json();
  return data.result || [];
};

// Delete an event by ID (admin only)
export const deleteEvent = async (id, token) => {
  const res = await fetch(`${base}/events/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to delete event");
};

// ========================== ORDERS ==========================

// Fetch all orders (admin only)
export const fetchAllOrders = async (token) => {
  const res = await fetch(`${base}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch orders");

  const data = await res.json();
  return data.result || [];
};

// Update the status of an order (admin only)
export const updateOrderStatus = async (id, status, token) => {
  const res = await fetch(`${base}/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) throw new Error("Failed to update order status");

  const data = await res.json();
  return data.updatedOrder;
};
