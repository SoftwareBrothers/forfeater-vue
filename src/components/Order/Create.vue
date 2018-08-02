<template>
  <div class="container">
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Create order</h1>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-sm-12">
          <OrderForm></OrderForm>  
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import OrderService from "@/services/order.service";
  import OrderForm from "@/components/Order/Form";
  
  export default {
    data() {
      return {};
    },
    components: {
      OrderForm
    }
  };
</script>

<style lang="scss" scoped>
  
</style>
