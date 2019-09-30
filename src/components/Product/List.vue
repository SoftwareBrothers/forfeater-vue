<template>
  <div class="container">
    <ProductTable :products="products"></ProductTable>
  </div>
</template>

<script>
import { ProductService } from '@/services/product.service';
import ProductTable from '@/components/Product/Table';

export default {
  components: { ProductTable },
  data() {
    return {
      products: [],
      service: new ProductService(),
    };
  },
  async created() {
    this.products = await this.service.getAll(this.$route.params.vendorId);
  },
};
</script>
