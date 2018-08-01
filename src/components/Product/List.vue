<template>
  <div class="container">
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Product list</h1>
      </div>
    </div>
    <ProductTable :products="products"></ProductTable>
  </div>
</template>

<script>
  import ProductService from "@/services/product.service";
  import ProductTable from "@/components/Product/Table";
  
  export default {
    data() {
      return {
        products: {}
      };
    },
    created() {
      ProductService.getAll(this.$route.params.vendorId)
        .then(products => {
          this.products = products;
        })
        .catch(errors => {
          console.log(errors);
        });
    },
    components: {
      ProductTable
    }
  };
</script>

<style lang="scss" scoped>
  
</style>
