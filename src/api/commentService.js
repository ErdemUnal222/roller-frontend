// /src/api/comments.js
// This module provides all API functions related to comments (event/product)

import API from './axios';

/**
 * Fetch all comments (admin only)
 */
export const getAllComments = async () => {
  try {
    const res = await API.get('/comments');
    return res.data;
  } catch (err) {
    throw err.message || "Failed to fetch comments.";
  }
};

/**
 * Fetch comments associated with a specific event
 * @param {string|number} eventId - ID of the event
 */
export const getCommentsByEvent = async (eventId) => {
  try {
    const res = await API.get(`/comments/event/${eventId}`);
    return res.data;
  } catch (err) {
    throw err.message || "Failed to fetch event comments.";
  }
};

/**
 * Fetch comments associated with a specific product
 * @param {string|number} productId - ID of the product
 */
export const getCommentsByProduct = async (productId) => {
  try {
    const res = await API.get(`/comments/product/${productId}`);
    return res.data;
  } catch (err) {
    throw err.message || "Failed to fetch product comments.";
  }
};

/**
 * Create a new comment on an event
 * @param {string|number} eventId - ID of the event
 * @param {string} content - Text content of the comment
 */
export const createComment = async (eventId, content) => {
  try {
    const res = await API.post(`/comments/event/${eventId}`, { text: content });
    return res.data;
  } catch (err) {
    throw err.message || "Failed to create comment.";
  }
};

/**
 * Update an existing comment
 * @param {string|number} id - ID of the comment
 * @param {Object} commentData - New content to update
 */
export const updateComment = async (id, commentData) => {
  try {
    const res = await API.put(`/comments/${id}`, commentData);
    return res.data;
  } catch (err) {
    throw err.message || "Failed to update comment.";
  }
};

/**
 * Delete a comment by ID
 * @param {string|number} id - ID of the comment to delete
 */
export const deleteComment = async (id) => {
  try {
    const res = await API.delete(`/comments/${id}`);
    return res.data;
  } catch (err) {
    throw err.message || "Failed to delete comment.";
  }
};
