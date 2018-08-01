<template>
  <div class="container">
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Edit vendor</h1>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-sm-12">
          <VendorForm :Vendor="Vendor"></VendorForm>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import VendorProvider from "@/provider/vendor.provider";
  import VendorForm from "@/components/Vendor/Form";
  
  export default {
    data() {
      return {
        Vendor: {
          name: null,
          url: null
        }
      };
    },
    beforeCreate() {
      VendorProvider.find(this.$route.params.id)
        .then(vendor => {
          this.Vendor = vendor;
          console.log(vendor)
        })
        .catch(errors => {
          console.log(errors);
        });
    },
    components: {
      VendorForm
    }
  };
</script>

<style lang="scss" scoped>
  
</style>
