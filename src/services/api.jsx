import axios from 'axios';

const token = localStorage.getItem('access_token');
const api = axios.create({
  baseURL: 'http://34.71.240.100/api',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

export default api;