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
            <router-link class="nav-link" :to="{ name: 'VendorList' }">Vendors</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'UserList' }">Users</router-link>
          </li>
        </ul>
      </div>
      <div v-if="user">
        <span class="navbar-text mr-2">Hi, {{user.firstName}}</span>
        <a class="btn btn-outline-light" @click="logout()">Logout</a>
      </div>
      <div v-if="!user">
        <router-link class="btn btn-outline-light" :to="{ name: 'Login' }">Login</router-link>
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
        this.$router.push({name: "Login"});
      }
    },
    computed: {
      user() {
        return this.$store.getters.getUser;
      }
    },
    created() {
      console.log(this.$store.getters.getUser);
    }
  };
</script>

<style lang="scss" scoped>
  #logo {
    height: 50px;
    width: auto;
  }
</style>
