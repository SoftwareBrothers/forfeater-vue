import Vue from "vue";
import VeeValidate from "vee-validate";
import router from "@/router";

import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faEdit)
library.add(faTrash)

Vue.use(VeeValidate);

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router: router,
  template: "<App/>",
  components: { App },
  render: h => h(App)
});
