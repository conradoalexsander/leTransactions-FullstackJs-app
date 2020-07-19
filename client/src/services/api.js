import axios from 'axios';

const api = axios.create({
  baseURL: process.env.PORT || 'http://localhost:3000/api/transaction',
});

export default api;
