<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-12 col-md-8 col-lg-4 mx-auto w-100">
        <ErrorAlert :title="null" :content="$t(error)" v-if="error"/>
        <form @submit.prevent="login()">
          <div class="form-group">
            <div class="col-sm">
              <label for="username">Username</label>
              <input
                id="username"
                v-model="username"
                :class="{'is-invalid': errors.has('username')}"
                v-validate="'required|email'"
                type="text"
                class="form-control"
                name="username"
                placeholder="Your e-mail address"
              >
              <small
                class="invalid-feedback"
                :if="errors.has('username')"
              >{{errors.first('username')}}</small>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm">
              <label for="password">Password</label>
              <input
                id="password"
                v-model="password"
                :class="{'is-invalid': errors.has('password')}"
                v-validate="'required'"
                type="password"
                class="form-control"
                name="password"
                placeholder="Your e-mail address"
              >
              <small
                class="invalid-feedback"
                :if="errors.has('password')"
              >{{errors.first('password')}}</small>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm text-center">
              <button type="submit" class="btn btn-warning" :disabled="disabled()">Send</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <Loading :active="loading"></Loading>
  </div>
</template>

<script>
import Loading from 'buefy/src/components/loading/Loading.vue';
import ErrorAlert from '@/components/Alerts/Error';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: null,
      loading: false,
      isClicked: false
    };
  },
  methods: {
    async login() {
      this.isClicked = true;
      this.loading = true;
      try {
        let token = await this.$store.dispatch('authenticate', {
          username: this.username,
          password: this.password
        });

        if (token !== undefined) {
          let componentName = this.$route.query.redirect;
          this.$router.push({
            name: componentName ? componentName : 'Home'
          });
        }
      } catch (error) {
        this.error = 'errors.auth.general';
      }
      this.loading = false;
      this.isClicked = false;
    },
    disabled() {
      return this.username.length === 0 || this.password.length === 0 || this.errors.any() || this.isClicked;
    }
  },
  beforeCreate() {
    if (this.$store.token) {
      this.$router.push({ name: 'UserProfile' });
    }
  },
  components: { Loading, ErrorAlert }
};
</script>

<style lang="scss" scoped>
@import '~buefy/src/scss/components/_loading.scss';
</style>