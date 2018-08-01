<template>
  <div class="container">
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Edit product</h1>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-sm-12">
          <ProductForm :Product="Product"></ProductForm>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProductService from "@/services/product.service";
  import ProductForm from "@/components/Product/Form";
  
  export default {
    data() {
      return {
        Product: {
          name: null,
          active: null
        }
      };
    },
    beforeCreate() {
      ProductService.find(this.$route.params.vendorId, this.$route.params.id)
        .then(product => {
          this.Product = product;
        })
        .catch(errors => {
          console.log(errors);
        });
    },
    components: {
      ProductForm
    }
  };
</script>

<style lang="scss" scoped>
</style>
