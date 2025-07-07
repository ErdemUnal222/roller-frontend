// /src/api/orders.js
// This module handles all the API requests related to managing orders on the platform.
// These functions are used for placing orders, fetching them, and updating their status.

import API from './axios'; // Import the pre-configured Axios instance (handles base URL and token injection)

/**
 * Get a list of all orders from the backend.
 * This function is typically used by administrators on the admin dashboard to review every order.
 *
 */
export const getAllOrders = async () => {
  try {
    const res = await API.get('/orders');
    return res.data; // Return data received from the backend
  } catch (err) {
    throw err.formattedMessage || "Failed to fetch orders."; // Handle and return readable error
  }
};

/**
 * Fetch the details of a specific order using its ID.
 * This is useful for showing a confirmation page or an admin detail view of a single order.
 *
 */
export const getOrderById = async (id) => {
  try {
    const res = await API.get(`/orders/${id}`);
    return res.data;
  } catch (err) {
    throw err.formattedMessage || "Failed to fetch order.";
  }
};

/**
 * Submit a new order to the backend.
 * This is triggered after a customer completes checkout.
 * It usually includes cart items, total price, and user information.
 */
export const createOrder = async (orderData) => {
  try {
    const res = await API.post('/orders', orderData); // Send POST request to backend
    return res.data;
  } catch (err) {
    throw err.formattedMessage || "Failed to create order.";
  }
};

/**
 * Update the status of an existing order.
 * This is used mainly by administrators—for example, to change status from "Pending" to "Shipped".
 *
 */
export const updateOrderStatus = async (id, statusData) => {
  try {
    const res = await API.put(`/orders/${id}/status`, statusData);
    return res.data;
  } catch (err) {
    throw err.formattedMessage || "Failed to update order status.";
  }
};

/**
 * Submit payment for an order.
 * This is used right after the order is created to send payment data (e.g. Stripe token) to the backend.
 * The backend processes it with the payment provider (Stripe in this case).
 *
 */
export const createPayment = async (paymentData) => {
  try {
    const res = await API.post('/orders/payment', paymentData);
    return res.data;
  } catch (err) {
    throw err.formattedMessage || "Failed to create payment.";
  }
};
