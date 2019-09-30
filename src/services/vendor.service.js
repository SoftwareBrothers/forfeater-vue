import { ApiService } from '@/services/api.service';

export class VendorService extends ApiService {
  constructor() {
    super();
    this.uri = '/vendors';
  }

  find(id) {
    return this.client.get(`${this.uri}/${id}`);
  }

  getAll() {
    return this.client.get(this.uri).then(result => result.items);
  }

  getTodayVendor() {
    const vendors = this.getAll();
    return vendors[0] || null;
  }

  remove(id) {
    return this.client.delete(`${this.uri}/${id}`);
  }

  store(vendor) {
    return this.client.post(this.uri, vendor);
  }

  update(vendor) {
    return this.client.patch(`${this.uri}/${vendor.id}`, vendor);
  }
}
