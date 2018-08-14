<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark justify-content-between">
      <router-link class="navbar-brand p-0" :to="{ name: 'Home' }">
        <img src="@/assets/images/logo.png" alt="logo" class="navbar-logo"> Forfeater
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'OrderList' }">Orders</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'VendorList' }">Vendors</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'UserList' }">Users</router-link>
          </li>
        </ul>
      </div>
      <div>
        <button class="btn btn-outline-light" v-if="user" @click="logout()">Logout</button>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      const name = this.$router.currentRoute.name !== "Home" ? "Home" : "Login";
      return setTimeout(() => {
        this.$router.push({ name });
      }, 100);
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    console.log(this.user);
  }
};
</script>

<style lang="scss" scoped>
#logo {
  height: 50px;
  width: auto;
}
</style>
