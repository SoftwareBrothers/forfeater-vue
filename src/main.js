import Vue from 'vue';
import VeeValidate from 'vee-validate';
import Buefy from 'buefy';
import { ClientTable } from 'vue-tables-2';
import router from '@/config/router';
import store from '@/config/store';
import i18n from '@/config/i18n';

import App from './App.vue';
import 'buefy/dist/buefy.css';
import '@/filters/index';
import Breadcrumbs from './components/Breadcrumbs';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faCheckCircle,
  faInfoCircle,
  faExclamationTriangle,
  faExclamationCircle,
  faArrowUp,
  faAngleRight,
  faAngleLeft,
  faAngleDown,
  faEye,
  faEyeSlash,
  faCaretDown,
  faCaretUp,
  faUpload,
  faEnvelope,
  faLock,
  faTrash,
  faEdit,
  faList,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faCheck,
  faCheckCircle,
  faInfoCircle,
  faExclamationTriangle,
  faExclamationCircle,
  faArrowUp,
  faAngleRight,
  faAngleLeft,
  faAngleDown,
  faEye,
  faEyeSlash,
  faCaretDown,
  faCaretUp,
  faUpload,
  faEnvelope,
  faLock,
  faTrash,
  faEdit,
  faList,
  faTimes,
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Buefy, {
  defaultIconComponent: 'font-awesome-icon',
  defaultIconPack: 'fas',
  customIconPacks: {
    fas: {
      sizes: {
        default: 'lg',
        'is-small': '1x',
        'is-medium': '2x',
        'is-large': '3x',
      },
    },
  },
});
Vue.use(VeeValidate);
Vue.use(ClientTable, {}, false, 'bulma');
Vue.component('Breadcrumbs', Breadcrumbs);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
