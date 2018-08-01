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
import OrderProvider from "@/provider/order.provider";
import ProductProvider from "@/provider/product.provider";
import ChoiceProvider from "@/provider/choice.provider";
import UserAutocomplete from "@/components/User/AutoComplete";

export default {
  data: () => {
    return {
      vendor: {},
      products: [],
      appErrors: [],
      product: {},
      user: {},
      order: {}
    };
  },
  methods: {
    sendForm: function() {
      if (this.isFormCompleted()) {
      ChoiceProvider.post(this.user, this.order, this.product);
      }
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
    OrderProvider.getActive()
      .then(result => {
        this.order = result;
        this.vendor = result.vendor;
        ProductProvider.getAllActiveByVendor(this.vendor.id)
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
