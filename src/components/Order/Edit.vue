<template>
  <div class="container">
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
  import OrderService from "@/services/order.service";
  import OrderForm from "@/components/Order/Form";
  
  export default {
    data() {
      return {
        Order: {
          vendorId: null,
          userId: 1,
          deadlineAt: null,
          deliveryAt: null
        }
      };
    },
    beforeCreate() {
      OrderService.find(this.$route.params.id)
        .then(order => {
          this.Order = order;
        })
        .catch(errors => {
          console.log(errors);
        });
    },
    components: {
      OrderForm
    }
  };
</script>

<style lang="scss" scoped>
</style>
