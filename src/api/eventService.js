// src/api/eventService.js
import API from './axios';

export const getAllEvents = async () => {
  const response = await API.get('/events');
  return response.data.result; // ✅ Only return the array!
};

export const getEventById = async (id) => {
  const response = await API.get(`/events/${id}`);
  return response.data.result; // ✅ Same here if you expect a single object
};

export const createEvent = async (eventData) => {
  const response = await API.post('/events', eventData);
  return response.data;
};

export const updateEvent = async (id, eventData) => {
  const response = await API.put(`/events/${id}`, eventData);
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await API.delete(`/events/${id}`);
  return response.data;
};
