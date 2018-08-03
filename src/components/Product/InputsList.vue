<template>
  <div>
    <div v-for="(product,key) in products" v-bind:key="key" class="custom-control custom-radio">
      <input name="product" :id="`product-${product.id}`" :value="`${product.id}`" @input="onSelect(product)" type="radio" class="custom-control-input">
      <label class="custom-control-label" :for="`product-${product.id}`">{{ product.name }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      required: true
    }
  },
  methods: {
    onSelect: function(product) {
      this.$emit("productSelected", product);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>