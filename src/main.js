import Vue from 'vue'
import App from './App.vue'
import { router } from './router';
import store from './store';
import 'bootstrap';
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { GridPlugin } from "@syncfusion/ej2-vue-grids";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Vuesax from 'vuesax'


import VueApexCharts from 'vue-apexcharts'
//import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'vuesax/dist/vuesax.css'



import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faBars
} from '@fortawesome/free-solid-svg-icons';

import vuetify from './plugins/vuetify';



library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt,faBars);
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY ')
  }
})
Vue.config.productionTip = false;
Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts)
//Vue.use(Vuetify)
Vue.use(GridPlugin)
Vue.use(Vuesax, {
})
Vue.use(IconsPlugin)
Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(BootstrapVue)
new Vue({
  router,
  store,
  vuetify,

  render: h => h(App)
}).$mount('#app');
