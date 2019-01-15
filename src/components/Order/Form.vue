<template>
  <form class="needs-validation">
    <div class="form-row">
      <div class="form-group col-md-12 custom-control">
        <label for="name">Vendor</label>
        <select v-model="Order.vendorId" v-validate="'required'" name="vendorId" @change="loadProducts()" class="custom-select">
                <option :value="null" disabled>Select Vendor</option>
                <option v-for="(vendor,key) in vendors" :key="key" :value="vendor.id">{{ vendor.name }}</option>
              </select>
        <div class="invalid-feedback-not-work">{{ errors.first('vendorId')}}</div>
        <ProductCheckboxList :products="products" :checkedProducts="checkedProducts" @productsSelected="productsSelected"></ProductCheckboxList>
        <input type="hidden" v-validate:length="'min_value:1'" name="checkedProducts">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6 custom-control">
        <label for="name">Deadline</label>
        <div>
          <flat-pickr v-model="Order.deadlineAt" v-validate="'date_format:YYYY-MM-DD HH:mm|required'" :config="config" class="form-control" placeholder="Select date" name="deadlineAt" ref="deadlineAt"></flat-pickr>
        </div>
        <div class="invalid-feedback-not-work">{{ errors.first('deadlineAt')}}</div>
      </div>
      <div class="form-group col-md-6">
        <label for="name">Delivery</label>
        <div>
          <flat-pickr v-model="Order.deliveryAt" v-validate="'date_format:YYYY-MM-DD HH:mm|after:deadlineAt'" :config="config" class="form-control" placeholder="Select date" name="deliveryAt"></flat-pickr>
          <div class="invalid-feedback-not-work">{{ errors.first('deliveryAt')}}</div>
        </div>
      </div>
    </div>
    <button v-if="!Order.id" type="button" class="btn btn-warning col-white" :disabled="errors.has()" @click="create">Create</button>
    <button v-if="Order.id" type="button" class="btn btn-warning col-white" :disabled="errors.has()" @click="edit">Save</button>
  </form>
</template>

<script>
import OrderService from "@/services/order.service";
import VendorProvider from "@/provider/vendor.provider";
import ProductService from "@/services/product.service";
import ProductCheckboxList from "@/components/Product/CheckboxList";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

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
        altFormat: "Y-m-d H:i",
        altInput: true,
        dateFormat: "Y-m-d H:i",
        enableTime: true,
        time_24hr: true
      }
    };
  },
  created() {
    this.user = this.$store.getters.user;
    new VendorProvider()
      .getAll()
      .then(vendors => {
        this.vendors = vendors;
      })
      .catch(errors => {
        console.log(errors);
      });
  },
  methods: {
    create: async function() {
      var isValid = await this.$validator.validateAll();

      this.sendProducts();

      if (isValid && !this.errors.any()) {
        this.Order.userId = this.user.id;

        OrderService.store(this.Order)
          .then(order => {
            this.$router.push("/orders");
          })
          .catch(errors => {});
      }
    },
    edit: async function() {
      var isValid = await this.$validator.validateAll();

      if (isValid && !this.errors.any()) {
        OrderService.update(this.Order)
          .then(order => {
            this.$router.push("/orders");
          })
          .catch(errors => {
            this.errors.push(errors);
          });
      }
    },

    loadProducts: function() {
      this.products = null;

      ProductService.getAll(this.Order.vendorId)
        .then(products => {
          this.checkedProducts = products
            .filter(product => {
              return product.active;
            })
            .map(product => {
              return product.id;
            });

          this.products = products;
        })
        .catch(errors => {
          console.log(errors);
        });
    },

    productsSelected: function(productIds) {
      this.checkedProducts = productIds;
    },

    sendProducts: function() {
      for (var index in this.products) {
        var product = this.products[index];

        product.active = this.checkedProducts.indexOf(product.id) >= 0 ? 1 : 0;

        ProductService.update(product)
          .then(product => {})
          .catch(errors => {
            console.log(errors);
          });
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
  components: {
    ProductCheckboxList,
    flatPickr
  }
};
</script>
