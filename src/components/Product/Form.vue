<template>
  <form class="needs-validation" novalidate>
    <div class="form-row">
      <div class="col">
        <label class="sr-only" for="inlineFormInputGroup">Name</label>
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <div class="input-group-text">Name:</div>
          </div>
          <input
            v-validate="'required'"
            v-model="Product.name"
            type="text"
            class="form-control"
            name="name"
            placeholder="eg. pizza"
          >
          <div class="input-group-append">
            <button class="btn" :class="{'btn-danger': product.active, 'btn-success': !product.active}" type="button">Deactivate</button>
          </div>
          <div class="invalid-feedback-not-work">{{ errors.first('name')}}</div>
          <div class="invalid-feedback-not-work">{{ errors.first('active')}}</div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import ProductService from "@/services/product.service";

export default {
  props: {
    product: {
      type: {},
      required: false,
      default: () => ({
        vendorId: null,
        name: null,
        active: null
      })
    }
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
</style>
