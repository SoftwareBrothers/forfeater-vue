import { ApiService } from '@/services/api.service';

export class AuthService extends ApiService {
  constructor() {
    super();
    this.uri = 'auth';
  }
  authorize(credential) {
    return this.client.post(`${this.uri}/signin`, credential);
  }
}
