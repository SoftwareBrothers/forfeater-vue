<template>
  <form class="needs-validation" novalidate>
    <div class="form-row">
      <div class="form-group custom-control col-sm-9 col-md-10">
        <div>
          <label for="name">Name</label>
        </div>
        <input
          v-model="Product.name"
          v-validate="'required'"
          type="text"
          class="form-control"
          name="name"
          placeholder="name"
        />
        <div class="invalid-feedback-not-work">{{ errors.first('name') }}</div>
      </div>

      <div class="form-group custom-control col-sm-3 col-md-2">
        <div>
          <label for="name">Active</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            id="active1"
            v-model="Product.active"
            class="form-check-input"
            type="radio"
            name="active"
            value="1"
            checked
          />
          <label class="form-check-label" for="active1">Yes</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            id="active0"
            v-model="Product.active"
            class="form-check-input"
            type="radio"
            name="active"
            value="0"
          />
          <label class="form-check-label" for="active0">No</label>
        </div>
        <div class="invalid-feedback-not-work">
          {{ errors.first('active') }}
        </div>
      </div>
    </div>

    <button
      v-if="!Product.id"
      type="button"
      class="btn btn-warning col-white"
      :disabled="errors.has()"
      @click="save(`store`)"
    >
      Create
    </button>
    <button
      v-if="Product.id"
      type="button"
      class="btn btn-warning col-white"
      :disabled="errors.has()"
      @click="save(`update`)"
    >
      Save
    </button>
  </form>
</template>

<script>
import { ProductService } from '@/services/product.service';

export default {
  props: {
    product: {
      type: Object,
      required: false,
      default: () => ({
        vendorId: null,
        name: null,
        active: null,
      }),
    },
  },
  data() {
    return {
      service: new ProductService(),
    };
  },
  created() {
    this.Product.vendorId = this.$route.params.vendorId;
  },
  methods: {
    save: async function(type) {
      if (!this.errors.any()) {
        await this.service[type](this.Product);
        this.$router.push('/vendors/' + this.Product.vendorId + '/products');
      }
    },
  },
};
</script>
