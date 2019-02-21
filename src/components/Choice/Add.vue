<template>
  <div class="container">
    <div v-if="orders.length">
      <div class="mt-3 d-flex flex-row justify-content-center">
        <div v-for="(order, key) in orders" :key="key" class="card border-warning mx-2 my-2" @click="choice = order.choice || {}">
          <div class="card-header text-center">
            <h2>{{ order.vendor.name }}</h2>
            <small class="badge badge-warning">
              <Countdown v-if="order.deadlineAt" :end="order.deadlineAt"></Countdown>
            </small>
          </div>
          <div class="card-body text-dark">
            <ProductsInputList :order="order" :choice.sync="choice" />
          </div>
          <div class="card-footer bg-transparent border-warning" v-if="isCancel(order)">
            <div class="text-center mt-1">
              <button v-on:click="removeChoices()" class="btn btn-sm btn-danger col-white">
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
      choice: {
        order: null,
        product: null,
        comment: '',
        id: null
      },
      service: new ChoiceService(),
      orderService: new OrderService()
    };
  },
  methods: {
    sendForm: async function() {
      if (this.choice.product) {
        const choice = await this.service.save(this.$store.getters.user, this.choice.order, this.choice.product, this.choice.comment);
        if (choice) {
          this.$store.dispatch('setNotification', { type: 'success', message: this.$t('choices.saved'), code: 200 });
          this.orders.find(x => x.id === choice.orderId).choice = choice;
        }
      }
    },
    removeChoices: async function() {
      for (const order of this.orders) {
        if (order.choice.id) {
          await this.service.remove(order.id, order.choice.id);
          order.choice = { id: null, comment: null, product: null, order: null };
          this.comment = '';
        }
      }
    },
    beforeDeadline: function(order) {
      return new Date(order.deadlineAt) > new Date();
    },
    isCancel(order) {
      return (this.choice.order && this.choice.order.id) === order.id && this.beforeDeadline(order);
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
    const orders = await this.orderService.getAllActiveWithProductChoices();
    if (!orders.length) {
      return this.$store.dispatch('setNotification', { type: 'warning', message: this.$t('orders.lack'), code: 200 });
    }
    this.orders = orders;
    const order = orders.find(x => parseInt(x.choice.id) > 0);
    if (order) {
      this.choice = order.choice;
      this.choice.order = order;
    }
  },
  components: { ProductsInputList, Countdown }
};
</script>
