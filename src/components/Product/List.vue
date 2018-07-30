<template>
    <ul v-if="products" class="list-group list-group-flush">
        <li v-for="(product,key) in products" v-bind:key="key" class="list-group-item">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="product" :id="`product-${key}`" :value="`${product.id}`">
                <label class="form-check-label" :for="`product-${key}`">
                    {{ product.name }}
                </label>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
  props: {
      products: {
          type: Array,
          required: true,
          default: []
      }
  }
};
</script>

<style lang="scss" scoped>
</style>