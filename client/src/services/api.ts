import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (data: { name: string; email: string; phone: string; password: string }) =>
    api.post('/auth/register', data),
};

// Services API
export const servicesAPI = {
  getAll: () => api.get('/services'),
  getById: (id: string) => api.get(`/services/${id}`),
};

// Workers API
export const workersAPI = {
  getAll: (serviceId?: string) =>
    api.get('/workers', { params: { service_id: serviceId } }),
  getById: (id: string) => api.get(`/workers/${id}`),
};

// Bookings API
export const bookingsAPI = {
  create: (data: any) => api.post('/bookings', data),
  getMyBookings: () => api.get('/bookings/my-bookings'),
  getAllBookings: () => api.get('/bookings/all'),
  updateStatus: (id: string, status: string) =>
    api.patch(`/bookings/${id}/status`, { status }),
};

export default api;
