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
        <li class="breadcrumb-item active" aria-current="page">
          <router-link :to="{ name: 'ProductShow', params: { vendorId: this.$route.params.vendorId, productId: this.$route.params.id } }">
            {{ Product.name }}
          </router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Edit</li>
      </ol>
    </nav>
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Edit product</h1>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-sm-12">
          <ProductForm :Product="Product"></ProductForm>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ProductService } from '@/services/product.service';
import ProductForm from '@/components/Product/Form';

export default {
  data() {
    return {
      Product: {
        name: null,
        active: null
      },
      service: new ProductService()
    };
  },
  async created() {
    this.Product = await this.service.find(this.$route.params.vendorId, this.$route.params.id);
  },
  components: { ProductForm }
};
</script>
