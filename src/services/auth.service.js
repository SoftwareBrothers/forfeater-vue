import { ApiService } from '@/services/api.service';
import qs from 'qs';

export class AuthService extends ApiService {
  constructor() {
    super();
    this.uri = 'auth';
  }
  authorize(credential) {
    const data = {
      grant_type: 'password',
      username: credential.username,
      password: credential.password,
      client_id: process.env.VUE_APP_API_CLIENT_ID || 'forfeaterWeb',
      client_secret: process.env.VUE_APP_API_CLIENT_SECRET || 'forfeaterSecret'
    };
    return this.client.post(`${this.uri}/login`, qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  provide() {
    this.initToken();
    return this.client.get(`${this.uri}/user`);
  }
}
