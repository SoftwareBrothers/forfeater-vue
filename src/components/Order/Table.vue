<template>
  <div v-if="orders">
    <div class="columns is-mobile is-centered">
      <div class="column">
        <b-button
          class="is-pulled-right	"
          tag="router-link"
          :to="{ name: 'OrderCreate' }"
          type="is-primary"
        >
          Create order
        </b-button>
      </div>
    </div>
    <div v-if="orders.length" class="columns">
      <div class="column">
        <v-client-table
          :data="orders"
          :columns="[
            'id',
            'vendor',
            'my_choice',
            'deadline',
            'delivery',
            'creator',
            'actions',
          ]"
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
    <!-- <table class="table table-sm table-hover table-bordered table-striped">

      <tbody v-if="orders">
        <tr
          v-for="(order, key) in orders"
          :key="key"
          :class="{ 'no-active': !isActive(order) }"
        >
          <th scope="row">{{ order.id }}</th>
          <td>{{ order.vendor.name }}</td>
          <td>
            {{ order.choice.product ? order.choice.product.name : '' }}
          </td>
          <td>{{ order.deadlineAt | formatDate }}</td>
          <td>{{ order.deliveryAt | formatDate }}</td>
          <td>{{ order.user.firstName }} {{ order.user.lastName }}</td>
          <td>
            <router-link
              class="btn-action d-inline text-warning"
              :to="{ name: 'ChoiceList', params: { orderId: order.id } }"
            >
              <font-awesome-icon icon="list" />
            </router-link>
            <router-link
              v-if="order.choice.product"
              class="btn-action d-inline"
              :to="{ name: 'ChoiceScore', params: { id: order.id } }"
            >
              <font-awesome-icon icon="comment" />
            </router-link>
            <router-link
              v-if="user && user.role == 'admin'"
              class="btn-action d-inline"
              :to="{ name: 'OrderEdit', params: { id: order.id } }"
            >
              <font-awesome-icon icon="edit" />
            </router-link>
            <router-link
              v-if="user && user.role == 'admin'"
              class="btn-action d-inline text-warning"
              :to="{
                name: 'ChoiceCreate',
                params: { orderId: order.id },
              }"
            >
              <font-awesome-icon icon="plus" />
            </router-link>
            <a
              v-if="user && user.role == 'admin'"
              class="btn-action d-inline text-danger"
              href
              @click="remove(order.id, key, $event)"
            >
              <font-awesome-icon icon="trash" />
            </a>
          </td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>

<script>
import { OrderService } from '@/services/order.service';

export default {
  props: {
    orders: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      service: new OrderService(),
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    remove: function(orderId, key) {
      this.service.remove(orderId).then(() => {
        this.orders.splice(key, 1);
      });
    },
    isActive(order) {
      return new Date(order.deadlineAt).getTime() > new Date().getTime();
    },
  },
};
</script>
