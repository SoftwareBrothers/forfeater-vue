<template>
  <div class="container">
    <div v-if="orders.length > 0">
      <div v-if="alertText" :class="alertClass" role="alert">
        {{ alertText }}
        </div>
      <div class="mt-3 d-flex flex-row justify-content-center">
        <div v-for="(order,key) in orders" :key="key" v-if="order.vendor.products" @click="orderSelected(order)" class="card border-warning mx-2 my-2">
          <div class="card-header text-center">
            <h2>{{order.vendor.name}}</h2>
            <small class="badge badge-warning">
                <Countdown v-if="order.deadlineAt" :end="order.deadlineAt"></Countdown>
              </small>
          </div>
          <div class="card-body text-dark">
            <ProductsInputList :products="order.vendor.products" :order="order" @productSelected="productSelected"></ProductsInputList>
          </div>
          <div class="card-footer bg-transparent border-warning">
            <div>
              <strong>Deadline at: </strong>
              <small>{{order.deadlineAt | moment}}</small>
            </div>
            <div>
              <strong>Choice: </strong>
              <small v-if="order.choice && order.choice.product">{{order.choice.product.name}}</small>
            </div>
            <div v-if="order.choice && order.choice.comment">
              <strong>Comment: </strong>
              <small v-if="order.choice">{{order.choice.comment}}</small>
            </div>
          </div>
        </div>
      </div>
      <div class="justify-content-center mt-4">
        <div>
          <span>Comment:</span>
          <textarea v-model="choice.comment" class="form-control"></textarea>
        </div>
      </div>
      <div class="d-flex justify-content-center mt-4">
        <button :disabled="!choice.product" class="btn btn-lg btn-warning col-white" v-on:click="sendForm">Send</button>
      </div>
    </div>
    <h2 class="alert alert-danger text-center" v-if="orders.length == 0">{{ noOrderMessage }} </h2>
  </div>
</template>

<script>
  import ProductsInputList from "@/components/Product/InputsList";
  import OrderProvider from "@/provider/order.provider";
  import ProductProvider from "@/provider/product.provider";
  import ChoiceProvider from "@/provider/choice.provider";
  import Countdown from "@/components/Helpers/Countdown";
  
  export default {
    data: () => {
      return {
        appErrors: [],
        orders: [],
        choice: {
          order: {},
          product: null,
          comment: ''
        },
        noOrderMessage: "There is no restaurants available for today",
        alertText: '',
        alertClass: ''
      };
    },
    methods: {
      getProducts(vendor) {},
      sendForm: function() {
        if (this.choice.product) {
          ChoiceProvider.post(
              this.$store.getters.user,
              this.choice.order,
              this.choice.product
            )
            .then(choice => {
              this.alertText = 'Your choice was added!';
              this.alertClass = 'alert alert-success';
              this.orders.find(x => x.id === choice.orderId).choice = {
                product: this.choice.product.name,
                comment: this.choice.comment
              }
              this.choice.comment = '';
              // console.log('choice added!');
              // console.log(choice);
            })
            .catch(errors => {
              this.alertText = 'Something went wrong!';
              this.alertClass = 'alert alert-danger';
              // console.log('error after choice add');
              this.appErrors.push(errors);
            });
        }
      },
      productSelected: function(product, order) {
        console.log('product selected, order: ' + order.id)
        this.orders.find(x => x.id === order.id).choice.product = product
        this.choice.product = product;
      },
      orderSelected: function(order) {
        this.choice.order = order;
      }
    },
    created() {
      OrderProvider.getActive()
        .then(results => {
          if (results.length == 0) {
            this.noOrderMessage = "There is no active order!";
          }
  
          results.forEach(order => {
            ProductProvider.getAllActiveByVendor(order.vendor.id)
              .then(products => {
                if (products.length > 0) {
                  order.vendor.products = products;
                }
                order.choice = {
                  product: null,
                  comment: ''
                }
                this.orders.push(order);
              })
              .catch(errors => {
                this.appErrors.push(errors);
              });
          });
        })
        .catch(errors => {
          this.appErrors.push(errors);
        });
    },
    components: {
      ProductsInputList,
      Countdown
    }
  };
</script>