// /src/api/products.js
// This module handles all API interactions related to product management.

import API from './axios';

/**
 * Fetch the complete list of products.
 * Typically used to display a product catalog in the admin panel or shop.
 */
export const getAllProducts = async () => {
  try {
    const res = await API.get('/products');
    return res.data;
  } catch (err) {
    throw err.formattedMessage || "Failed to fetch products.";
  }
};

/**
 * Fetch a single product by its ID.
 * Useful for displaying product details before editing or purchasing.
 * @param {string|number} id - The ID of the product
 */
export const getProductById = async (id) => {
  try {
    const res = await API.get(`/products/${id}`);
    console.log(res.data); // Can be removed in production
    return res.data;
  } catch (err) {
    throw err.formattedMessage || "Failed to fetch product.";
  }
};

/**
 * Create a new product.
 * Only accessible to admins. The route `/products/add` is secured with authentication middleware.
 * @param {Object} data - Product form data (title, description, price, etc.)
 */
export const createProduct = async (data) => {
  try {
    const res = await API.post('/products/add', data);
    return res.data;
  } catch (err) {
    throw err.formattedMessage || "Failed to create product.";
  }
};

/**
 * Update an existing product by its ID.
 * Used by admins to edit product information through the `/products/edit/:id` route.
 * @param {string|number} id - Product ID
 * @param {Object} data - New values to update (title, price, stock, etc.)
 */
export const updateProduct = async (id, data) => {
  try {
    const res = await API.put(`/products/edit/${id}`, data);
    return res.data;
  } catch (err) {
    throw err.formattedMessage || "Failed to update product.";
  }
};

/**
 * Delete a product by its ID.
 * Only available to authenticated admin users.
 * @param {string|number} id - The ID of the product to delete
 */
export const deleteProduct = async (id) => {
  try {
    const res = await API.delete(`/products/${id}`);
    return res.data;
  } catch (err) {
    throw err.formattedMessage || "Failed to delete product.";
  }
};
