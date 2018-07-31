<template>
  <div class="container">
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Vendor list</h1>
      </div>
    </div>
    <VendorTable :vendors="vendors"></VendorTable>
  </div>
</template>

<script>
  import VendorProvider from "@/provider/vendor.provider";
  import VendorTable from "@/components/Vendor/Table";
  
  export default {
    data() {
      return {
        vendors: {}
      };
    },
    created() {
      VendorProvider.getAll()
        .then(vendors => {
          this.vendors = vendors;
        })
        .catch(errors => {
          console.log(errors);
        });
    },
    components: {
      VendorTable
    }
  };
</script>

<style lang="scss" scoped>
</style>
