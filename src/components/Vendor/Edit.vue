<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'Home' }">Home</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'VendorList' }">Vendors</router-link>
        </li>
        <li class="breadcrumb-item active">{{ Vendor.name }}</li>
        <li class="breadcrumb-item active" aria-current="page">Edit</li>
      </ol>
    </nav>
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
import { VendorService } from '@/services/vendor.service';
import VendorForm from '@/components/Vendor/Form';

export default {
  data() {
    return {
      Vendor: {
        name: null,
        url: null
      },
      service: new VendorService()
    };
  },
  async mounted() {
    try {
      const response = await this.service.find(this.$route.params.id);
      this.Vendor = response.data;
    } catch (error) {}
  },
  components: {
    VendorForm
  }
};
</script>
