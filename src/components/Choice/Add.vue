<template>
  <div class="container">
    <div v-if="orders.length">
      <div class="mt-3 d-flex flex-row justify-content-center">
        <div v-for="(order, key) in orders" :key="key" class="card border-warning mx-2 my-2">
          <div class="card-header text-center">
            <h2>{{ order.vendor.name }}</h2>
            <small class="badge badge-warning">
              <Countdown v-if="order.deadlineAt" :end="order.deadlineAt"></Countdown>
            </small>
          </div>
          <div class="card-body text-dark">
            <ProductsInputList :order.sync="order" @update:order="setChoice"></ProductsInputList>
          </div>
          <div class="card-footer bg-transparent border-warning">
            <div v-if="order.choice && order.choice.comment">
              <strong>Comment:</strong>
              <small>{{ order.choice.comment }}</small>
            </div>
            <div class="text-center mt-1">
              <button
                v-if="order.choice && order.choice.product && beforeDeadline(order)"
                v-on:click="removeChoice(order)"
                class="btn btn-sm btn-danger col-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mt-4">
        <div class="col-sm-6">
          <span>Comment:</span>
          <textarea v-model="comment" class="form-control border-warning"></textarea>
        </div>
      </div>
      <div class="d-flex justify-content-center mt-4">
        <button :disabled="!isProductSelected" class="btn btn-lg btn-warning col-white" v-on:click="sendForm">Send</button>
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
      choice: null,
      service: new ChoiceService(),
      orderService: new OrderService()
    };
  },
  methods: {
    sendForm: function() {
      if (this.choice.product) {
        this.service.store(this.$store.getters.user, this.choice.order, this.choice.product, this.choice.comment).then(choice => {
          this.orders.find(x => x.id === choice.orderId).choice = choice;
          this.choice = null;
        });
      }
    },
    removeChoice: async function(order) {
      if (order.id && order.choice.id) {
        await this.service.remove(order.id, order.choice.id);
      }
      this.choice = null;
      this.orders.find(x => x.id === order.id).choice = null;
    },
    beforeDeadline: function(order) {
      return new Date(order.deadlineAt) > new Date();
    },
    setChoice(order) {
      this.choice = order.choice;
      this.choice.order = order;
    }
  },
  computed: {
    comment: {
      get() {
        return this.choice && this.choice.comment;
      },
      set(comment) {
        const choice = this.choice || {};
        this.choice = Object.assign(choice, { comment });
      }
    },
    isProductSelected() {
      return this.choice && this.choice.product;
    }
  },
  async created() {
    this.orders = await this.orderService.getAllWithProductChoices();
  },
  components: { ProductsInputList, Countdown }
};
</script>
