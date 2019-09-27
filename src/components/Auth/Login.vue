<template>
  <div class="container has-text-centered">
    <div class="row">
      <div class="col-12 col-md-8 col-lg-4 mx-auto w-100">
        <form @submit.prevent="login()">
          <div class="form-group">
            <div class="col-sm">
              <label for="username">Username</label>
              <input
                id="username"
                v-model="username"
                v-validate="'required|email'"
                :class="{ 'is-invalid': errors.has('username') }"
                type="text"
                class="form-control"
                name="username"
                placeholder="Your e-mail address"
              />
              <small class="invalid-feedback" :if="errors.has('username')">{{
                errors.first('username')
              }}</small>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm">
              <label for="password">Password</label>
              <input
                id="password"
                v-model="password"
                v-validate="'required'"
                :class="{ 'is-invalid': errors.has('password') }"
                type="password"
                class="form-control"
                name="password"
                placeholder="Your e-mail address"
              />
              <small class="invalid-feedback" :if="errors.has('password')">{{
                errors.first('password')
              }}</small>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm text-center">
              <button
                type="submit"
                class="button is-warning"
                :class="{ 'is-loading': loading }"
                :disabled="disabled()"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false,
    };
  },
  beforeCreate() {
    if (this.$store.token) {
      this.$router.push({ name: 'UserProfile' });
    }
  },
  methods: {
    async login() {
      this.loading = true;
      let token = await this.$store.dispatch('authenticate', {
        username: this.username,
        password: this.password,
      });
      if (token) {
        let componentName = this.$route.query.redirect;
        this.$router.push({
          name: componentName ? componentName : 'Home',
        });
      }
      this.loading = false;
    },
    disabled() {
      return (
        this.username.length === 0 ||
        this.password.length === 0 ||
        this.errors.any() ||
        this.loading
      );
    },
  },
};
</script>
