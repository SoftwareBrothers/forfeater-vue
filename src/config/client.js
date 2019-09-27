import axios from 'axios';
import store from '@/config/store';

const client = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
});

client.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    store.dispatch('setNotification', {
      type: 'error',
      message: error.message,
      code: error.code,
    });
    return false;
  },
);

export default client;
