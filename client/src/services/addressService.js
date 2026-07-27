import api from './api';

export const getAddresses = () => api.get('/api/addresses').then(r => r.data);
export const addAddress = (data) => api.post('/api/addresses', data).then(r => r.data);
export const updateAddress = (id, data) => api.put('/api/addresses/' + id, data).then(r => r.data);
export const deleteAddress = (id) => api.delete('/api/addresses/' + id);
