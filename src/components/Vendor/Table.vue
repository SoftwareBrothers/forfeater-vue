<template>
  <div v-if="vendors">
    <div class="columns is-mobile is-centered">
      <div class="column">
        <b-button
          class="is-pulled-right	"
          tag="router-link"
          :to="{ name: 'VendorCreate' }"
          type="is-primary"
        >
          Create vendor
        </b-button>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <v-client-table
          :data="vendors"
          :columns="['id', 'name', 'url', 'actions']"
        >
          <template slot="name" slot-scope="props">
            <router-link
              :to="{
                name: 'ProductList',
                params: { vendorId: props.row.id },
              }"
            >
              {{ props.row.name }}
            </router-link>
          </template>
          <template slot="actions" slot-scope="props">
            <div class="buttons">
              <b-button
                class="is-pulled-right	"
                tag="router-link"
                :to="{ name: 'VendorEdit', params: { id: props.row.id } }"
                type="is-warning"
                icon-left="edit"
                size="is-small"
                outlined
              />
              <b-button
                class="is-pulled-right	"
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
import { VendorService } from '@/services/vendor.service';

export default {
  props: {
    vendors: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      service: new VendorService(),
    };
  },
  methods: {
    remove(vendorId, key) {
      this.service.remove(vendorId).then(() => {
        this.vendors.splice(key - 1, 1);
        this.$emit('vendors.update', this.vendors);
      });
    },
  },
};
</script>
