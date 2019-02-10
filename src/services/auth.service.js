import qs from 'qs';

import { ApiService } from '@/services/api.service';
import store from '@/config/store';

export class AuthService extends ApiService {
  constructor() {
    super();
    this.uri = 'auth';
  }
  async authorize(credential) {
    const data = {
      grant_type: 'password',
      username: credential.username,
      password: credential.password,
      client_id: process.env.VUE_APP_API_CLIENT_ID || 'forfeaterWeb',
      client_secret: process.env.VUE_APP_API_CLIENT_SECRET || 'forfeaterSecret'
    };
    try {
      const response = await this.client.post(`${this.uri}/login`, qs.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      return response.data;
    } catch (error) {
      store.dispatch('setNotification', { type: 'error', message: `errors.auth.general` });
      return false;
    }
  }

  provide() {
    this.initToken();
    return this.client.get(`${this.uri}/user`);
  }
}
