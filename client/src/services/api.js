import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_PORT || 'http://localhost:3001/api/transaction',
});

export default api;
