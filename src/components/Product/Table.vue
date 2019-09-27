<template>
  <div v-if="products">
    <div class="columns is-mobile is-centered">
      <div class="column">
        <b-button
          class="is-pulled-right	"
          tag="router-link"
          :to="{ name: 'ProductCreate' }"
          type="is-primary"
        >
          Create product
        </b-button>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <v-client-table :data="products" :columns="['id', 'name', 'actions']">
          <template slot="name" slot-scope="props">
            <router-link
              :to="{
                name: 'ProductShow',
                params: { vendorId, id: props.row.id },
              }"
            >
              {{ props.row.name }}
            </router-link>
          </template>
          <template slot="actions" slot-scope="props">
            <div class="buttons">
              <b-button
                class="is-pulled-right"
                tag="router-link"
                :to="{
                  name: 'ProductEdit',
                  params: { vendorId, id: props.row.id },
                }"
                type="is-warning"
                icon-left="edit"
                size="is-small"
                outlined
              />
              <b-button
                class="is-pulled-right"
                type="is-danger"
                icon-left="trash"
                outlined
                size="is-small"
                @click="remove(props.row.id, props.index)"
              />
            </div>
          </template>
        </v-client-table>
      </div>
    </div>
  </div>
</template>

<script>
import { ProductService } from '@/services/product.service';

export default {
  props: {
    products: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      service: new ProductService(),
    };
  },
  created() {
    this.vendorId = +this.$route.params.vendorId;
  },
  methods: {
    remove: async function(productId, key) {
      await this.service.remove(this.vendorId, productId);
      this.products.splice(key, 1);
    },
  },
};
</script>
