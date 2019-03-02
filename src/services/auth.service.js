import qs from 'qs';

import { ApiService } from '@/services/api.service';

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
    return await this.client.post(`${this.uri}/login`, qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  async getUserProfile() {
    this.initToken();
    return await this.client.get(`${this.uri}/user`);
  }
}
