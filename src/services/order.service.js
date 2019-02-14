import store from '@/config/store';

import { ApiService } from '@/services/api.service';
import { ProductService } from '@/services/product.service';
import { ChoiceService } from '@/services/choice.service';

export class OrderService extends ApiService {
  constructor() {
    super();
    this.uri = 'orders';
    this.productService = new ProductService();
    this.choiceService = new ChoiceService();
  }

  find(orderId) {
    return this.client.get(`${this.uri}/${orderId}`);
  }

  getActive() {
    return this.client.get(this.uri, {
      params: { active: 1 }
    });
  }

  getAll() {
    return this.client.get(this.uri);
  }

  getOrderWithChoices(orderId) {
    return this.client.get(`${this.uri}/${orderId}/choices`);
  }

  remove(orderId) {
    return this.client.delete(`${this.uri}/${orderId}`);
  }

  store(order) {
    return this.client.post(this.uri, order);
  }

  update(order) {
    return this.client.patch(`${this.uri}/${order.id}`, order);
  }

  async getAllWithProductChoices() {
    const orders = [];
    const data = await this.getAll();
    data.forEach(async order => {
      order.vendor.products = await this.productService.getAllActiveByVendor(order.vendor.id);
      order.choice = null;
      const choices = await this.getOrderWithChoices(order.id);
      let userChoice = choices.find(x => x.userId === store.getters.user.id);
      if (userChoice !== undefined) {
        order.choice = {
          id: userChoice.id,
          product: userChoice.product,
          comment: userChoice.orderComment
        };
      }
      orders.push(order);
    });
    return orders;
  }
}
