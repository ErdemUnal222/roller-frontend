import API from './axios';

export const getAllOrders = () => API.get('/orders');
export const getOrderById = (id) => API.get(`/orders/${id}`);
export const createOrder = (orderData) => API.post('/orders', orderData);
export const updateOrderStatus = (id, statusData) => API.put(`/orders/${id}/status`, statusData);
export const createPayment = (paymentData) => API.post('/orders/payment', paymentData);
