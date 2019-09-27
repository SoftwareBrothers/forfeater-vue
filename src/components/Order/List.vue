<template>
  <div class="container">
    <OrderTable :orders="orders"></OrderTable>
  </div>
</template>

<script>
import { OrderService } from '@/services/order.service';
import OrderTable from '@/components/Order/Table';

export default {
  components: { OrderTable },
  data() {
    return {
      orders: [],
      service: new OrderService(),
    };
  },
  async created() {
    const { items } = await this.service.getAll();
    this.orders = items;
  },
};
</script>
