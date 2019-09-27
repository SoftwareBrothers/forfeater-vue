<template>
  <div v-if="products">
    <div
      v-for="(product, key) in products"
      :key="key"
      class="custom-control custom-radio product-input-list"
    >
      <input
        :id="`product-${product.id}`"
        name="product"
        :value="`${product.id}`"
        type="radio"
        class="custom-control-input"
        :checked="isChecked(product)"
        @change="onSelect(product)"
      />
      <label class="custom-control-label" :for="`product-${product.id}`">{{
        product.name
      }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      required: true,
    },
    choice: {
      required: true,
    },
  },
  computed: {
    products() {
      return this.order.vendor.products;
    },
  },
  methods: {
    onSelect: function(product) {
      const order = JSON.parse(JSON.stringify(this.order));
      this.$emit(
        'update:choice',
        Object.assign(this.choice, { product, order }),
      );
    },
    isChecked(product) {
      return (
        this.order.choice.product && this.order.choice.product.id === product.id
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.product-input-list {
  word-wrap: break-word;
  overflow: auto;
}
</style>
