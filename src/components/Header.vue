<template>
<header>
  <!-- Fixed navbar -->
  <nav class="navbar navbar-expand-md navbar-dark fixed-top">
      <router-link class="navbar-brand p-0" :to="{ name: 'Home' }">
        <img src="@/assets/images/logo.png" alt="logo" class="navbar-logo">
      </router-link>
    <router-link class="navbar-brand" :to="{ name: 'Home' }">Forfeater</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="">Vendors</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="">Users</a>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'About' }" class="nav-link">About</router-link>
        </li>
      </ul>

    </div>
  </nav>
</header>
</template>

<script>
</script>

<style lang="scss" scoped>
#logo {
  height: 50px;
  width: auto;
}
</style>
