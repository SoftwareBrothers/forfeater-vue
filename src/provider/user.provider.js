import { ApiProvider } from '@/provider/api.provider';

export class UserProvider extends ApiProvider {
  constructor() {
    super();
    this.uri = 'users';
  }

  find(id) {
    return this.client.get(`${this.uri}/${id}`);
  }

  getAll() {
    return this.client.get(this.uri);
  }

  remove(userId) {
    return this.client.delete(`${this.uri}/${userId}`);
  }

  store(user) {
    return this.client.post(this.uri, user);
  }

  update(user) {
    return this.client.patch(`${this.uri}/${user.id}`, user);
  }

  changePassword(user, password) {
    return this.client.put(`${this.uri}/${user.id}/password`, { newPassword: password });
  }
}
