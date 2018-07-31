<template>
  <div class="container py-5">
    <div class="row mt-5">
      <div class="col-sm"></div>
      <div class="col-sm">
        <h1 class="text-center">Choose your meal!</h1>
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
            <ProductsInputList :products="products" @productSelected="productSelected"></ProductsInputList>
          </div>
          <div v-if="products" class="form-group">
            <UserAutocomplete @userSelected="userSelected"></UserAutocomplete>
          </div>
        </div>
        <div class="col-sm"></div>
      </div>
      <div class="row">
        <div class="ml-auto">
          <button :disabled="!isFormCompleted()" class="btn btn-dark" v-on:click="sendForm">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsInputList from "@/components/Product/InputsList";
import VendorProvider from "@/provider/vendor.provider";
import ProductProvider from "@/provider/product.provider";
import UserAutocomplete from "@/components/User/AutoComplete";

export default {
  data: () => {
    return {
      vendor: [],
      products: [],
      appErrors: [],
      product: {},
      user: {}
    };
  },
  methods: {
    sendForm: function() {
<<<<<<< HEAD
      if (this.isFormCompleted) {
      }
=======
>>>>>>> 5fb6ab18d4e2c5f1d1b26168b2093ae2a13a5698
    },
    productSelected: function(product) {
      this.product = product;
    },
    isFormCompleted: function() {
      return this.product && this.user;
    },
    userSelected: function(user) {
      this.user = user;
    }
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
            this.appErrors.push(errors);
          });
      })
      .catch(errors => {
        this.appErrors.push(errors);
      });
  },
  components: {
    ProductsInputList,
    UserAutocomplete
  }
};
</script>

<style lang="scss" scoped>
</style>
