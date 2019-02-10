import axios from 'axios';

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

export default client;
