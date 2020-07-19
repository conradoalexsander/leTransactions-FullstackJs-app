import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_PORT || 'https://letransactions-desafio-final.herokuapp.com/api/transaction',
});

export default api;
