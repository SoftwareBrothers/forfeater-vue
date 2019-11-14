<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
        <img
          src="@/assets/images/logo.png"
          alt="Forfeater"
          class="navbar-logo"
        />
        &nbsp;<b>Forfeater</b>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item
        tag="router-link"
        :to="{ name: 'OrderList' }"
        class="navbarItem"
      >
        <b-icon icon="clipboard-list" size="is-small" />
        <span>
          Orders
        </span>
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        :to="{ name: 'VendorList' }"
        class="navbarItem"
      >
        <b-icon icon="store" style="margin-right: 5px" size="is-small" />
        <span> Vendors </span>
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item v-if="user" class="is-hidden-touch" tag="span">
        Hello,&nbsp;
        <strong>
          <router-link class="nav-link" :to="{ name: 'UserProfile' }">
            {{ user.firstName }}
          </router-link>
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

<style scoped>
.navbarItem {
  display: flex;
  vertical-align: middle;
}
</style>
