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
            <ProductsInputList :products="products" @productSelected="productSelected"></ProductsInputList>
          </div>
          <div v-if="products" class="form-group">
            <input v-validate="'required|alpha|min:6'" type="text" class="form-control" name="name" placeholder="Your name">
            <span>{{ errors.first('name')}}</span>
          </div>
        </div>
        <div class="col-sm"></div>
      </div>
      <div class="row">
        <div class="ml-auto">
          <button class="btn btn-dark" v-on:click="sendForm">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsInputList from "@/components/Product/InputsList";
import VendorProvider from "@/provider/vendor.provider";
import ProductProvider from "@/provider/product.provider";

export default {
  data: () => {
    return {
      vendor: [],
      products: [],
      appErrors: [],
      product: {}
    };
  },
  methods: {
    sendForm: function() {},
    productSelected: function(product) {
      this.product = product;
      console.log(this.product);
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
            this.errros.push(errors);
          });
      })
      .catch(errors => {
        this.errros.push(errors);
      });
  },
  components: {
    ProductsInputList
  }
};
</script>

<style lang="scss" scoped>
</style>
