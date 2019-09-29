import { ApiService } from '@/services/api.service';

export class ProductService extends ApiService {
  constructor() {
    super();
    this.uri = 'vendors';
  }
  find(vendorId, id) {
    return this.client.get(`${this.uri}/${vendorId}/products/${id}`);
  }

  getAll(vendorId) {
    return this.client
      .get(`${this.uri}/${vendorId}/products`)
      .then(result => result.items);
  }

  remove(vendorId, productId) {
    return this.client.delete(`${this.uri}/${vendorId}/products/${productId}`);
  }

  store(vendorId, product) {
    return this.client.post(`${this.uri}/${vendorId}/products`, product);
  }

  update(vendorId, product) {
    return this.client.patch(
      `${this.uri}/${vendorId}/products/${product.id}`,
      product,
    );
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
