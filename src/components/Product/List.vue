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
        <li class="breadcrumb-item active">
          <router-link :to="{ name: 'ProductList', params: { vendorId: this.$route.params.vendorId } }">Products</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Edit</li>
      </ol>
    </nav>
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Product list</h1>
      </div>
    </div>
    <ProductTable :products="products"></ProductTable>
  </div>
</template>

<script>
import { ProductService } from '@/services/product.service';
import ProductTable from '@/components/Product/Table';

export default {
  data() {
    return {
      products: [],
      service: new ProductService()
    };
  },
  async created() {
    this.products = await this.service.getAll(this.$route.params.vendorId);
  },
  components: { ProductTable }
};
</script>
