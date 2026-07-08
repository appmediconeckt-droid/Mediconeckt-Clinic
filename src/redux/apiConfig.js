export const API_BASE_URL = 'https://s5jl7g4z-5000.inc1.devtunnels.ms/api';

export const getAuthToken = () => {
  return localStorage.getItem('authToken') || '';
};

export const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};
