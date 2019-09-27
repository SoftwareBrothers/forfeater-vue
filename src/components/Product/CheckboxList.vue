<template>
  <ul v-if="products" class="list-group list-group-flush">
    <li v-for="(product, key) in products" :key="key" class="list-group-item">
      <div class="form-check">
        <input
          :id="`product-${key}`"
          v-model="checkedProducts"
          class="form-check-input"
          type="checkbox"
          :name="`product-${key}`"
          :value="product.id"
          :checked="product.active"
          @change="onChange()"
        />
        <label class="form-check-label" :for="`product-${key}`">{{
          product.name
        }}</label>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    products: {
      required: true,
      type: Array,
    },
    checkedProducts: {
      required: true,
      type: Array,
      default: () => [],
    },
  },

  methods: {
    onChange: function() {
      this.$emit('productsSelected', this.checkedProducts);
    },
  },
};
</script>
