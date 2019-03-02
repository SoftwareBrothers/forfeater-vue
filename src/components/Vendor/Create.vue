<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{ name: 'Home' }">Home</router-link></li>
        <li class="breadcrumb-item"><router-link :to="{ name: 'VendorList' }">Vendors</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Create</li>
      </ol>
    </nav>
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Create vendor</h1>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-sm-12">
          <VendorForm></VendorForm>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
import VendorForm from '@/components/Vendor/Form';

export default {
  components: { VendorForm }
};
</script>
