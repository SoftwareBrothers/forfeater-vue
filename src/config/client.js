import axios from 'axios';
import store from '@/config/store';

const headers = {
  common: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
};

const client = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers
});

client.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    store.dispatch('setNotification', { type: 'error', message: error.message, code: error.code });
    return false;
  }
);

export default client;
