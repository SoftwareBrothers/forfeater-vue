<template>
  <form class="needs-validation" novalidate>
    <div class="form-row">
      <div class="form-group col-md-6 custom-control">
        <label for="firstName">First name</label>
        <input v-validate="'required|alpha'" v-model="User.firstName" type="text" class="form-control" name="firstName" placeholder="firstName">
        <div class="invalid-feedback-not-work">{{ errors.first('firstName')}}</div>
      </div>
      <div class="form-group col-md-6">
        <label for="lastName">Last name</label>
        <input v-validate="'required|alpha'" v-model="User.lastName" type="text" class="form-control" name="lastName" placeholder="lastName">
        <div class="invalid-feedback-not-work">{{ errors.first('lastName')}}</div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="role">Role</label>
        <input v-validate="'required|alpha'" v-model="User.role" type="text" class="form-control" name="role" placeholder="Role">
        <div class="invalid-feedback-not-work">{{ errors.first('role')}}</div>
      </div>
      <div class="form-group col-md-6">
        <label for="email">Email</label>
        <input v-validate="'required|email'" v-model="User.email" type="email" class="form-control" name="email" placeholder="Email">
        <div class="invalid-feedback-not-work">{{ errors.first('email')}}</div>
      </div>
    </div>
    <div class="form-row" v-if="!User.id">
      <div class="form-group col-md-6">
        <label for="password">Password</label>
        <input v-validate="'required|confirmed:confirmation'" v-model="User.password" type="password" class="form-control" name="password" placeholder="Password">
        <div class="invalid-feedback-not-work">{{ errors.first('password')}}</div>
      </div>
      <div class="form-group col-md-6">
        <label for="confirmation">Confirmation</label>
        <input type="password" class="form-control" name="confirmation" ref="confirmation" placeholder="Password">
        <div class="invalid-feedback-not-work">{{ errors.first('confirmation')}}</div>
      </div>
    </div>
    <button v-if="!User.id" type="button" class="btn btn-warning" :disabled="errors.has()" @click="createUser">Create</button>
    <button v-if="User.id" type="button" class="btn btn-warning" :disabled="errors.has()" @click="editUser">Save</button>
  </form>
</template>

<script>
  import UserProvider from "@/provider/user.provider";
  
  export default {
    props: {
      User: {
        type: Object,
        required: false,
        default: {
          firstName: null,
          lastName: null,
          role: null,
          email: null,
          password: null
        }
      }
    },
    methods: {
      createUser: function() {
        if (!this.errors.any()) {
          UserProvider.store(this.User)
            .then(user => {
              this.$router.push('/users')
            })
            .catch(errors => {
              this.errors.push(errors);
            });
        }
      },
      editUser: function() {
        if (!this.errors.any()) {
          UserProvider.update(this.User)
            .then(user => {
              this.$router.push('/users')
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
