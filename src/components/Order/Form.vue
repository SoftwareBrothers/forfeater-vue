<template>
  <form class="needs-validation">
    <div class="form-row">
      <div class="form-group col-md-12 custom-control">
        <label for="name">Vendor</label>
        <select
          v-model="Order.vendorId"
          v-validate="'required'"
          name="vendorId"
          @change="loadProducts()"
          class="custom-select"
        >
          <option :value="null" disabled>Select Vendor</option>
          <option v-for="(vendor,key) in vendors" :key="key" :value="vendor.id">{{ vendor.name }}</option>
        </select>
        <div class="invalid-feedback-not-work">{{ errors.first('vendorId')}}</div>
        <ProductCheckboxList
          :products="products"
          :checkedProducts="checkedProducts"
          @productsSelected="productsSelected"
        ></ProductCheckboxList>
        <input type="hidden" v-validate:length="'min_value:1'" name="checkedProducts">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6 custom-control">
        <label for="name">Deadline</label>
        <div>
          <flat-pickr
            v-model="Order.deadlineAt"
            v-validate="'required'"
            :config="config"
            class="form-control"
            placeholder="Select date"
            name="deadlineAt"
            ref="deadlineAt"
          ></flat-pickr>
        </div>
        <div class="invalid-feedback-not-work">{{ errors.first('deadlineAt')}}</div>
      </div>
      <div class="form-group col-md-6">
        <label for="name">Delivery</label>
        <div>
          <flat-pickr
            v-model="Order.deliveryAt"
            :config="config"
            class="form-control"
            placeholder="Select date"
            name="deliveryAt"
          ></flat-pickr>
          <div class="invalid-feedback-not-work">{{ errors.first('deliveryAt')}}</div>
        </div>
      </div>
    </div>
    <button
      v-if="!Order.id"
      type="button"
      class="btn btn-warning col-white"
      :disabled="errors.has()"
      @click="save(`store`)"
    >Create</button>
    <button
      v-if="Order.id"
      type="button"
      class="btn btn-warning col-white"
      :disabled="errors.has()"
      @click="save(`update`)"
    >Save</button>
  </form>
</template>

<script>
import { OrderService } from '@/services/order.service';
import { ProductService } from '@/services/product.service';
import { VendorService } from '@/services/vendor.service';

import ProductCheckboxList from '@/components/Product/CheckboxList';
import flatPickr from 'vue-flatpickr-component';

export default {
  props: {
    products: {
      required: false
    },
    Order: {
      type: Object,
      required: false,
      default: () => ({
        vendorId: null,
        userId: null,
        deadlineAt: null,
        deliveryAt: null
      })
    }
  },
  data() {
    return {
      vendors: {},
      // products: {},
      user: null,
      checkedProducts: [],
      config: {
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: 'Y-m-d H:i',
        altInput: true,
        dateFormat: 'Z',
        enableTime: true,
        time_24hr: true
      },
      service: new OrderService(),
      vendorService: new VendorService(),
      productService: new ProductService()
    };
  },
  async created() {
    this.user = this.$store.getters.user;
    response = await this.vendorService.getAll();
    this.vendors = response.data;
  },
  methods: {
    save: async function(type) {
      var isValid = await this.$validator.validateAll();
      this.sendProducts();
      if (isValid && !this.errors.any()) {
        this.Order.userId = this.user.id;

        await this.service[type](this.Order).then(() => {
          this.$router.push('/orders');
        });
      }
    },
    loadProducts: function() {
      this.products = null;

      ProductService.getAll(this.Order.vendorId).then(products => {
        this.checkedProducts = products
          .filter(product => {
            return product.active;
          })
          .map(product => {
            return product.id;
          });

        this.products = products;
      });
    },

    productsSelected: function(productIds) {
      this.checkedProducts = productIds;
    },

    sendProducts: function() {
      for (var index in this.products) {
        var product = this.products[index];

        product.active = this.checkedProducts.indexOf(product.id) >= 0 ? 1 : 0;

        ProductService.update(product).then(product => {});
      }
    }
  },

  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  watch: {
    user: function() {
      if (this.Order.id === undefined) {
        this.Order.userId = this.user.id;
      }
    }
  },
  components: { ProductCheckboxList, flatPickr }
};
</script>
<style scoped>
@import '~flatpickr/dist/flatpickr.css';
</style>
