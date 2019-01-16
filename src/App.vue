<template>
  <div id="app">
    <Header></Header>
    <main role="main">
      <router-view></router-view>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "app",
  components: {
    Header,
    Footer
  }
};
</script>

<style scoped>
@import "./assets/css/styles.css";
body {
  background: #fafafa;
}
</style>
