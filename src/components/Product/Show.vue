<template>
  <div class="container">
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Product: {{ Product.name }}</h1>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-sm-6">
          <div>Name: {{ Product.name }}</div>
          <div v-if="Product.vendor">Vendor: {{ Product.vendor.name }}</div>
          <div>Rate: {{ Product.avgScore }}</div>
          <div>Votes: {{ Product.rankCount }}</div>
        </div>
        <div class="col-sm-6">
          <div v-for="(choice, key) in choices" :key="key">
            <div>
              User: {{ choice.user.firstName + ' ' + choice.user.lastName }}
            </div>
            <div>Rate: {{ choice.score }}</div>
            <div>Comment: {{ choice.scoreComment }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ProductService } from '@/services/product.service';
import { ChoiceService } from '@/services/choice.service';

export default {
  data() {
    return {
      Product: {
        name: null,
        active: null,
      },
      choices: [],
      service: new ChoiceService(),
      productService: new ProductService(),
    };
  },
  async created() {
    this.Product = await this.productService.find(
      this.$route.params.vendorId,
      this.$route.params.id,
    );
    const choices = await this.service.getFromProduct(this.Product);
    this.choices = choices.filter(item => {
      return item.score != null || item.scoreComment != null;
    });
  },
};
</script>
