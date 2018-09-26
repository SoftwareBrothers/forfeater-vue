<template>
    <div v-if="orders">
        <div class="row">
            <div class="col-sm-12">
                <router-link class="nav-link btn btn-warning btn-custom col-white" :to="{ name: 'OrderCreate' }">Create order</router-link>
                <div class="table-responsive">
                    <table class="table table-sm table-hover table-bordered table-striped">
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
                            <tr v-for="(order, key) in orders" v-bind:key="key" :class="{'no-active' : !isActive(order)}">
                                <th scope="row">{{ order.id }}</th>
                                <td>{{ order.vendor.name }}</td> 
                                <td>{{ order.choice.product ? order.choice.product.name : '' }}</td>                     
                                <td>{{ order.deadlineAt | moment }}</td>
                                <td>{{ order.deliveryAt | moment }}</td>
                                <td>{{ order.user.firstName }} {{ order.user.lastName }}</td>
                                <td>
                                    <router-link class="btn-action d-inline text-warning" :to="{ name: 'ChoiceList', params: { orderId: order.id } }">
                                        <font-awesome-icon icon="list" />
                                    </router-link>
                                    <router-link v-if="order.choice.product" class="btn-action d-inline" :to="{ name: 'ChoiceScore', params: { id: order.id } }">
                                        <font-awesome-icon icon="comment" />
                                    </router-link>
                                    <router-link v-if="user && user.role == 'admin'" class="btn-action d-inline" :to="{ name: 'OrderEdit', params: { id: order.id } }">
                                        <font-awesome-icon icon="edit" />
                                    </router-link>
                                    <a v-if="user && user.role == 'admin'" class="btn-action d-inline text-danger" href="" @click="remove(order.id, key, $event)">
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
            },
            isActive(order) {
                return new Date(order.deadlineAt).getTime() > new Date().getTime();
            }
        },
        computed: {
            user() {
                return this.$store.getters.user;
            }
        },
        filters: {
    
        }
    }
</script>

<style lang="scss" scoped>
    .no-active {
        color: red;
        opacity: 0.5;
    }
</style>
