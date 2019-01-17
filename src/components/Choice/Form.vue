<template>
    <form class="needs-validation">

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
                                <div>{{ order.deadlineAt | moment }}</div>
                            </div>
                            <div class="col-sm-4">
                                <label>Delivery</label>
                                <div>{{ order.deliveryAt | moment }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group custom-control w-100">
                        <label for="name">User</label>
                        <UserAutoComplete :user.sync="choice.user" v-if="!choice.id"></UserAutoComplete>
                        <div v-if="choice.id">{{ choice.user.firstName }} {{ choice.user.lastName }} ({{ choice.user.email }})</div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group custom-control">
                        <label for="name">Product</label>
                        <select v-model="choice.productId" v-validate="'required'" name="product"
                                @change="loadProducts()" class="custom-select w-100">
                            <option :value="null" disabled>Select Product</option>
                            <option v-for="(product,key) in products" :key="key" :value="product.id">
                                {{ product.name }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="name">Comment</label>
                    <textarea class="form-control border-warning" rows="4" v-model="choice.orderComment"></textarea>
                </div>
            </div>
        </div>

        <button v-if="!choice.id" type="button" class="btn btn-warning col-white" :disabled="errors.has()"
                @click="update">Create
        </button>
        <button v-if="choice.id" type="button" class="btn btn-warning col-white" :disabled="errors.has()"
                @click="update">Save
        </button>
    </form>
</template>

<script>
import UserAutoComplete from "@/components/User/AutoComplete";
import OrderService from "@/services/order.service";
import ChoiceProvider from "@/provider/choice.provider";
import ProductService from "@/services/product.service";
import VendorProvider from "@/provider/vendor.provider";

    export default {
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
            }
        },
        data() {
            return {
                products: null,
                vendorName: null,
                order: {
                    type: Object,
                    required: false,
                    default: () => ({
                        vendorId: null,
                        userId: null,
                        deadlineAt: null,
                        deliveryAt: null
                    }),
                },
                selectedProduct: null,
                productId: null,
                user: {
                    type: Object,
                    required: false,
                    default: () => ({
                        id: null,
                        firstName: null,
                        lastName: null,
                        email: null,
                    }),
                }
            };
        },
        beforeCreate() {

            OrderService.find(this.$route.params.orderId)
                .then(order => {
                    this.order = order;

                    new VendorProvider().find(this.order.vendorId)
                        .then(vendor => {
                            this.vendorName = vendor.name;
                        })
                        .catch(errors => {
                            console.log(errors);
                        });

                    ProductService.getAll(this.order.vendorId)
                        .then(products => {
                            this.products = products;
                        })
                        .catch(errors => {
                            console.log(errors);
                        });
                })
                .catch(errors => {
                    console.log(errors);
                });

        },
        created() {
            this.choice.orderId = this.$route.params.orderId;
        },
        methods: {

            update: async function()
            {
                let isValid = await this.$validator.validateAll();

                if (isValid && !this.errors.any()) {

                    let updatedProduct = this.selectedProduct ? this.selectedProduct : this.choice.product;

                    new ChoiceProvider().store(
                        this.choice.user,
                        this.order,
                        updatedProduct,
                        this.choice.orderComment
                    )
                        .then(choice => {
                            console.log('success!');
                            console.log(choice);
                            this.alertText = 'Your choice was saved!';
                            this.alertClass = 'alert alert-success';
                        })
                        .catch(errors => {
                            console.log('error');
                            console.log(errors);
                            this.alertText = 'Something went wrong!';
                            this.alertClass = 'alert alert-danger';
                        });
                }

                console.log(isValid);
                console.log(this.errors.any());
            },

            loadProducts: function () {
                let $this = this;
                let filtered = this.products.filter(function(product){
                    if (product.id === $this.choice.productId) return product;
                });

                if(filtered.length > 0) {
                    this.selectedProduct = filtered[0];
                }
            },

        },
        components: {
            UserAutoComplete
        }
    };
</script>
