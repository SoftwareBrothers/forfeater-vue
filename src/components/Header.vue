<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
        <img
          src="@/assets/images/logo.png"
          alt="Forfeater"
          class="navbar-logo"
        />
        Forfeater
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ name: 'OrderList' }">
        Orders
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'VendorList' }">
        Vendors
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'UserList' }">
        Users
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item v-if="user" tag="span">
        Hello,
        <strong>
          <router-link class="nav-link" :to="{ name: 'UserProfile' }">{{
            user.firstName
          }}</router-link>
        </strong>
      </b-navbar-item>
      <b-navbar-item v-if="user" tag="div">
        <div class="buttons">
          <a class="button is-light" @click="logout()">
            Logout
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
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
