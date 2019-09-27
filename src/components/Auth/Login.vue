<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <form class="box" @submit.prevent="login()">
              <b-field
                label="Username"
                :type="{ 'is-danger': errors.has('username') }"
                :message="errors.first('username')"
              >
                <b-input
                  v-model="username"
                  v-validate="'required|email'"
                  type="email"
                  name="username"
                  icon="envelope"
                />
              </b-field>
              <b-field
                label="Password"
                :type="{ 'is-danger': errors.has('password') }"
                :message="errors.first('password')"
              >
                <b-input
                  v-model="password"
                  v-validate="'required|min:8'"
                  password-reveal
                  type="password"
                  name="password"
                  icon="lock"
                />
              </b-field>
              <b-button
                type="is-primary"
                :disabled="disabled()"
                outline
                native-type="submit"
              >
                Login
              </b-button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  beforeCreate() {
    if (this.$store.token) {
      this.$router.push({ name: 'UserProfile' });
    }
  },
  methods: {
    async login() {
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
    },
    disabled() {
      return (
        this.username.length === 0 ||
        this.password.length === 0 ||
        this.errors.any()
      );
    },
  },
};
</script>
