<template>
  <div>
    <div v-for="(product, key) in products" v-bind:key="key" class="custom-control custom-radio product-input-list">
      <input
        name="product"
        :id="`product-${product.id}`"
        :value="`${product.id}`"
        @change="onSelect(product)"
        type="radio"
        class="custom-control-input"
      />
      <label class="custom-control-label" :for="`product-${product.id}`">{{ product.name }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      required: true
    },
    order: {
      required: true
    }
  },
  methods: {
    onSelect: function(product) {
      this.$emit('productSelected', product, this.order);
    }
  }
};
</script>

<style lang="scss" scoped>
.product-input-list {
  word-wrap: break-word;
  overflow: auto;
}
</style>
