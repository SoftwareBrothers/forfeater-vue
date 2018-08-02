<template>
  <form class="needs-validation">
    <div class="form-row">
      <div class="form-group col-md-12 custom-control">
        <label for="name">Vendor</label>
        <select v-model="Order.vendorId" v-validate="'required'" name="vendorId" @change="myFunction()" class="custom-select">
                <option v-for="(vendor,key) in vendors" :key="key" :value="vendor.id">{{ vendor.name }}</option>
              </select>
        <div class="invalid-feedback-not-work">{{ errors.first('vendorId')}}</div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6 custom-control">
        <label for="name">Deadline</label>
        <div>
          <flat-pickr v-model="Order.deadlineAt" v-validate="'date_format:YYYY-MM-DD HH:mm|required'" :config="config" class="form-control" placeholder="Select date" name="deadlineAt" ref="deadlineAt"></flat-pickr>
        </div>
        <div class="invalid-feedback-not-work">{{ errors.first('deadlineAt')}}</div>
      </div>
      <div class="form-group col-md-6">
        <label for="name">Delivery</label>
        <div>
          <flat-pickr v-model="Order.deliveryAt" v-validate="'date_format:YYYY-MM-DD HH:mm|after:deadlineAt'" :config="config" class="form-control" placeholder="Select date" name="deliveryAt"></flat-pickr>
          <div class="invalid-feedback-not-work">{{ errors.first('deliveryAt')}}</div>
        </div>
      </div>
    </div>
    <button v-if="!Order.id" type="button" class="btn btn-warning" :disabled="errors.has()" @click="create">Create</button>
    <button v-if="Order.id" type="button" class="btn btn-warning" :disabled="errors.has()" @click="edit">Save</button>
  </form>
</template>

<script>
  import OrderService from "@/services/order.service";
  import VendorProvider from "@/provider/vendor.provider";
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  
  export default {
    props: {
      Order: {
        type: Object,
        required: false,
        default: () => ({
          vendorId: null,
          userId: 1,
          deadlineAt: null,
          deliveryAt: null
        }),
      }
    },
    data() {
      return {
        vendors: {},
        config: {
          wrap: true, // set wrap to true only when using 'input-group'
          altFormat: 'Y-m-d H:i',
          altInput: true,
          dateFormat: 'Y-m-d H:i',
          enableTime: true,
          time_24hr: true
        },
      };
    },
    created() {
      VendorProvider.getAll()
        .then(vendors => {
          this.vendors = vendors;
        })
        .catch(errors => {
          console.log(errors);
        });
    },
    methods: {
      create: async function() {
        var isValid = await this.$validator.validateAll();
  
        if (isValid && !this.errors.any()) {
          OrderService.store(this.Order)
            .then(order => {
              this.$router.push('/orders')
            })
            .catch(errors => {
              this.errors.push(errors);
            });
        }
      },
      edit: async function() {
        var isValid = await this.$validator.validateAll();
  
        if (isValid && !this.errors.any()) {
          OrderService.update(this.Order)
            .then(order => {
              this.$router.push('/orders')
            })
            .catch(errors => {
              this.errors.push(errors);
            });
        }
      },
  
      myFunction: function() {
        // set text "Select vendor"
        // display all products form the vendor
        // update products after created order
        // not possible create button unless products are chosen
        console.log('changed!')
      }
  
      },
      components: {
        flatPickr
      }
    };
</script>

<style lang="scss" scoped>
  
</style>
