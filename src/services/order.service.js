import Vue from 'vue';

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
    const response = await this.getAll();
    response.data.forEach(async order => {
      const productResponse = await this.productService.getAllActiveByVendor(order.vendor.id);
      order.vendor.products = productResponse.data || [];
      const choiceResponse = this.choiceService.getAll(order.id);
      let userChoice = choiceResponse.data.find(x => x.userId === Vue.$store.getters.user.id);
      order.choice = {
        id: userChoice.id || null,
        product: userChoice.product || null,
        comment: userChoice.orderComment || ''
      };

      orders.push(order);
    });
    return orders;
  }
}
