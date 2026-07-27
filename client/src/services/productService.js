import api from './api';

export const getProducts = (page = 0, size = 12) => api.get('/api/products', { params: { page, size } }).then(r => r.data);
export const getProduct = (id) => api.get('/api/products/' + id).then(r => r.data);
export const getFeaturedProducts = () => api.get('/api/products/featured').then(r => r.data);
export const getProductsByCategory = (categoryId, page = 0, size = 12) => api.get('/api/products/category/' + categoryId, { params: { page, size } }).then(r => r.data);
export const searchProducts = (q, page = 0, size = 12) => api.get('/api/products/search', { params: { q, page, size } }).then(r => r.data);
export const createProduct = (data) => api.post('/api/products', data).then(r => r.data);
export const updateProduct = (id, data) => api.put('/api/products/' + id, data).then(r => r.data);
export const deleteProduct = (id) => api.delete('/api/products/' + id);
