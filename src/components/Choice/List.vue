<template>
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{ name: 'Home' }">Home</router-link>
                </li>
                <li class="breadcrumb-item">
                    <router-link :to="{ name: 'OrderList' }">Orders</router-link>
                </li>
                <li class="breadcrumb-item">
                    <router-link :to="{ name: 'OrderEdit', params: { id: this.$route.params.orderId } }">Order
                    </router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Choices</li>
            </ol>
        </nav>
        <div class="row">
            <div class="col-auto mr-auto"></div>
            <div class="col-auto">
                <Print>
                    <template slot="buttonText">Print Order</template>
                </Print>
            </div>
        </div>
        <hr>
        <div class="row pt-3">
            <div class="col-sm">
                <h1 class="text-center">Choices list</h1>
            </div>
        </div>
        <ChoiceTable :choices="choices" :tableData="tableData"></ChoiceTable>
    </div>
</template>

<script>
    import ChoiceService from "@/services/choice.service";
    import ChoiceTable from "@/components/Choice/Table";
    import Print from "@/components/Print";

    export default {
        data() {
            return {
                choices: {},
                tableData: [],
            };
        },
        created() {
            ChoiceService.getAll(this.$route.params.orderId)
                .then(choices => {
                    this.choices = choices.sort((a, b) => a.productId - b.productId)
                        .map(item => Object.assign({}, item,
                            {
                                userFullName: item.user.lastName + ' ' + item.user.firstName,
                                productName: item.product.name
                            }));
                    this.tableData = this.choices;
                })
                .catch(errors => {
                    console.log(errors);
                });
        },
        components: {
            ChoiceTable, Print
        },
    };
</script>
