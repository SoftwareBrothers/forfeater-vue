<template>
  <ProductForm :product="product"></ProductForm>
</template>

<script>
import { ProductService } from '@/services/product.service';
import ProductForm from '@/components/Product/Form';

export default {
  components: { ProductForm },
  data() {
    return {
      product: {},
      service: new ProductService(),
    };
  },
  async created() {
    this.product = await this.service.find(
      +this.$route.params.vendorId,
      this.$route.params.id,
    );
  },
};
</script>
