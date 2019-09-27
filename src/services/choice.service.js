import { ApiService } from '@/services/api.service';
import { ProductService } from '@/services/product.service';

export class ChoiceService extends ApiService {
  constructor() {
    super();
    this.uri = 'choices';
    this.productService = new ProductService();
  }

  getAll() {
    return this.client.get(this.uri);
  }

  getAllFromOrder(orderId) {
    return this.client.get(`orders/${orderId}/${this.uri}`);
  }

  find(id) {
    return this.client.get(`${this.uri}/${id}`);
  }

  getFromOrder(orderId) {
    return this.client.get(`orders/${orderId}/choice`);
  }

  getFromProduct(Product) {
    return this.client.get(
      `vendors/${Product.vendorId}/products/${Product.id}/choices`,
    );
  }

  store(User, Order, Product, comment) {
    return this.client.put(`orders/${Order.id}/choices`, {
      orderId: Order.id,
      userId: User.id,
      productId: Product.id,
      orderComment: comment,
    });
  }

  async save(User, Order, Product, commentText) {
    const data = await this.store(User, Order, Product, commentText);
    const product = await this.productService.find(
      Product.vendorId,
      data.productId,
    );
    const { id = null, orderComment: comment = null, orderId } = data;
    return { id, product, comment, orderId };
  }

  rate(orderId, Score) {
    return this.client.patch(`orders/${orderId}/ratings`, {
      mark: Score.score,
      scoreComment: Score.comment,
    });
  }

  remove(orderId, choiceId) {
    return this.client.delete(`orders/${orderId}/choices/${choiceId}`);
  }
}
