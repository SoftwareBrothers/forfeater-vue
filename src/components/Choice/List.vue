<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{ name: 'Home' }">Home</router-link></li>
        <li class="breadcrumb-item"><router-link :to="{ name: 'OrderList' }">Orders</router-link></li>
        <li class="breadcrumb-item"><router-link :to="{ name: 'OrderEdit', params: { id: this.$route.params.orderId } }">Order</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Choices</li>
      </ol>
    </nav>
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Choices list</h1>
      </div>
    </div>
    <ChoiceTable :choices="choices"></ChoiceTable>
  </div>
</template>

<script>
  import ChoiceService from "@/services/choice.service";
  import ChoiceTable from "@/components/Choice/Table";
  
  export default {
    data() {
      return {
        choices: {}
      };
    },
    created() {
      ChoiceService.getAll(this.$route.params.orderId)
        .then(choices => {
          this.choices = choices.sort( (a,b) => a.productId - b.productId);
        })
        .catch(errors => {
          console.log(errors);
        });
    },
    components: {
      ChoiceTable
    }
  };
</script>

<style lang="scss" scoped>
</style>
