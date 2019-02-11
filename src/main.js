import Vue from 'vue';
import VeeValidate from 'vee-validate';
import Buefy from 'buefy';

import router from '@/config/router';
import store from '@/config/store';
import i18n from '@/config/i18n';

import '@/filters/index';

import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';

import { ClientTable } from 'vue-tables-2';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash, faList, faComment, faPlus, faPrint } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faEdit);
library.add(faTrash);
library.add(faList);
library.add(faComment);
library.add(faPlus);
library.add(faPrint);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Buefy, { defaultIconPack: 'fas' });
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
