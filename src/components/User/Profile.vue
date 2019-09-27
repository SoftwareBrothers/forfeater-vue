<template>
  <div class="columns is-centered">
    <div class="column is-one-quarter">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img
                  src="https://bulma.io/images/placeholders/96x96.png"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{ fullname }}</p>
              <p class="subtitle is-6">{{ user.email }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="container">
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">My profile</h1>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-sm-12">
          <h2>{{ user.firstName }} {{ user.lastName }}</h2>
          <p><strong>E-mail:</strong> {{ user.email }}</p>
          <p><strong>Role:</strong> {{ user.role }}</p>
          <router-link
            class="nav-link btn btn-warning btn-custom col-white"
            :to="{ name: 'UserChangePassword' }"
            >Change password</router-link
          >
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    fullname() {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
  },
  created() {},
};
</script>
