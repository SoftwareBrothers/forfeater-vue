<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <form class="box">
        <b-field
          label="Name"
          :type="{ 'is-danger': errors.has('name') }"
          :message="errors.first('name')"
        >
          <b-input
            v-model="product.name"
            v-validate="'required|min:3'"
            name="name"
          ></b-input>
        </b-field>
        <div>
          <b>Require description</b>
        </div>
        <b-field
          :type="{ 'is-danger': errors.has('desc') }"
          :message="errors.first('desc')"
        >
          <b-radio-button
            v-model="description"
            native-value="false"
            type="is-danger"
            name="desc"
          >
            <b-icon icon="times"></b-icon>
            <span>No</span>
          </b-radio-button>

          <b-radio-button
            v-model="description"
            native-value="true"
            type="is-success"
            name="desc"
          >
            <b-icon icon="check"></b-icon>
            <span>Yes</span>
          </b-radio-button>
        </b-field>
        <div>
          <b>Diet</b>
        </div>
        <b-field
          :type="{ 'is-danger': errors.has('diet') }"
          :message="errors.first('diet')"
        >
          <b-radio-button
            v-model="diet"
            native-value="meat"
            type="is-danger"
            name="diet"
          >
            <span>🥩 Meat</span>
          </b-radio-button>

          <b-radio-button
            v-model="diet"
            native-value="vege"
            type="is-warning"
            name="diet"
          >
            <span>🥚 Vege</span>
          </b-radio-button>
          <b-radio-button
            v-model="diet"
            v-validate="'required'"
            native-value="vegan"
            type="is-success"
            name="diet"
          >
            <span>🥦 Vegan</span>
          </b-radio-button>
        </b-field>
        <b-button
          v-if="!product.id"
          type="is-primary"
          :disabled="errors.has()"
          outline
          @click="save(`store`)"
        >
          Create
        </b-button>
        <b-button
          v-if="product.id"
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
import { ProductService } from '@/services/product.service';

export default {
  props: {
    product: {
      type: Object,
      required: false,
      default: () => ({
        vendor: null,
        name: null,
        isVege: false,
        isVegan: false,
        requireDescription: null,
      }),
    },
  },
  data() {
    return {
      diet: null,
      description: null,
      service: new ProductService(),
    };
  },
  watch: {
    diet(value) {
      switch (value) {
        case 'vegan':
          this.product.isVegan = true;
          this.product.isVege = true;
          break;
        case 'vege':
          this.product.isVegan = false;
          this.product.isVege = true;
          break;
        default:
          this.product.isVegan = false;
          this.product.isVege = false;
          break;
      }
    },
    description(value) {
      this.product.requireDescription = value === 'true' ? true : false;
    },
    'product.isVege': function() {
      this.diet = this.getDiet(this.product.isVege, this.product.isVegan);
    },
    'product.requireDescription': function() {
      this.description = `${this.product.requireDescription}`;
    },
  },
  mounted() {
    this.vendorId = +this.$route.params.vendorId;
  },
  methods: {
    async save(type) {
      if (!this.errors.any()) {
        this.product.requireDescription = !!this.product.requireDescription;
        await this.service[type](this.vendorId, this.product);
        this.$router.push('/vendors/' + this.vendorId + '/products');
      }
    },
    getDiet(vege, vegan) {
      switch (true) {
        case (vege && vegan) || vegan:
          return 'vegan';
        case vege && !vegan:
          return 'vege';
        default:
          return this.product.id ? 'meat' : null;
      }
    },
  },
};
</script>
<style scoped></style>
