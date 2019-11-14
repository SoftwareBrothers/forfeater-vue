<template>
  <div id="app">
    <Header />
    <Notification></Notification>
    <main role="main">
      <router-view> </router-view>
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
<style lang="scss" scoped>
#app {
}
</style>
