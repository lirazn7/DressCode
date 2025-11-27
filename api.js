import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  me: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
  refresh: () => api.post('/auth/refresh'),
};

// Users API
export const usersAPI = {
  getProfile: (userId) => api.get(`/users/profile/${userId}`),
  updateProfile: (profileData) => api.put('/users/profile', profileData),
  getAvatarUploadUrl: (fileType) => 
    api.post('/users/profile/avatar/upload-url', { file_type: fileType }),
  updateAvatar: (imageUrl) => 
    api.post('/users/profile/avatar', { image_url: imageUrl }),
  searchUsers: (query, page = 1, limit = 20) => 
    api.get(`/users/search?q=${query}&page=${page}&limit=${limit}`),
  deleteAccount: () => api.delete('/users/account'),
};

// Closet API
export const closetAPI = {
  createLook: (lookData) => api.post('/closet/looks', lookData),
  getMyLooks: (page = 1, limit = 20) => 
    api.get(`/closet/looks?page=${page}&limit=${limit}`),
  getLook: (lookId) => api.get(`/closet/looks/${lookId}`),
  updateLook: (lookId, lookData) => api.put(`/closet/looks/${lookId}`, lookData),
  deleteLook: (lookId) => api.delete(`/closet/looks/${lookId}`),
  getLookUploadUrl: (fileType) => 
    api.post('/closet/looks/upload-url', { file_type: fileType }),
  updateLookImage: (lookId, imageUrl) => 
    api.post(`/closet/looks/${lookId}/image`, { image_url: imageUrl }),
};

// Feed API
export const feedAPI = {
  createPost: (postData) => api.post('/feed/posts', postData),
  getFeed: (page = 1, limit = 20) => 
    api.get(`/feed/posts?page=${page}&limit=${limit}`),
  getPost: (postId) => api.get(`/feed/posts/${postId}`),
  likePost: (postId) => api.post(`/feed/posts/${postId}/like`),
  unlikePost: (postId) => api.delete(`/feed/posts/${postId}/like`),
  getPostUploadUrl: (fileType) => 
    api.post('/feed/posts/upload-url', { file_type: fileType }),
  updatePostImage: (postId, imageUrl) => 
    api.post(`/feed/posts/${postId}/image`, { image_url: imageUrl }),
};

// Challenges API
export const challengesAPI = {
  getChallenges: () => api.get('/challenges/'),
  getChallenge: (challengeId) => api.get(`/challenges/${challengeId}`),
  createChallenge: (challengeData) => api.post('/challenges/', challengeData),
  participateInChallenge: (challengeId, lookId) => 
    api.post(`/challenges/${challengeId}/participate`, { look_id: lookId }),
  getChallengeParticipants: (challengeId, page = 1, limit = 20) => 
    api.get(`/challenges/${challengeId}/participants?page=${page}&limit=${limit}`),
  getChallengeRanking: (challengeId) => 
    api.get(`/challenges/${challengeId}/ranking`),
  createWeeklyChallenge: () => api.post('/challenges/weekly'),
};

// File upload helper
export const uploadFile = async (uploadUrl, file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });
  
  if (!response.ok) {
    throw new Error('Upload failed');
  }
  
  return response;
};

export default api;