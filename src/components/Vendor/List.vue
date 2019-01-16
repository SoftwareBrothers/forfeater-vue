<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{ name: 'Home' }">Home</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Vendors</li>
      </ol>
    </nav>
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
    new VendorProvider()
      .getAll()
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
