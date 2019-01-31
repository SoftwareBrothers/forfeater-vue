import client from '@/config/client';

export default class ApiProvider {
  constructor() {
    this.client = client;
  }
}
