<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{ name: 'Home' }">Home</router-link></li>
        <li class="breadcrumb-item"><router-link :to="{ name: 'VendorList' }">Vendors</router-link></li>
        <li class="breadcrumb-item active"><router-link :to="{ name: 'ProductList', params: { vendorId: this.$route.params.vendorId }}">Products</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ Product.name }}</li>
      </ol>
    </nav>
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Product: {{ Product.name }}</h1>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-sm-12">
          <div>Name: {{ Product.name}}</div>
          <div v-if="Product.vendor">Vendor: {{ Product.vendor.name }}</div>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProductService from "@/services/product.service";

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
          // console.log(errors);
        });
    }
  };
</script>

<style lang="scss" scoped>
</style>
