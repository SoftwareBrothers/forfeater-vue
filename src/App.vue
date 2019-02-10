<template>
  <div id="app">
    <Header/>
    <Notification/>
    <main role="main">
      <router-view/>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Notification from '@/components/Notification';

export default {
  name: 'app',
  components: { Header, Footer, Notification }
};
</script>

<style scoped>
@import './assets/css/styles.css';
body {
  background: #fafafa;
}
</style>
