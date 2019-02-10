<template>
  <form class="needs-validation" novalidate>
    <div class="form-row">
      <div class="form-group col-md-6 custom-control">
        <label for="firstName">First name</label>
        <input
          v-validate="'required|alpha'"
          v-model="User.firstName"
          type="text"
          class="form-control"
          name="firstName"
          placeholder="First name"
        >
        <div class="invalid-feedback-not-work">{{ errors.first('firstName')}}</div>
      </div>
      <div class="form-group col-md-6">
        <label for="lastName">Last name</label>
        <input
          v-validate="'required|alpha'"
          v-model="User.lastName"
          type="text"
          class="form-control"
          name="lastName"
          placeholder="Last name"
        >
        <div class="invalid-feedback-not-work">{{ errors.first('lastName')}}</div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="role">Role</label>
        <select v-model="User.role" v-validate="'required|alpha'" name="role" class="custom-select">
          <option value="null" disabled>Select role</option>
          <option value="admin">Administrator</option>
          <option value="user">User</option>
        </select>
        <div class="invalid-feedback-not-work">{{ errors.first('role')}}</div>
      </div>
      <div class="form-group col-md-6">
        <label for="email">Email</label>
        <input
          v-validate="'required|email'"
          v-model="User.email"
          type="email"
          class="form-control"
          name="email"
          placeholder="Email"
        >
        <div class="invalid-feedback-not-work">{{ errors.first('email')}}</div>
      </div>
    </div>
    <div class="form-row" v-if="!User.id">
      <div class="form-group col-md-6">
        <label for="password">Password</label>
        <input
          v-validate="'required|confirmed:confirmation'"
          v-model="User.password"
          type="password"
          class="form-control"
          name="password"
          placeholder="Password"
        >
        <div class="invalid-feedback-not-work">{{ errors.first('password')}}</div>
      </div>
      <div class="form-group col-md-6">
        <label for="confirmation">Confirmation</label>
        <input
          type="password"
          class="form-control"
          name="confirmation"
          ref="confirmation"
          placeholder="Password"
        >
        <div class="invalid-feedback-not-work">{{ errors.first('confirmation')}}</div>
      </div>
    </div>
    <button
      v-if="!User.id"
      type="button"
      class="btn btn-warning col-white"
      :disabled="errors.has()"
      @click="save(`store`)"
    >Create</button>
    <button
      v-if="User.id"
      type="button"
      class="btn btn-warning col-white"
      :disabled="errors.has()"
      @click="save(`update`)"
    >Save</button>
  </form>
</template>

<script>
import { UserService } from '@/services/user.service';
export default {
  props: {
    User: {
      type: Object,
      required: false,
      default: () => ({
        firstName: null,
        lastName: null,
        role: null,
        email: null,
        password: null
      })
    }
  },
  data() {
    return {
      service: new UserService()
    };
  },
  methods: {
    save: function(type) {
      if (!this.errors.any()) {
        this.service[type](this.User)
          .then(user => {
            this.$router.push('/users');
          })
          .catch(errors => {
            this.errors.push(errors);
          });
      }
    }
  }
};
</script>