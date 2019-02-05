<template>
  <form class="needs-validation" novalidate>
    <div class="form-row">
      <div class="form-group col-md-6 custom-control">
        <label for="name">Name</label>
        <input
          v-validate="'required'"
          v-model="Vendor.name"
          type="text"
          class="form-control"
          name="name"
          placeholder="name"
        >
        <div class="invalid-feedback-not-work">{{ errors.first('name')}}</div>
      </div>
      <div class="form-group col-md-6">
        <label for="name">Website</label>
        <input
          v-validate="'url'"
          v-model="Vendor.url"
          type="text"
          class="form-control"
          name="url"
          placeholder="url"
        >
        <div class="invalid-feedback-not-work">{{ errors.first('url')}}</div>
      </div>
    </div>
    <button
      v-if="!Vendor.id"
      type="button"
      class="btn btn-warning col-white"
      :disabled="errors.has()"
      @click="save(`store`)"
    >Create</button>
    <button
      v-if="Vendor.id"
      type="button"
      class="btn btn-warning col-white"
      :disabled="errors.has()"
      @click="save(`update`)"
    >Save</button>
  </form>
</template>

<script>
import { VendorProvider } from '@/provider/vendor.provider';

export default {
  props: {
    Vendor: {
      type: Object,
      required: false,
      default: () => ({
        name: null,
        url: null
      })
    }
  },
  data() {
    return {
      provider: new VendorProvider()
    };
  },
  methods: {
    save: function(type) {
      if (!this.errors.any()) {
        this.provider[type](this.Vendor)
          .then(vendor => {
            this.$router.push('/vendors');
          })
          .catch(errors => {});
      }
    }
  }
};

(function() {
  'use strict';
  window.addEventListener(
    'load',
    function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener(
          'submit',
          function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          },
          false
        );
      });
    },
    false
  );
})();
</script>

<style lang="scss" scoped>
</style>
