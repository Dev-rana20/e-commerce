import api from './api';

export const validateCoupon = (code, orderAmount) => api.post('/api/coupons/validate', null, { params: { code, orderAmount } }).then(r => r.data);
