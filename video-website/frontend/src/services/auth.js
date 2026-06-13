import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// 创建axios实例
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 清除过期token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 认证相关API
export const auth = {
  register: async (userData) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/users/login', credentials);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  setCurrentUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },
};

// 视频相关API
export const videos = {
  getAll: async (params = {}) => {
    const response = await api.get('/videos', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/videos/${id}`);
    return response.data;
  },

  upload: async (formData) => {
    const response = await api.post('/videos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/videos/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/videos/${id}`);
    return response.data;
  },

  like: async (id) => {
    const response = await api.post(`/videos/${id}/like`);
    return response.data;
  },

  unlike: async (id) => {
    const response = await api.post(`/videos/${id}/unlike`);
    return response.data;
  },
};

// 用户相关API
export const users = {
  getProfile: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },

  updatePassword: async (data) => {
    const response = await api.put('/users/password', data);
    return response.data;
  },

  getFavorites: async () => {
    const response = await api.get('/users/favorites');
    return response.data;
  },

  addFavorite: async (videoId) => {
    const response = await api.post(`/users/favorites/${videoId}`);
    return response.data;
  },

  removeFavorite: async (videoId) => {
    const response = await api.delete(`/users/favorites/${videoId}`);
    return response.data;
  },
};

export default api;