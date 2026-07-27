import api from './api';

export const createOrder = (data) => api.post('/api/orders', data).then(r => r.data);
export const getMyOrders = () => api.get('/api/orders/my').then(r => r.data);
export const getOrder = (id) => api.get('/api/orders/' + id).then(r => r.data);
export const getAllOrders = (page = 0, size = 20) => api.get('/api/orders', { params: { page, size } }).then(r => r.data);
export const updateOrderStatus = (id, status) => api.put('/api/orders/' + id + '/status', { status }).then(r => r.data);
