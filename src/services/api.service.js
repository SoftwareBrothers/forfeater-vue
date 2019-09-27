import client from '@/config/client';

export class ApiService {
  constructor() {
    this.initClient();
  }

  initClient() {
    this.client = client;
    this.initToken();
  }

  initToken() {
    const token = this.getToken();
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  getToken() {
    return localStorage.getItem('token') || null;
  }
}
