<template>
  <b-field
    :type="{ 'is-danger': errors.has('selected') }"
    :message="errors.first('selected')"
  >
    <b-checkbox
      v-for="(product, key) in products"
      :key="key"
      v-model="selected"
      :native-value="product.id"
      name="selected"
      @input="onChange"
    >
      {{ product.name }}
    </b-checkbox>
  </b-field>
  <!-- <ul v-if="products" class="list-group list-group-flush">
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
  </ul> -->
</template>

<script>
export default {
  props: {
    products: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      selected: [],
    };
  },
  watch: {
    selected(value) {
      value.map(el => {
        const index = this.products.findIndex(product => (product.id = el));
        this.products[index].active = 1;
      });
    },
  },
  methods: {
    onChange: function() {
      this.$emit('update:products', this.products);
    },
  },
};
</script>
