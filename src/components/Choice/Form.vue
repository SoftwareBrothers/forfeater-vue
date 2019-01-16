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
                        <UserAutoComplete :user.sync="choice.user"></UserAutoComplete>
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
                    this.loadProducts();

                    new VendorProvider().find(this.order.vendorId)
                        .then(vendor => {
                            this.vendorName = vendor.name;
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
            console.log('product!');
          console.log('created');
          console.log(this.choice.product);
          //   this.selectedProduct = this.choice.product;
        },
        methods: {

            update: async function()
            {
                let isValid = await this.$validator.validateAll();

                if (isValid && !this.errors.any()) {

                    new ChoiceProvider().store(
                        this.choice.user,
                        this.order,
                        this.selectedProduct,
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
                ProductService.getAll(this.order.vendorId)
                    .then(products => {
                        this.products = products;
                    })
                    .catch(errors => {
                        console.log(errors);
                    });
            },

            // product: (product) => {
            //     return `${user.firstName} ${user.lastName} (${user.email})`;
            // }
        },
        watch: {
            selectedProduct: function (productId) {

                console.log(productId);
                this.selectedProduct = this.products
                    .filter(product => {
                        return product.id === productId;
                    });
            },
            // choice.productId: function (productId) {
            //
            //     console.log(productId)
            //     this.selectedProduct = this.products
            //         .filter(product => {
            //             return product.id === productId;
            //         });
            // }
        },
        components: {
            UserAutoComplete
        }
    };
</script>
