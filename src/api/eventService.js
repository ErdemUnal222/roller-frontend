// /src/api/events.js
// Handles all API calls related to event management (CRUD operations)

import API from './axios';

/**
 * Fetch all events from the backend.
 * Used for listing events (public or admin view).
 */
export const getAllEvents = async () => {
  try {
    const response = await API.get('/events');
    return response.data.result;
  } catch (err) {
    console.error('getAllEvents error:', err);
    throw (
      err.response?.data?.message || "Failed to fetch events."
    );
  }
};

/**
 * Fetch a single event by its ID.
 * Used for event detail view.
 * @param {string|number} id - The ID of the event to fetch
 */
export const getEventById = async (id) => {
  try {
    const response = await API.get(`/events/${id}`);
    return response.data.result;
  } catch (err) {
    console.error('getEventById error:', err);
    throw (
      err.response?.data?.message || "Failed to fetch event."
    );
  }
};

/**
 * Create a new event.
 * Typically used by admins from the admin dashboard.
 * @param {Object} eventData - The form data for the new event
 */
export const createEvent = async (eventData) => {
  try {
    const response = await API.post('/events', eventData);
    return response.data;
  } catch (err) {
    console.error('createEvent error:', err);
    throw (
      err.response?.data?.message || "Failed to create event."
    );
  }
};

/**
 * Update an existing event.
 * Only accessible by authenticated users with proper permissions.
 * @param {string|number} id - The ID of the event to update
 * @param {Object} eventData - Updated fields for the event
 */
export const updateEvent = async (id, eventData) => {
  try {
    const response = await API.put(`/events/${id}`, eventData);
    return response.data;
  } catch (err) {
    console.error('updateEvent error:', err);
    throw (
      err.response?.data?.message || "Failed to update event."
    );
  }
};

/**
 * Delete an event by ID.
 * This operation is typically restricted to admin users.
 * @param {string|number} id - The ID of the event to delete
 */
export const deleteEvent = async (id) => {
  try {
    const response = await API.delete(`/events/${id}`);
    return response.data;
  } catch (err) {
    console.error('deleteEvent error:', err);
    throw (
      err.response?.data?.message || "Failed to delete event."
    );
  }
};
