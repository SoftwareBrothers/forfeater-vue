<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{ name: 'Home' }">Home</router-link></li>
        <li class="breadcrumb-item"><router-link :to="{ name: 'OrderList' }">Orders</router-link></li>
        <li class="breadcrumb-item">Choices</li>
        <li class="breadcrumb-item active" aria-current="page">Edit</li>
      </ol>
    </nav>
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Edit choice</h1>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-sm-12">
          <ChoiceForm :choice="choice"></ChoiceForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ChoiceProvider from "@/provider/choice.provider";
  import ChoiceForm from "@/components/Choice/Form";
  
  export default {
    data() {
      return {
        choice: {
          vendorId: null,
          userId: null,
          deadlineAt: null,
          deliveryAt: null
        }
      };
    },
    beforeCreate() {

      new ChoiceProvider().find(this.$route.params.choiceId)
              .then(choice => {
                this.choice = choice;
              })
              .catch(errors => {
                console.log(errors);
              });
    },
    components: {
      ChoiceForm
    }
  };
</script>

<style lang="scss" scoped>
  
</style>
