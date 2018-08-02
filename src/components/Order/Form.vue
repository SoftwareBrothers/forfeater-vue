<template>
  <form class="needs-validation">
    <div class="form-row">
      <div class="form-group col-md-12 custom-control">
        <label for="name">Vendor</label>
        <select v-model="Order.vendorId" v-validate="'required'" name="vendorId" class="custom-select">
              <option v-for="(vendor,key) in vendors" :key="key" :value="vendor.id">{{ vendor.name }}</option>
            </select>
        <div class="invalid-feedback-not-work">{{ errors.first('vendorId')}}</div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6 custom-control">
        <label for="name">Deadline</label>
        <div>
          <date-picker v-model="Order.deadlineAt" type="datetime" :time-picker-options="timePickerOptions" :first-day-of-week="1" lang="en" format="YYYY-MM-DD HH:mm" v-validate="'required'" name="deadlineAt" ref="deadlineAt"
          data-vv-validate-on="change|custom">
          </date-picker>
        </div>
        <div class="invalid-feedback-not-work">{{ errors.first('deadlineAt')}}</div>
      </div>
      <div class="form-group col-md-6">
        <label for="name">Delivery</label>
        <div>
          <date-picker v-model="Order.deliveryAt" type="datetime" :time-picker-options="timePickerOptions" :first-day-of-week="1" lang="en" format="YYYY-MM-DD HH:mm" v-validate="'after:deadlineAt'" name="deliveryAt"
          data-vv-validate-on="change|custom">
          </date-picker>
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
  import DatePicker from 'vue2-datepicker'
  // import Datepicker from 'vuejs-datepicker';
  
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
        })
        .catch(errors => {
          console.log(errors);
        });
    },
    methods: {
      create: async function() {
        var isValid  = await this.$validator.validateAll();

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
        var isValid  = await this.$validator.validateAll();

        if (isValid && !this.errors.any()) {
          console.log(this.Order)
          OrderService.update(this.Order)
            .then(order => {
              // this.$router.push('/orders')
            })
            .catch(errors => {
              this.errors.push(errors);
            });
        } else {
          console.log(':(')
          console.log(this.errors.all())
          // for(field in this.fields){
          //     console.log(field.getter)
          // }
          console.log(this.$validator.fields.find({ name: 'deadlineAt' }).value);
          console.log(this.$validator.fields.find({ name: 'deliveryAt' }).value);
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
