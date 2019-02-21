<template>
  <div v-if="products">
    <div v-for="(product, key) in products" v-bind:key="key" class="custom-control custom-radio product-input-list">
      <input
        name="product"
        :id="`product-${product.id}`"
        :value="`${product.id}`"
        @change="onSelect(product)"
        type="radio"
        class="custom-control-input"
        :checked="isChecked(product)"
      />
      <label class="custom-control-label" :for="`product-${product.id}`">{{ product.name }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      required: true
    },
    choice: {
      required: true
    }
  },
  methods: {
    onSelect: function(product) {
      const order = JSON.parse(JSON.stringify(this.order));
      this.$emit('update:choice', Object.assign(this.choice, { product, order }));
    },
    isChecked(product) {
      return this.order.choice.product && this.order.choice.product.id === product.id;
    }
  },
  computed: {
    products() {
      return this.order.vendor.products;
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
