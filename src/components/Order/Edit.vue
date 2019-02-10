<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'Home' }">Home</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'OrderList' }">Orders</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Edit</li>
      </ol>
    </nav>
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Edit order</h1>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-sm-12">
          <OrderForm :Order="Order"></OrderForm>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { OrderService } from '@/services/order.service';
import { ProductService } from '@/services/product.service';

import OrderForm from '@/components/Order/Form';

export default {
  data() {
    return {
      products: null,
      Order: {
        vendorId: null,
        userId: null,
        deadlineAt: null,
        deliveryAt: null
      },
      service: new OrderService(),
      productService: new ProductService()
    };
  },
  beforeCreate() {
    this.service.find(this.$route.params.id).then(response => {
      this.Order = response.data;
      this.loadProducts();
    });
  },
  methods: {
    loadProducts: function() {
      this.productService.getAll(this.Order.vendorId).then(resonse => {
        this.checkedProducts = response.data
          .filter(product => {
            return product.active;
          })
          .map(product => {
            return product.id;
          });

        this.products = response.data;
      });
    }
  },
  components: { OrderForm }
};
</script>
