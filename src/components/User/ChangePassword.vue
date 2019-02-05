<template>
  <div class="container">
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Change Password</h1>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-sm-12">
          <ErrorAlert v-if="alert" :message="alert" :title="null"/>
          <form class="needs-validation" novalidate>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="password">Password</label>
                <input
                  v-validate="'required|confirmed:confirmation'"
                  v-model="newPassword"
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
              type="button"
              class="btn btn-warning col-white"
              :disabled="errors.has()"
              @click="changePassword"
            >Update</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserProvider from '@/provider/user.provider';
import ErrorAlert from '@/components/Alerts/Error';

export default {
  data() {
    return {
      User: {
        type: Object,
        required: true
      },
      newPassword: null,
      provider: new UserProvider(),
      alert: ''
    };
  },
  methods: {
    changePassword: function() {
      if (!this.errors.any()) {
        this.provider
          .changePassword(this.User, this.newPassword)
          .then(response => {
            this.$router.go('-1');
          })
          .catch(error => (this.alert = error.message));
      }
    }
  },
  created() {
    this.User = this.$store.getters.user;
  }
};
</script>
