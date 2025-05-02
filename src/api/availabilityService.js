import API from './axios';

export const getAllAvailabilities = async () => {
  const res = await API.get('/availabilities');
  return res.data;
};

export const getAvailabilityByUser = async (userId) => {
  const res = await API.get(`/availabilities/user/${userId}`);
  return res.data;
};

export const createAvailability = async (data) => {
  const res = await API.post('/availabilities', data);
  return res.data;
};

export const updateAvailability = async (id, data) => {
  const res = await API.put(`/availabilities/${id}`, data);
  return res.data;
};

export const deleteAvailability = async (id) => {
  const res = await API.delete(`/availabilities/${id}`);
  return res.data;
};
