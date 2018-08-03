<template>
  <div class="container">
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Edit order</h1>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-sm-12">
          <OrderForm :Order="Order"></OrderForm>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import OrderService from "@/services/order.service";
  import OrderForm from "@/components/Order/Form";
  import ProductService from "@/services/product.service";
  
  export default {
    data() {
      return {
        products: null,
        Order: {
          vendorId: null,
          userId: 1,
          deadlineAt: null,
          deliveryAt: null
        }
      };
    },
    beforeCreate() {
      OrderService.find(this.$route.params.id)
        .then(order => {
          this.Order = order;
          this.loadProducts();
        })
        .catch(errors => {
          console.log(errors);
        });
    },
    methods: {
      loadProducts: function() {
        this.products = null;
  
        ProductService.getAll(this.Order.vendorId)
          .then(products => {
            this.checkedProducts = products.filter(
              product => {
                return product.active
              }
              ).map(
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
  
      }
    },
    components: {
      OrderForm
    }
  };
</script>

<style lang="scss" scoped>
</style>
