<template>
  <div class="container">
    <VendorTable :vendors.sync="vendors" />
  </div>
</template>

<script>
import VendorTable from '@/components/Vendor/Table';
import { VendorService } from '@/services/vendor.service';

export default {
  components: { VendorTable },
  data() {
    return {
      vendors: [],
      service: new VendorService(),
    };
  },
  async mounted() {
    const result = await this.service.getAll();
    this.vendors = result.items;
  },
};
</script>
