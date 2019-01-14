import Vue from "vue";
import VeeValidate from "vee-validate";
import router from "@/router";
import store from "@/security/store";

import "@/filters/index";

import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";

import {ServerTable, ClientTable, Event} from 'vue-tables-2';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faTrash, faList, faComment, faPlus, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faEdit);
library.add(faTrash);
library.add(faList);
library.add(faComment);
library.add(faPlus);
library.add(faPrint);

Vue.use(VeeValidate);
Vue.use(ClientTable, {}, false, 'bootstrap4', 'default');
// Vue.use(ServerTable, [options = {}], [useVuex = false], [theme = 'bootstrap4'], [template = 'default']);

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
