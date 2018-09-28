<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{ name: 'Home' }">Home</router-link></li>
        <li class="breadcrumb-item"><router-link :to="{ name: 'OrderList' }">Orders</router-link></li>
        <!-- <li class="breadcrumb-item active" aria-current="page">Edit</li> -->
      </ol>
    </nav>
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Score your order</h1>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-sm-12">
          <div>Product: </div>
          <div>Rate: </div>
          <div>Comment: </div>
          <ScoreForm></ScoreForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ChoiceProvider from "@/provider/choice.provider";

  import ScoreForm from "@/components/Choice/ScoreForm";

  export default {
    data() {
      return {
        Choice: {
          orderId: null,
          userId: null,
          productId: null,
          orderComment: null,
          score: null,
          scoreComment: null
        }
      };
    },
    beforeCreate() {
        new ChoiceProvider().getFromOrder(this.$route.params.id)
        .then(choice => {
          this.Choice = choice;
          console.log(choice);
        })
        .catch(errors => {
          console.log(errors);
        });
    },
    methods: {
    },
    components: {
        ScoreForm
    }
  };
</script>

<style lang="scss" scoped>
</style>
