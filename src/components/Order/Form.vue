<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <form class="box" novalidate>
        <b-field
          label="Vendor"
          :type="{ 'is-danger': errors.has('vendorId') }"
          :message="errors.first('vendorId')"
        >
          <b-select
            v-model="order.vendorId"
            v-validate="'required'"
            placeholder="Select a vendor"
            required
            name="vendorId"
            @input="loadProducts()"
          >
            <option
              v-for="(vendor, key) in vendors"
              :key="key"
              :value="vendor.id"
            >
              {{ vendor.name }}
            </option>
          </b-select>
        </b-field>

        <ProductCheckboxList :products.sync="products"></ProductCheckboxList>

        <div class="columns">
          <b-field label="Deadline" class="column is-half">
            <b-datepicker
              v-model="order.deadlineAt"
              v-validate="'required'"
              placeholder="Click to select..."
              icon="calendar-alt"
              name="deadlineAt"
            >
            </b-datepicker>
          </b-field>
          <b-field
            label="Delivery"
            class="column is-half"
            :type="{ 'is-danger': errors.has('deliveryAt') }"
            :message="errors.first('deliveryAt')"
          >
            <b-datepicker
              v-model="order.deliveryAt"
              v-validate="'required'"
              placeholder="Click to select..."
              icon="calendar-alt"
              name="deliveryAt"
            >
              <button
                class="button is-primary"
                type="button"
                :style="{ 'margin-right': '5px' }"
                @click="order.deliveryAt = new Date()"
              >
                <b-icon icon="calendar-alt"></b-icon>
                <span>Today</span>
              </button>

              <button
                class="button is-danger"
                type="button"
                @click="order.deliveryAt = null"
              >
                <b-icon icon="times"></b-icon>
                <span>Clear</span>
              </button>
            </b-datepicker>
          </b-field>
        </div>
        <b-button
          v-if="!order.id"
          type="is-primary"
          :disabled="errors.has()"
          outline
          @click="save(`store`)"
        >
          Create
        </b-button>
        <b-button
          v-if="order.id"
          type="is-primary"
          :disabled="errors.has()"
          outline
          @click="save(`update`)"
        >
          Save
        </b-button>
      </form>
    </div>
  </div>
</template>

<script>
import { OrderService } from '@/services/order.service';
import { ProductService } from '@/services/product.service';
import { VendorService } from '@/services/vendor.service';
import ProductCheckboxList from '@/components/Product/CheckboxList';
export default {
  components: { ProductCheckboxList },
  props: {
    order: {
      type: Object,
      required: false,
      default: () => ({
        vendorId: null,
        userId: null,
        deadlineAt: null,
        deliveryAt: null,
      }),
    },
  },
  data() {
    return {
      vendors: {},
      products: [],
      service: new OrderService(),
      vendorService: new VendorService(),
      productService: new ProductService(),
    };
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  watch: {
    user: function() {
      if (this.order.id === undefined) {
        this.order.userId = this.user.id;
      }
    },
  },
  async created() {
    this.vendors = await this.vendorService.getAll();
  },
  methods: {
    save: async function(type) {
      var isValid = await this.$validator.validateAll();
      this.sendProducts();
      if (isValid && !this.errors.any()) {
        this.order.userId = this.user.id;

        this.service[type](this.order).then(() => {
          this.$router.push('/orders');
        });
      }
    },
    loadProducts: async function() {
      this.products = await this.productService.getAll(this.order.vendorId);
    },

    sendProducts: function() {
      if (this.products.length) {
        this.products.map(async product => {
          // product.active = Number(
          //   this.checkedProducts.indexOf(product.id) !== -1,
          // );
          // await this.productService.update(product);
          // return product;
        });
      }
    },
  },
};
</script>
