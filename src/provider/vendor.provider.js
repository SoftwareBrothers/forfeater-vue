import ApiProvider from '@/provider/api.provider';

export default class VendorProvider extends ApiProvider {
  constructor() {
    super();
    this.uri = '/vendors';
  }

  async find(id) {
    return await this.client.get(`${this.uri}/${id}`);
  }

  async getAll() {
    return await this.client.get(this.uri);
  }

  getTodayVendor() {
    const vendors = this.getAll();
    return vendors[0] || null;
  }

  async remove(id) {
    return await this.client.delete(`${this.uri}/${id}`);
  }

  async store(vendor) {
    return await this.client.post(this.uri, vendor);
  }

  async update(vendor) {
    return await this.client.patch(`${this.uri}/${vendor.id}`, vendor);
  }
}
