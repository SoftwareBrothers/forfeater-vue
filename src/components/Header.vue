<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark justify-content-between">
      <router-link class="navbar-brand p-0" :to="{ name: 'Home' }">
        <img src="@/assets/images/logo.png" alt="logo" class="navbar-logo" />
        Forfeater
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarCollapse" class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li v-if="user" class="nav-item">
            <router-link class="nav-link" :to="{ name: 'OrderList' }"
              >Orders</router-link
            >
          </li>
          <li v-if="user && user.role == 'admin'" class="nav-item">
            <router-link class="nav-link" :to="{ name: 'VendorList' }"
              >Vendors</router-link
            >
          </li>
          <li v-if="user && user.role == 'admin'" class="nav-item">
            <router-link class="nav-link" :to="{ name: 'UserList' }"
              >Users</router-link
            >
          </li>
          <li v-if="user" class="nav-item">
            <router-link class="nav-link" :to="{ name: 'UserProfile' }"
              >Profile</router-link
            >
          </li>
        </ul>
      </div>
      <div v-if="user">
        <div class="nav-user">
          Hello,
          <strong>
            <router-link class="nav-link" :to="{ name: 'UserProfile' }">{{
              user.firstName
            }}</router-link>
          </strong>
        </div>
        <button class="btn btn-outline-light" @click="logout()">Logout</button>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      const name = this.$router.currentRoute.name !== 'Home' ? 'Home' : 'Login';
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="scss" scoped>
#logo {
  height: 50px;
  width: auto;
}

.navbar-dark {
  .navbar-nav {
    .router-link-active {
      color: #fff;
    }
  }
}

.nav-user {
  display: inline;
  margin-right: 10px;
  color: #fff;

  a {
    display: inline;
    color: #fff;
    padding: 0;
  }
}

header {
  margin-bottom: 2rem;
}
</style>
