<template>
  <div class="container">
    <div v-if="orders.length">
      <div class="mt-3 d-flex flex-row justify-content-center">
        <div
          v-for="(order,key) in orders"
          :key="key"
          @click="orderSelected(order)"
          class="card border-warning mx-2 my-2"
        >
          <div class="card-header text-center">
            <h2>{{order.vendor.name}}</h2>
            <small class="badge badge-warning">
              <Countdown v-if="order.deadlineAt" :end="order.deadlineAt"></Countdown>
            </small>
          </div>
          <div class="card-body text-dark">
            <ProductsInputList
              :products="order.vendor.products"
              :order="order"
              @productSelected="productSelected"
            ></ProductsInputList>
          </div>
          <div class="card-footer bg-transparent border-warning">
            <div>
              <strong>Deadline at:</strong>
              <small>{{order.deadlineAt | moment}}</small>
            </div>
            <div>
              <strong>Choice:</strong>
              <small v-if="order.choice && order.choice.id">{{order.choice.product.name}}</small>
            </div>
            <div v-if="order.choice && order.choice.comment">
              <strong>Comment:</strong>
              <small v-if="order.choice">{{order.choice.comment}}</small>
            </div>
            <div class="text-center mt-1">
              <button
                v-if="order.choice.product && beforeDeadline(order)"
                v-on:click="removeChoice(order)"
                class="btn btn-sm btn-danger col-white"
              >Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mt-4">
        <div class="col-sm-6">
          <span>Comment:</span>
          <textarea v-model="choice.comment" class="form-control border-warning"></textarea>
        </div>
      </div>
      <div class="d-flex justify-content-center mt-4">
        <button
          :disabled="!choice.product"
          class="btn btn-lg btn-warning col-white"
          v-on:click="sendForm"
        >Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsInputList from '@/components/Product/InputsList';
import Countdown from '@/components/Helpers/Countdown';

import { ChoiceService } from '@/services/choice.service';
import { OrderService } from '@/services/order.service';

export default {
  data: () => {
    return {
      orders: [],
      choice: {
        order: {},
        product: null,
        comment: ''
      },
      service: new ChoiceService(),
      orderService: new OrderService()
    };
  },
  methods: {
    getProducts(vendor) {},
    sendForm: async function() {
      if (this.choice.product) {
        const response = await this.service.store(this.$store.getters.user, this.choice.order, this.choice.product, this.choice.comment);
        const choice = response.data;
        this.orders.find(x => x.id === choice.orderId).choice = {
          id: choice.id,
          product: this.choice.product,
          comment: this.choice.comment
        };
        this.choice.comment = '';
      }
    },
    removeChoice: async function(order) {
      const response = this.service.remove(order.id, order.choice.id);
      this.choice.comment = '';
      this.orders.find(x => x.id === order.id).choice = {
        id: null,
        product: null,
        comment: ''
      };
    },
    productSelected: function(product, order) {
      this.orders.find(x => x.id === order.id).choice.product = product;
      this.choice.product = product;
    },
    orderSelected: function(order) {
      this.choice.order = order;
    },
    beforeDeadline: function(order) {
      return new Date(order.deadlineAt) > new Date();
    }
  },
  computed: {},
  async created() {
    this.orders = await this.orderService.getAllWithProductChoices();
  },
  components: { ProductsInputList, Countdown }
};
</script>
