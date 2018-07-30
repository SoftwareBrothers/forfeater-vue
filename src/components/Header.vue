<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <router-link :to="{ name: 'Home' }" class="navbar-brand mx-auto">
    Forfiter - order your dream food!
  </router-link>   
  <router-link :to="{ name: 'About' }">About</router-link>
</nav>
</template>

<script>
</script>

<style lang="scss" scoped>
#logo {
  height: 50px;
  width: auto;
}
</style>
