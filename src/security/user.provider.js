var qs = require('qs');

import { ApiProvider } from '@/provider/api.provider';

export class UserProvider extends ApiProvider {
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

  provide(access_token) {
    return this.client.get(`${this.uri}/user`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
  }
}
