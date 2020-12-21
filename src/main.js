import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from './plugins/axios';
import VueFileAgent from 'vue-file-agent';
import 'vue-file-agent/dist/vue-file-agent.css';
import { SlickList, SlickItem } from 'vue-slicksort';
import veeValidate from './plugins/veeValidate';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false;

// 파일 업로드 플러그인
Vue.use(VueFileAgent);
Vue.component('vfa-sortable-list', SlickList);
Vue.component('vfa-sortable-item', SlickItem);

// Alert 플러그인
Vue.use(VueSweetalert2);

// Axios 플러그인
Vue.use(axios);

// Input Validation 플러그인
Vue.component('ValidationProvider', veeValidate);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
