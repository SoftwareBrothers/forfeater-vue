<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-sm-4 mx-auto w-100">
        <div class="alert alert-danger" v-if="error">
          {{error}}
        </div>
        <form @submit.prevent="login()">
          <div class="form-group">
            <div class="col-sm">
              <label for="username">Username</label>
              <input v-model="username" :class="{'is-invalid': errors.has('username')}" v-validate="'required|email'" type="text" class="form-control" name="username" placeholder="Your e-mail address">
              <small class="invalid-feedback" :if="errors.has('username')">{{errors.first('username')}}</small>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm">
              <label for="password">Password</label>
              <input v-model="password" :class="{'is-invalid': errors.has('password')}" v-validate="'required'" type="password" class="form-control" name="password" placeholder="Your e-mail address">
              <small class="invalid-feedback" :if="errors.has('password')">{{errors.first('password')}}</small>
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
    <div class="overlay" v-if="loading">
      <div class="loading">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      error: null,
      loading: false,
      isClicked: false
    };
  },
  methods: {
    login() {
      this.isClicked = true;
      this.loading = true;
      this.$store
        .dispatch("authenticate", {
          username: this.username,
          password: this.password
        })
        .then(token => {
          this.loading = false;
          let componentName = this.$route.query.redirect;
          this.$router.push({
            name: componentName ? componentName : "Home"
          });
        })
        .catch(error => {
          this.error = 'Error, szwagier.';
          this.loading = false;
        });
    },
    disabled() {
      return (
        this.username.length === 0 ||
        this.password.length === 0 ||
        this.errors.any() ||
        this.isClicked
      );
    }
  },
  beforeCreate() {
    if (this.$store.token) {
      this.$router.push({ name: "UserProfile" });
    }
  }
};
</script>
<style lang="css" scoped>
.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
}
.loading {
  height: 100%;
  padding: 0;
  margin: 0;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
}
.line {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  margin: 0 1rem;
  border-radius: 1rem;
  background-color: orange;
}
.line:nth-last-child(1) {
  animation: loading 0.6s 0.1s linear infinite;
}
.line:nth-last-child(2) {
  animation: loading 0.6s 0.2s linear infinite;
}
.line:nth-last-child(3) {
  animation: loading 0.6s 0.3s linear infinite;
}

@keyframes loading {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, 15px);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
