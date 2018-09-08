<template>
  <form class="needs-validation" novalidate>
    <div class="form-row">
      <div class="form-group col-md-6 custom-control">
        <label for="name">Name</label>
        <input v-validate="'required'" v-model="Vendor.name" type="text" class="form-control" name="name" placeholder="name">
        <div class="invalid-feedback-not-work">{{ errors.first('name')}}</div>
      </div>
      <div class="form-group col-md-6">
        <label for="name">Website</label>
        <input v-validate="'url'" v-model="Vendor.url" type="text" class="form-control" name="url" placeholder="url">
        <div class="invalid-feedback-not-work">{{ errors.first('url')}}</div>
      </div>
    </div>
    <button v-if="!Vendor.id" type="button" class="btn btn-warning col-white" :disabled="errors.has()" @click="create">Create</button>
    <button v-if="Vendor.id" type="button" class="btn btn-warning col-white" :disabled="errors.has()" @click="edit">Save</button>
  </form>
</template>

<script>
  import VendorProvider from "@/provider/vendor.provider";
  
  export default {
    props: {
      Vendor: {
        type: Object,
        required: false,
        default: () => ({
          name: null,
          url: null
        }),
      }
    },
    methods: {
      create: function() {
        if (!this.errors.any()) {
          VendorProvider.store(this.Vendor)
            .then(vendor => {
              this.$router.push('/vendors')
            })
            .catch(errors => {
              this.errors.push(errors);
            });
        }
      },
      edit: function() {
        if (!this.errors.any()) {
          VendorProvider.update(this.Vendor)
            .then(vendor => {
              this.$router.push('/vendors')
            })
            .catch(errors => {
              this.errors.push(errors);
            });
        }
      },
    }
  };
  
  (function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();
</script>

<style lang="scss" scoped>
  
</style>
