// /src/api/orders.js
// This module manages all API interactions related to order management.

import API from './axios';

/**
 * Fetch all orders from the backend.
 * Typically used in the admin dashboard to display all customer orders.
 */
export const getAllOrders = async () => {
  try {
    const res = await API.get('/orders');
    return res.data;
  } catch (err) {
    throw err.formattedMessage || "Failed to fetch orders.";
  }
};

/**
 * Fetch a specific order by its ID.
 * Useful for order detail views (e.g., in a confirmation page or admin view).
 * @param {string|number} id - The ID of the order to retrieve.
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
 * Create a new order.
 * Called after the user submits their cart at checkout.
 * @param {Object} orderData - Includes userId, items, total, etc.
 */
export const createOrder = async (orderData) => {
  try {
    const res = await API.post('/orders', orderData);
    return res.data;
  } catch (err) {
    throw err.formattedMessage || "Failed to create order.";
  }
};

/**
 * Update the status of an order (e.g., from "Processing" to "Shipped").
 * This function is primarily used by admin users.
 * @param {string|number} id - Order ID
 * @param {Object} statusData - For example: { status: "Shipped" }
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
 * Submit payment information for an order.
 * Typically used after order creation to confirm payment via Stripe or another provider.
 * @param {Object} paymentData - Includes orderId and Stripe token/details
 */
export const createPayment = async (paymentData) => {
  try {
    const res = await API.post('/orders/payment', paymentData);
    return res.data;
  } catch (err) {
    throw err.formattedMessage || "Failed to create payment.";
  }
};
