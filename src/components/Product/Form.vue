<template>
  <form class="needs-validation" novalidate>
    <div class="form-group custom-control">
      <label for="name">Name</label>
      <input v-validate="'required'" v-model="Product.name" type="text" class="form-control" name="name" placeholder="name">
      <div class="invalid-feedback-not-work">{{ errors.first('name')}}</div>
    </div>
    <div class="form-group custom-control">
      <label for="name">Active</label>
      <div class="form-check">
        <input v-model="Product.active" class="form-check-input" type="radio" name="active" id="active1" value="1" checked>
        <label class="form-check-label" for="active1">Yes</label>
      </div>
      <div class="form-check">
        <input v-model="Product.active" class="form-check-input" type="radio" name="active" id="active0" value="0">
        <label class="form-check-label" for="active0">No</label>
      </div>
      <div class="invalid-feedback-not-work">{{ errors.first('active')}}</div>
    </div>
    <button v-if="!Product.id" type="button" class="btn btn-warning col-white" :disabled="errors.has()" @click="create">Create</button>
    <button v-if="Product.id" type="button" class="btn btn-warning col-white" :disabled="errors.has()" @click="edit">Save</button>
  </form>
</template>

<script>
import ProductService from "@/services/product.service";

export default {
  props: {
    Product: {
      type: Object,
      required: false,
      default: () => ({
        vendorId: null,
        name: null,
        active: null
      })
    }
  },
  created() {
    this.Product.vendorId = this.$route.params.vendorId;
  },
  methods: {
    create: function() {
      if (!this.errors.any()) {
        ProductService.store(this.Product)
          .then(product => {
            this.$router.push("/vendors/" + product.vendorId + "/products");
          })
          .catch(errors => {
            this.errors.push(errors);
          });
      }
    },
    edit: function() {
      if (!this.errors.any()) {
        ProductService.update(this.Product)
          .then(product => {
            this.$router.push("/vendors/" + product.vendorId + "/products");
          })
          .catch(errors => {
            this.errors.push(errors);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
