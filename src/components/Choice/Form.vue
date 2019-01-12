<template>
    <form class="needs-validation">

        <div class="row">
            <div class="col-sm-6">
                <div class="form-row">
                    <div class="form-group custom-control w-100">
                        <label for="name">User</label>
                        <UserAutoComplete></UserAutoComplete>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group custom-control">
                        <label>Vendor</label>
                        <div v-if="vendorName">{{ this.vendorName }}</div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group custom-control">
                        <label for="name">Product</label>
                        <select v-model="Choice.productId" v-validate="'required'" name="productId"
                                @change="loadProducts()" class="custom-select w-100">
                            <option :value="null" disabled>Select Product</option>
                            <option v-for="(product,key) in products" :key="key" :value="product.id">{{ product.name
                                }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label for="name">Comment</label>
                    <textarea class="form-control border-warning" rows="4"></textarea>
                </div>
            </div>
        </div>


        <button v-if="!Choice.id" type="button" class="btn btn-warning col-white" :disabled="errors.has()"
                @click="create">Create
        </button>
        <button v-if="Choice.id" type="button" class="btn btn-warning col-white" :disabled="errors.has()"
                @click="edit">Save
        </button>
    </form>
</template>

<script>
    import UserAutoComplete from "@/components/User/AutoComplete";
    import OrderService from "@/services/order.service";
    import ProductService from "@/services/product.service";
    import VendorProvider from "@/provider/vendor.provider";

    export default {
        props: {
            Choice: {
                type: Object,
                required: false,
                default: () => ({
                    orderId: null,
                    userId: null,
                    productId: null,
                    orderComment: null,
                    score: null,
                    scoreComment: null
                }),
            }
        },
        data() {
            return {
                products: null,
                vendorName: null,
                Order: {
                    type: Object,
                    required: false,
                    default: () => ({
                        vendorId: null,
                        userId: null,
                        deadlineAt: null,
                        deliveryAt: null
                    }),
                }
            };
        },
        beforeCreate() {
            OrderService.find(this.$route.params.orderId)
                .then(order => {
                    this.Order = order;
                    this.loadProducts();

                    new VendorProvider().find(this.Order.vendorId)
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
        methods: {

            create: async function() {

            },
            edit: async function() {

            },

            loadProducts: function () {

                this.products = null;

                ProductService.getAll(this.Order.vendorId)
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
        },

        components: {
            UserAutoComplete
        }
    };
</script>
