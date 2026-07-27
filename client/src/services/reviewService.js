import api from './api';

export const getProductReviews = (productId) => api.get('/api/reviews/product/' + productId).then(r => r.data);
export const addReview = (data) => api.post('/api/reviews', data).then(r => r.data);
