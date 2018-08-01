<template>
  <div class="container">
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Order list</h1>
      </div>
    </div>
    <OrderTable :orders="orders"></OrderTable>
  </div>
</template>

<script>
  import OrderService from "@/services/order.service";
  import OrderTable from "@/components/Order/Table";
  
  export default {
    data() {
      return {
        orders: {}
      };
    },
    created() {
      OrderService.getAll()
        .then(orders => {
          this.orders = orders;
        })
        .catch(errors => {
          console.log(errors);
        });
    },
    components: {
      OrderTable
    }
  };
</script>

<style lang="scss" scoped>
</style>
