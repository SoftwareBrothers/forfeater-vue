import client from '@/config/client';

export class ApiService {
  token = null;

  constructor() {
    this.initClient();
  }

  initClient() {
    this.client = client;
    this.initToken();
  }

  initToken() {
    this.token = localStorage.getItem('token') || null;
    if (this.token) {
      this.client.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${this.token}`;
    }
  }
}
