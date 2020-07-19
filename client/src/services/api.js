import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_PORT || '3001',
});

export default api;
