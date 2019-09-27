<template>
  <div id="app">
    <Header />
    <Notification></Notification>
    <main role="main">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Notification from '@/components/Notification';

export default {
  name: 'App',
  components: { Header, Footer, Notification },
};
</script>
<style scoped>
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
main {
  flex-grow: 2;
}
</style>
