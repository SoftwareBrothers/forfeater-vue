<template>
  <div v-if="orders">
    <div class="row">
      <div class="col-sm-12">
        <router-link
          class="nav-link btn btn-warning btn-custom col-white"
          :to="{ name: 'OrderCreate' }"
          >Create order</router-link
        >
        <div class="table-responsive">
          <table
            class="table table-sm table-hover table-bordered table-striped"
          >
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Vendor</th>
                <th scope="col">My choice</th>
                <th scope="col">Deadline</th>
                <th scope="col">Delivery</th>
                <th scope="col">Creator</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
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
          </table>
        </div>
      </div>
      <div class="col-sm"></div>
    </div>
  </div>
</template>

<script>
import { OrderService } from '@/services/order.service';

export default {
  props: {
    orders: {
      required: true,
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

<style lang="scss" scoped>
.no-active {
  color: red;
  opacity: 0.5;
}
</style>
