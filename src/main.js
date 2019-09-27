import Vue from 'vue';
import VeeValidate from 'vee-validate';
import Buefy from 'buefy';
// import { ClientTable } from 'vue-tables-2';
import router from '@/config/router';
import store from '@/config/store';
// import i18n from '@/config/i18n';

import App from './App.vue';
import 'buefy/dist/buefy.css';
import '@/filters/index';

Vue.use(Buefy);
Vue.use(VeeValidate);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  // i18n,
  render: h => h(App),
}).$mount('#app');
