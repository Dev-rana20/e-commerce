import api from './api';

export const getWishlist = () => api.get('/api/wishlist').then(r => r.data);
export const addToWishlist = (productId) => api.post('/api/wishlist/' + productId).then(r => r.data);
export const removeFromWishlist = (productId) => api.delete('/api/wishlist/' + productId).then(r => r.data);
export const checkWishlist = (productId) => api.get('/api/wishlist/' + productId + '/check').then(r => r.data);
