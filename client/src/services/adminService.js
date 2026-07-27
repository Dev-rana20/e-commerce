import api from './api';

export const getDashboard = () => api.get('/api/admin/dashboard').then(r => r.data);
export const getUsers = () => api.get('/api/admin/users').then(r => r.data);
export const getAllCoupons = () => api.get('/api/coupons').then(r => r.data);
export const createCoupon = (data) => api.post('/api/coupons', data).then(r => r.data);
export const deleteCoupon = (id) => api.delete('/api/coupons/' + id);
export const uploadImage = (formData) => api.post('/api/images/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
