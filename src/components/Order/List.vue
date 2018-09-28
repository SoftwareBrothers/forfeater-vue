<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{ name: 'Home' }">Home</router-link></li>
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
  import OrderService from "@/services/order.service";
  import OrderTable from "@/components/Order/Table";
  import ChoiceService from "@/services/choice.service";
  
  export default {
    data() {
      return {
        orders: []
      };
    },
    created() {
      OrderService.getAll()
        .then(orders => {
  
          orders.forEach(order => {
            ChoiceService.getAll(order.id)
              .then(choices => {
  
                let userChoice = choices.find(x => x.userId === this.$store.getters.user.id);
  
                order.choice = {
                  product: userChoice ? userChoice.product : null,
                  comment: userChoice ? userChoice.comment : ''
                }
  
                this.orders.push(order);
              })
              .catch(errors => {
                console.log(errors);
              });
          });
  
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

<style lang="scss">
  
</style>
