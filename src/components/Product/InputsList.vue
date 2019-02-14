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
    }
  },
  methods: {
    onSelect: function(product) {
      let choice = this.order.choice || {};
      choice = Object.assign(choice, { product });
      this.$set(this.order, 'choice', choice);
      this.$emit('update:order', this.order);
    },
    isChecked(product) {
      return this.order.choice && this.order.choice.product === product;
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
