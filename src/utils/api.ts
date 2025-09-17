import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const videoAPI = {
  // Get feed videos
  getFeed: async (page = 1, limit = 10) => {
    const response = await api.get(`/videos/feed?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get video by ID
  getVideo: async (id: string) => {
    const response = await api.get(`/videos/${id}`);
    return response.data;
  },

  // Upload video
  uploadVideo: async (formData: FormData) => {
    const response = await api.post('/videos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Like video
  likeVideo: async (videoId: string) => {
    const response = await api.post(`/videos/${videoId}/like`);
    return response.data;
  },

  // Share video
  shareVideo: async (videoId: string) => {
    const response = await api.post(`/videos/${videoId}/share`);
    return response.data;
  },

  // Add comment
  addComment: async (videoId: string, text: string) => {
    const response = await api.post(`/videos/${videoId}/comments`, { text });
    return response.data;
  },

  // Get comments
  getComments: async (videoId: string, page = 1) => {
    const response = await api.get(`/videos/${videoId}/comments?page=${page}`);
    return response.data;
  },
};

export const userAPI = {
  // Get user profile
  getProfile: async (userId: string) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  // Update profile
  updateProfile: async (userId: string, data: any) => {
    const response = await api.put(`/users/${userId}`, data);
    return response.data;
  },

  // Follow user
  followUser: async (userId: string) => {
    const response = await api.post(`/users/${userId}/follow`);
    return response.data;
  },

  // Unfollow user
  unfollowUser: async (userId: string) => {
    const response = await api.post(`/users/${userId}/unfollow`);
    return response.data;
  },
};

export const authAPI = {
  // Login
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  // Register
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export default api;
