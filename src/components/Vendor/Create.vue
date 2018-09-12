<template>
  <div class="container">
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Create vendor</h1>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-sm-12">
          <VendorForm></VendorForm>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import VendorForm from "@/components/Vendor/Form";
  
  export default {
    data() {
      return {};
    },
    components: {
      VendorForm
    }
  };
</script>

<style lang="scss" scoped>
  
</style>
