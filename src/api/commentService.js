import API from './axios';

export const getAllComments = () => API.get('/comments');
export const getCommentsByEvent = (eventId) => API.get(`/comments/event/${eventId}`);
export const getCommentsByProduct = (productId) => API.get(`/comments/product/${productId}`);
export const createComment = (eventId, commentData) => API.post(`/comments/event/${eventId}`, commentData);
export const updateComment = (id, commentData) => API.put(`/comments/${id}`, commentData);
export const deleteComment = (id) => API.delete(`/comments/${id}`);
