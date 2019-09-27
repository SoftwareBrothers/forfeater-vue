<template>
  <form>
    <div class="row">
      <div class="col-sm-6">
        <div class="form-row">
          <div class="form-group custom-control w-100">
            <div class="row">
              <div class="col-sm-4">
                <label>Vendor</label>
                <div v-if="vendorName">{{ vendorName }}</div>
              </div>
              <div class="col-sm-4">
                <label>Deadline</label>
                <div>{{ order.deadlineAt | formatDate }}</div>
              </div>
              <div class="col-sm-4">
                <label>Delivery</label>
                <div>{{ order.deliveryAt | formatDate }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group custom-control w-100">
            <label for="name">User</label>
            <UserAutoComplete
              v-if="!choice.id"
              :user.sync="choice.user"
            ></UserAutoComplete>
            <div v-if="choice.id">
              {{ choice.user.firstName }} {{ choice.user.lastName }} ({{
                choice.user.email
              }})
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group custom-control">
            <label for="name">Product</label>
            <select
              v-model="choice.productId"
              v-validate="'required'"
              name="product"
              class="custom-select w-100"
              @change="loadProducts()"
            >
              <option :value="null" disabled>Select Product</option>
              <option
                v-for="(product, key) in products"
                :key="key"
                :value="product.id"
                >{{ product.name }}</option
              >
            </select>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <label for="name">Comment</label>
          <textarea
            v-model="choice.orderComment"
            class="form-control border-warning"
            rows="4"
          ></textarea>
        </div>
      </div>
    </div>

    <button
      v-if="!choice.id"
      type="button"
      class="btn btn-warning col-white"
      :disabled="errors.has()"
      @click="update"
    >
      Create
    </button>
    <button
      v-if="choice.id"
      type="button"
      class="btn btn-warning col-white"
      :disabled="errors.has()"
      @click="update"
    >
      Save
    </button>
  </form>
</template>

<script>
import UserAutoComplete from '@/components/User/AutoComplete';
import { OrderService } from '@/services/order.service';
import { ProductService } from '@/services/product.service';
import { ChoiceService } from '@/services/choice.service';

export default {
  components: {
    UserAutoComplete,
  },
  props: {
    choice: {
      type: Object,
      required: false,
      default: () => ({
        orderId: null,
        userId: null,
        productId: null,
        orderComment: '',
      }),
    },
  },
  data() {
    return {
      products: null,
      vendorName: null,
      order: {
        vendorId: null,
        userId: null,
        deadlineAt: null,
        deliveryAt: null,
      },
      selectedProduct: null,
      user: {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
      },
      service: new ChoiceService(),
      orderService: new OrderService(),
      productService: new ProductService(),
    };
  },
  async created() {
    this.order = await this.orderService.find(this.$route.params.orderId);
    this.products = await this.productService.getAll(this.order.vendorId);
    this.choice.orderId = this.$route.params.orderId;
  },
  methods: {
    update: async function() {
      let isValid = await this.$validator.validateAll();

      if (isValid && !this.errors.any()) {
        let updatedProduct = this.selectedProduct
          ? this.selectedProduct
          : this.choice.product;

        await this.service.store(
          this.choice.user,
          this.order,
          updatedProduct,
          this.choice.orderComment,
        );
      }
    },

    loadProducts: function() {
      let $this = this;
      let filtered = this.products.filter(product => {
        if (product.id === $this.choice.productId) {
          return product;
        }
      });

      if (filtered.length > 0) {
        this.selectedProduct = filtered[0];
      }
    },
  },
};
</script>
