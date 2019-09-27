<template>
  <VendorForm :vendor="Vendor"></VendorForm>
</template>

<script>
import { VendorService } from '@/services/vendor.service';
import VendorForm from '@/components/Vendor/Form';

export default {
  components: { VendorForm },
  data() {
    return {
      Vendor: {
        name: null,
        url: null,
      },
      service: new VendorService(),
    };
  },
  async mounted() {
    this.Vendor = await this.service.find(this.$route.params.id);
  },
};
</script>
