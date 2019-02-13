<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'Home' }">Home</router-link>
        </li>
        <li class="breadcrumb-item active">Orders</li>
      </ol>
    </nav>
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Order list</h1>
      </div>
    </div>
    <OrderTable :orders="orders"></OrderTable>
  </div>
</template>

<script>
import { OrderService } from '@/services/order.service';
import OrderTable from '@/components/Order/Table';

export default {
  data() {
    return {
      orders: [],
      service: new OrderService()
    };
  },
  async created() {
    this.orders = await this.service.getAllWithProductChoices();
  },
  components: { OrderTable }
};
</script>
