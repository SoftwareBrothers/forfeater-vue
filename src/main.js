import Vue from "vue";
import router from "@/router";

import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router: router,
  template: "<App/>",
  components: { App },
  render: h => h(App)
});
