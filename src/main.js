import Vue from "vue";
import VeeValidate from "vee-validate";
import router from "@/router";
import store from "@/security/store";

import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faTrash, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faEdit);
library.add(faTrash);
library.add(faList);

Vue.use(VeeValidate);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router: router,
  template: "<App/>",
  components: { App },
  store: store,
  render: h => h(App)
});
