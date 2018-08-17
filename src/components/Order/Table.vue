<template>
    <div v-if="orders">
        <div class="row">
            <div class="col-sm"></div>
            <div class="col-sm-12">
                <router-link class="nav-link d-inline" :to="{ name: 'OrderCreate' }">Create order</router-link>
                <div class="table-responsive">
                    <table class="table table-sm table-hover table-bordered table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Vendor</th>
                                <th scope="col">Creator</th>
                                <th scope="col">Deadline</th>
                                <th scope="col">Delivery</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody v-if="orders">
                            <tr v-for="(order, key) in orders" v-bind:key="key">
                                <th scope="row">{{ order.id }}</th>
                                <td>{{ order.vendor.name }}</td>
                                <td>{{ order.user.firstName }} {{ order.user.lastName }}</td>
                                <td>{{ order.deadlineAt | moment }}</td>
                                <td>{{ order.deliveryAt | moment }}</td>
                                <td>
                                    <router-link class="btn-action d-inline text-warning" :to="{ name: 'ChoiceList', params: { orderId: order.id } }">
                                        <font-awesome-icon icon="list" />
                                    </router-link>
                                    <router-link class="btn-action d-inline" :to="{ name: 'OrderEdit', params: { id: order.id } }">
                                        <font-awesome-icon icon="edit" />
                                    </router-link>
                                    <a class="btn-action d-inline text-danger" href="" @click="remove(order.id, key, $event)">
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
    import OrderService from "@/services/order.service";
    var moment = require('moment');
    
    export default {
        props: {
            orders: {
                required: true
            }
        },
        methods: {
            remove: function(orderId, key, event) {
                OrderService.remove(orderId)
                    .then(orders => {
                        this.orders.splice(key, 1);
                    })
                    .catch(errors => {
                        console.log(errors);
                    });
            }
        },
        filters: {

        }
    }
</script>

<style lang="scss" scoped>
</style>
