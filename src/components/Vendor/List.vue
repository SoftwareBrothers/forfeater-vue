<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'Home' }">Home</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Vendors</li>
      </ol>
    </nav>
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Vendor list</h1>
      </div>
    </div>
    <VendorTable :vendors.sync="vendors"/>
  </div>
</template>

<script>
import { VendorProvider } from '@/provider/vendor.provider';
import VendorTable from '@/components/Vendor/Table';

export default {
  data() {
    return {
      vendors: {},
      provider: new VendorProvider()
    };
  },
  async mounted() {
    try {
      const response = await this.provider.getAll();
      this.vendors = response.data;
    } catch (error) {}
  },
  components: {
    VendorTable
  }
};
</script>

<style lang="scss" scoped>
</style>
