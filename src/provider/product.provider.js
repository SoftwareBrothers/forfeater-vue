import { ApiProvider } from '@/provider/api.provider';

export default class ProductProvider extends ApiProvider {
  constructor() {
    super();
    this.uri = 'vendors';
  }

  getAllActiveByVendor(vendorId) {
    return this.client.get(`${this.uri}/${vendorId}/products`, {
      params: {
        active: 1,
        vendorId: vendorId
      }
    });
  }
}
