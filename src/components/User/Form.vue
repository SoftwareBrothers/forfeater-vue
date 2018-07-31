<template>
  <form class="needs-validation" novalidate>
    <div class="form-row">
      <div class="form-group col-md-6 custom-control">
        <label for="firstName">First name</label>
        <input v-validate="'required|alpha'" type="text" class="form-control" name="firstName"  placeholder="firstName">
        <div class="invalid-feedback-not-work">{{ errors.first('firstName')}}</div>
      </div>
      <div class="form-group col-md-6">
        <label for="lastName">Last name</label>
        <input type="text" class="form-control" name="lastName" v-validate="'required|alpha'" placeholder="lastName">
        <div class="invalid-feedback-not-work">{{ errors.first('lastName')}}</div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="role">Role</label>
        <input type="text" class="form-control" name="role" v-validate="'required|alpha'" placeholder="Role">
        <div class="invalid-feedback-not-work">{{ errors.first('role')}}</div>
      </div>
      <div class="form-group col-md-6">
        <label for="email">Email</label>
        <input type="email" class="form-control" name="email" v-validate="'required|email'" placeholder="Email">
        <div class="invalid-feedback-not-work">{{ errors.first('email')}}</div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="password">Password</label>
        <input type="password" class="form-control" name="password" v-validate="'confirmed:passwordConfirmation'" placeholder="Password">
        <div class="invalid-feedback-not-work">{{ errors.first('password')}}</div>
      </div>
      <div class="form-group col-md-6">
        <label for="passwordConfirmation">Confirmation</label>
        <input type="password" class="form-control" name="passwordConfirmation" placeholder="Password">
        <div class="invalid-feedback-not-work">{{ errors.first('passwordConfirmation')}}</div>
      </div>
    </div>
    <button type="submit" class="btn btn-warning" :disabled="errors.has()" @click="sendForm">Create</button>
  </form>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    sendForm: function() {
       
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
