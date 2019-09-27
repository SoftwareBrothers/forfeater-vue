import { ApiService } from '@/services/api.service';

export class ProductService extends ApiService {
  constructor() {
    super();
    this.uri = 'vendors';
  }
  find(id) {
    return this.client.get(`products/${id}`);
  }

  getAll(vendorId) {
    return this.client.get(`${this.uri}/${vendorId}/products`);
  }

  remove(vendorId, productId) {
    return this.client.delete(`${this.uri}/${vendorId}/products/${productId}`);
  }

  store(product) {
    return this.client.post(`products`, product);
  }

  update(product) {
    return this.client.put(`products`, product);
  }

  getAllActiveByVendor(vendorId) {
    return this.client.get(`${this.uri}/${vendorId}/products`, {
      params: {
        active: 1,
        vendorId: vendorId,
      },
    });
  }
}
