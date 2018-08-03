<template>
  <ul v-if="products" class="list-group list-group-flush">
    <li v-for="(product,key) in products" v-bind:key="key" class="list-group-item">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" :name="`product-${key}`" :id="`product-${key}`" :value="product.id" :checked="product.active" v-model="checkedProducts" @change="onChange()">
        <label class="form-check-label" :for="`product-${key}`">{{ product.name }}</label>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      products: {
        required: true
      },
      checkedProducts: {
        required: true,
        default: () => ([]),
      }
    },
   
    methods: {
      onChange: function() {
        this.$emit("productsSelected", this.checkedProducts);
      }
    },
  

  };
</script>