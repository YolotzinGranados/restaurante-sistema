import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '/api',
});

// Adjunta el token JWT a cada petición si existe
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
