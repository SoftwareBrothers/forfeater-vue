<template>
  <div class="container">
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Create product</h1>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-sm-12">
          <ProductForm></ProductForm>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProductService from "@/services/product.service";
  import ProductForm from "@/components/Product/Form";
  
// console.log('heloł');
// console.log(this.$route.params);

  export default {
    data() {
      return {};
    },
    components: {
      ProductForm
    }
  };
</script>

<style lang="scss" scoped>
</style>
