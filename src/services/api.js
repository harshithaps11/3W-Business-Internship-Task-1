import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const userAPI = {
  getAllUsers: () => api.get('/users'),
  addUser: (userData) => api.post('/users', userData),
  claimPoints: (userId) => api.post('/users/claim', { userId }),
};

export const leaderboardAPI = {
  getLeaderboard: () => api.get('/leaderboard'),
};

export const historyAPI = {
  getHistory: (page = 1, limit = 20) => api.get(`/history?page=${page}&limit=${limit}`),
};

export default api;