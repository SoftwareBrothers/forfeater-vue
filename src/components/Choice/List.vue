<template>
    <div class="container">
        <nav aria-label="breadcrumb" class="d-print-none">
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
                <h1 class="text-center">{{ vendor && vendor.name }} {{ order && order.deliveryAt | moment }}</h1>
            </div>
        </div>
        <ChoiceTable :choices="choices" :tableData="tableData"></ChoiceTable>
    </div>
</template>
<style>
    @media print {
        .VueTables__search {
            display: none !important;
        }
        .VueTables__table td:nth-child(4), .VueTables__table th:nth-child(4) {
            display: none;
        }

        .VueTables__table td:nth-child(5), .VueTables__table th:nth-child(5) {
            display: none;
        }
    }
</style>
<script>
import ChoiceService from "@/services/choice.service";
import ChoiceTable from "@/components/Choice/Table";
import Print from "@/components/Print";
import OrderService from "@/services/order.service";
import VendorProvider from "@/provider/vendor.provider";

export default {
  data() {
    return {
      choices: {},
      tableData: [],
      vendor: null,
      order: null
    };
  },
  created() {

      OrderService.find(this.$route.params.orderId)
          .then(order => {
              this.order = order;
              new VendorProvider().find(this.order.vendorId)
                  .then(vendor => {
                      this.vendor = vendor;

                  })
                  .catch(errors => {
                      console.log(errors);
                  });

          })
          .catch(errors => {
              console.log(errors);
          });

    ChoiceService.getAll(this.$route.params.orderId)
      .then(choices => {
        this.choices = choices
          .sort((a, b) => a.productId - b.productId)
          .map( (item, key) =>
            Object.assign({}, item, {
              index: key,
              userFullName: item.user.lastName + " " + item.user.firstName,
              productName: item.product.name
            })
          );
        this.tableData = this.choices;
      })
      .catch(errors => {
        console.log(errors);
      });
  },
  components: {
    ChoiceTable,
    Print
  }
};
</script>
