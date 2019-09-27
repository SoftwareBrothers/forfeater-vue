import qs from 'qs';

import { ApiService } from '@/services/api.service';

export class AuthService extends ApiService {
  constructor() {
    super();
    this.uri = 'auth';
  }
  async authorize(credential) {
    return await this.client.post(`${this.uri}/signin`, credential);
  }

  async getUserProfile() {
    this.initToken();
    return await this.client.get(`${this.uri}/user`);
  }
}
