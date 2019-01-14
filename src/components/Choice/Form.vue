<template>
    <form class="needs-validation">

        <div class="row">
            <div class="col-sm-6">
                <div class="form-row">
                    <div class="form-group custom-control w-100">
                        <div class="row">
                            <div class="col-sm-4">
                                <label>Vendor</label>
                                <div v-if="vendorName">{{ this.vendorName }}</div>
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
                        <UserAutoComplete @userSelected="userSelected"></UserAutoComplete>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group custom-control">
                        <label for="name">Product</label>
                        <select v-model="selectedProduct" v-validate="'required'" name="product"
                                @change="loadProducts()" class="custom-select w-100">
                            <option :value="null" disabled>Select Product</option>
                            <option v-for="(product,key) in products" :key="key" :value="product">
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
                @click="create">Create
        </button>
        <button v-if="choice.id" type="button" class="btn btn-warning col-white" :disabled="errors.has()"
                @click="edit">Save
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
                selectedUser: null
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
            console.log(this.choice.product);
          //  this.selectedProduct = this.choice.product;
        },
        methods: {

            create: async function()
            {
                let isValid = await this.$validator.validateAll();

                if (isValid && !this.errors.any()) {

                    new ChoiceProvider().store(
                        this.selectedUser,
                        this.order,
                        this.selectedProduct,
                        this.choice.orderComment
                    )
                        .then(choice => {
                            this.alertText = 'Your choice was added!';
                            this.alertClass = 'alert alert-success';
                        })
                        .catch(errors => {
                            this.alertText = 'Something went wrong!';
                            this.alertClass = 'alert alert-danger';
                            this.appErrors.push(errors);
                        });
                }
            },

            edit: async function() {

            },

            loadProducts: function () {

                this.products = null;

                // if (this.selectedProduct) {
                //     this.choice.productId = this.selectedProduct.id;
                // }

                ProductService.getAll(this.order.vendorId)
                    .then(products => {
                        this.checkedProducts = products.map(
                            product => {
                                return product.id
                            }
                        )

                        this.products = products;
                        console.log(this.products)
                    })
                    .catch(errors => {
                        console.log(errors);
                    });

            },
            userSelected: function(user) {
                this.selectedUser = user;
                this.choice.userId = user.id
            },
        },

        components: {
            UserAutoComplete
        }
    };
</script>
