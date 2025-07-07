// Base URL for backend API calls.
// This can be switched to a relative path if a proxy is configured.
const base = "http://localhost:9500/api/v1";

// ========================== USERS ==========================

// Fetch the list of all users from the backend.
// This route is restricted to admin users only, so we need to include an authorization token.
export const fetchAllUsers = async (token) => {
  const res = await fetch(`${base}/users`, {
    headers: {
      Authorization: `Bearer ${token}`, // Send the token in the request header
    },
  });

  if (!res.ok) {
    // If the response is not successful (e.g., 401 or 500), throw an error
    throw new Error(`Server responded with status ${res.status}`);
  }

  const json = await res.json(); // Convert response to JSON
  return json.result || [];       // Return the list of users or an empty array if none
};


// Delete a user by their ID.
// Admins can use this function to remove a user from the platform.
export const deleteUserById = async (id, token) => {
  const res = await fetch(`${base}/users/${id}`, {
    method: "DELETE", // Use HTTP DELETE method
    headers: {
      Authorization: `Bearer ${token}`, // Send the admin token
    },
  });

  if (!res.ok) {
    // If deletion fails, show the error message returned by the server
    const errorMsg = await res.text();
    throw new Error(`Delete failed: ${errorMsg}`);
  }

  return true; // Return true to confirm successful deletion
};

// Update user details such as name, email, etc.
// This is useful for admins who want to edit user information.
export const updateUser = async (id, body, token) => {
  const res = await fetch(`${base}/users/${id}`, {
    method: "PUT", // HTTP PUT method for updating data
    headers: {
      "Content-Type": "application/json", // We are sending JSON data
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body), // Convert the JavaScript object to a JSON string
  });

  if (!res.ok) throw new Error("Failed to update user");

  const data = await res.json(); // Parse the server response
  return data.newUser;           // Return the updated user object
};

// ========================== PRODUCTS ==========================

// Get all products from the database.
// This requires authentication (admin access).
export const fetchAllProducts = async (token) => {
  const res = await fetch(`${base}/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch products");

  const data = await res.json();
  return data.result || []; // Return the list of products or an empty array
};

// Delete a product by its ID (admin-only function).
export const deleteProduct = async (id, token) => {
  const res = await fetch(`${base}/products/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to delete product");
};

// Update a product's details.
// Useful for changing the price, title, stock, or description.
export const updateProduct = async (id, body, token) => {
  const res = await fetch(`${base}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // Inform backend we're sending JSON
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Failed to update product");

  const data = await res.json();
  return data.updatedProduct; // Return the updated product
};

// ========================== EVENTS ==========================

// Get a list of all events.
// This function retrieves events created on the platform.
// Requires authentication.
export const fetchAllEvents = async (token) => {
  const res = await fetch(`${base}/events`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch events");

  const data = await res.json();
  return data.result || []; // Return the list of events
};

// Delete an event using its ID (admin-only function).
// Useful for removing outdated or canceled events.
export const deleteEvent = async (id, token) => {
  const res = await fetch(`${base}/events/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to delete event");
};


// ========================== ORDERS ==========================

// Retrieve all orders made on the platform.
// Only admin users can access this route.
export const fetchAllOrders = async (token) => {
  const res = await fetch(`${base}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch orders");

  const data = await res.json();
  return data.result || []; // Return the list of orders
};


// Update the status of an order (e.g., "paid", "shipped", "canceled").
// Only admins can perform this action.
export const updateOrderStatus = async (id, status, token) => {
  const res = await fetch(`${base}/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }), // Send the new status to backend
  });

  if (!res.ok) throw new Error("Failed to update order status");

  const data = await res.json();
  return data.updatedOrder; // Return the updated order
};
