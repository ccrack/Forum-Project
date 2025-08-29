import axios from 'axios';

const API = axios.create({
  baseURL: 'https://forum-project-o6eu.onrender.com'
});

// Attach token automatically if present
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});

export default API;