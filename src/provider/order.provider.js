import { ApiProvider } from '@/provider/api.provider';

export default class OderProvider extends ApiProvider {
  constructor() {
    super();
    this.uri = '/orders';
  }

  getActive() {
    return this.client.get(this.uri, {
      params: { active: 1 }
    });
  }
}
