import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Access-Control-Allow-Origin': '*'
};
if (localStorage.getItem('token')) {
  Object.assign(headers, {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });
}

const client = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers
});

export default client;
