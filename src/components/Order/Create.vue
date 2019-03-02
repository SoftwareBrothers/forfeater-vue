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
        <li class="breadcrumb-item active" aria-current="page">Create</li>
      </ol>
    </nav>
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Create order</h1>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-sm-12">
          <OrderForm></OrderForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderForm from '@/components/Order/Form';

export default {
  components: { OrderForm }
};
</script>
