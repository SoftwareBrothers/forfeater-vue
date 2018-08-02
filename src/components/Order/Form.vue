<template>
  <form class="needs-validation" novalidate>
    <div class="form-row">
      <div class="form-group col-md-12 custom-control">
        <label for="name">Vendor</label>
        <select v-model="Order.vendorId" class="custom-select">
            <option v-for="(vendor,key) in vendors" :key="key" :value="vendor.id">{{ vendor.name }}</option>
          </select>
        <div class="invalid-feedback-not-work">{{ errors.first('order.vendorId')}}</div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6 custom-control">
        <label for="name">Deadline</label>
        <div>
          <date-picker v-model="Order.deadlineAt" type="datetime" :time-picker-options="timePickerOptions" :first-day-of-week="1" lang="en" format="YYYY-MM-DD HH:mm" 
          v-validate="'date_format:YYYY-MM-DD HH:ii'" name="deadlineAt">
          </date-picker>
        </div>
        <div class="invalid-feedback-not-work">{{ errors.first('order.deadlineAt')}}</div>
      </div>
      <div class="form-group col-md-6">
        <label for="name">Delivery</label>
        <div>
          <date-picker v-model="Order.deliveryAt" type="datetime" :time-picker-options="timePickerOptions" :first-day-of-week="1" lang="en" format="YYYY-MM-DD HH:mm" 
          v-validate="'date_format:YYYY-MM-DD HH:ii'" name="deliveryAt">
          </date-picker>
          <div class="invalid-feedback-not-work">{{ errors.first('order.deliveryAt')}}</div>
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
  import DatePicker from 'vue2-datepicker'
  
  export default {
    props: {
      Order: {
        type: Object,
        required: false,
        default: () => ({
          vendorId: null,
          userId: 1,
          dedlineAt: null,
          deliveryAt: null
        }),
      }
    },
    data() {
      return {
        vendors: {},
        timePickerOptions: {
          start: '08:00',
          step: '00:15',
          end: '17:00'
        }
      };
    },
    created() {
      VendorProvider.getAll()
        .then(vendors => {
          this.vendors = vendors;
          console.log('hehe')
          console.log(vendors)
        })
        .catch(errors => {
          console.log(errors);
        });
    },
    methods: {
      create: function() {
        if (!this.errors.any()) {
          OrderService.store(this.Order)
            .then(order => {
              this.$router.push('/orders')
            })
            .catch(errors => {
              this.errors.push(errors);
            });
        }
      },
      edit: function() {
        if (!this.errors.any()) {
          OrderService.update(this.Order)
            .then(order => {
              this.$router.push('/orders')
            })
            .catch(errors => {
              this.errors.push(errors);
            });
        }
      },
    },
    components: {
      DatePicker
    }
  };
</script>

<style lang="scss" scoped>
  
</style>
