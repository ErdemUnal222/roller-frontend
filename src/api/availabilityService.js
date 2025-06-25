// /src/api/availabilities.js
// Availability API service using a pre-configured Axios instance

import API from './axios';

/**
 * Fetch all availabilities (admin access required).
 * @returns {Promise<Object>} List of all availabilities.
 */
export const getAllAvailabilities = async () => {
  try {
    const res = await API.get('/availabilities');
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Failed to fetch availabilities.";
  }
};

/**
 * Fetch availabilities for a specific user.
 * @param {string} userId - ID of the user.
 * @returns {Promise<Object>} Availabilities related to the user.
 */
export const getAvailabilityByUser = async (userId) => {
  try {
    const res = await API.get(`/availabilities/user/${userId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Failed to fetch user's availabilities.";
  }
};

/**
 * Create a new availability entry.
 * @param {Object} data - Availability data (date, time, etc.).
 * @returns {Promise<Object>} Created availability response.
 */
export const createAvailability = async (data) => {
  try {
    const res = await API.post('/availabilities', data);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Failed to create availability.";
  }
};

/**
 * Update an existing availability entry.
 * @param {string} id - ID of the availability entry.
 * @param {Object} data - Updated availability information.
 * @returns {Promise<Object>} Updated availability response.
 */
export const updateAvailability = async (id, data) => {
  try {
    const res = await API.put(`/availabilities/${id}`, data);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Failed to update availability.";
  }
};

/**
 * Delete an availability entry.
 * @param {string} id - ID of the availability entry to delete.
 * @returns {Promise<Object>} Deletion confirmation.
 */
export const deleteAvailability = async (id) => {
  try {
    const res = await API.delete(`/availabilities/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Failed to delete availability.";
  }
};
