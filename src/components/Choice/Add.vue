<template>
  <div class="container py-5">
    <div class="row mt-5">
      <div class="col-sm"></div>
      <div class="col-sm">
        <h1 class="text-center">Choice your meal!</h1>
      </div>
      <div class="col-sm"></div>
    </div>
    <div class="row mt-3">
      <div class="col-sm"></div>
      <div class="col-sm">
        <h2 class="text-center" v-if="vendor">{{vendor.name}}</h2>
      </div>
      <div class="col-sm"></div>
    </div>
    <div v-if="vendor">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm-10">
          <div class="form-group">
            <ProductList :products="products"></ProductList>
          </div>
          <div v-if="products" class="form-group">
            <input type="text" class="form-control" placeholder="Your name">
          </div>
        </div>
        <div class="col-sm"></div>
      </div>
      <div class="row">
        <div class="ml-auto">
          <button class="btn btn-dark">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import ProductList from "@/components/Product/List";
  import VendorProvider from "@/provider/vendor.provider";
  import ProductProvider from "@/provider/product.provider";
  
  export default {
    data() {
      return {
        vendor: {},
        products: [],
        errors: []
      };
    },
    created() {
      VendorProvider.getTodayVendor()
        .then(vendor => {
          this.vendor = vendor;
          ProductProvider.getAllActiveByVendor(vendor.id)
            .then(products => {
              this.products = products;
            })
            .catch(errors => {
              console.log(errors);
            });
        })
        .catch(errors => {
          console.log(errors);
        });
    },
    components: {
      ProductList
    }
  };
</script>

<style lang="scss" scoped>
  
</style>
