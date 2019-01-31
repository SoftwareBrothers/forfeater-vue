import Vue from 'vue';
import VeeValidate from 'vee-validate';
import Message from 'buefy/dist/components/message';

import router from '@/router';
import store from '@/security/store';
import { i18n } from '@/config/i18n';

import '@/filters/index';
import 'buefy/dist/buefy.css';

import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { ClientTable } from 'vue-tables-2';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEdit,
  faTrash,
  faList,
  faComment,
  faPlus,
  faPrint
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faEdit);
library.add(faTrash);
library.add(faList);
library.add(faComment);
library.add(faPlus);
library.add(faPrint);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Message);
Vue.use(VeeValidate);
Vue.use(ClientTable, {}, false, 'bootstrap4', 'default');

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
});
