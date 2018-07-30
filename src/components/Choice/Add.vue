<template>
  <div class="container">
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
        <h2 class="text-center" v-if="restautrant">{{restautrant.name}}</h2>
      </div>
      <div class="col-sm"></div>
    </div>
    <div v-if="restautrant.products">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm-10">
          <div class="form-group">
  
            <ul v-if="restautrant.products" class="list-group list-group-flush">
              <li v-for="(product,key) in restautrant.products" v-bind:key="key" class="list-group-item">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="product" :id="`product-${key}`" :value="`${product.id}`">
                  <label class="form-check-label" :for="`product-${key}`">
                        {{ product.name }}
                    </label>
                </div>
              </li>
            </ul>
          </div>
          <div class="form-group">
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
  import VendorProvider from "@/provider/vendor.provider";
  
  export default {
    name: 'ChoiceAdd',
    data() {
      return {
        restautrant: {},
        errors: []
      };
    },
    created() {
      VendorProvider.getTodayVendor()
        .then(vendor => {
          this.restautrant = vendor;
        })
        .catch(errors => {
          console.log(errors);
        });
    }
  };
</script>

<style lang="scss" scoped>
  
</style>
