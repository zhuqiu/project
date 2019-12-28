// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'

import router from './router'

import 'lib-flexible/flexible'

import Vant from 'vant';

import axios from 'axios';

import 'vant/lib/index.css';

import '../static/css/common.css'

import '../static/js/mqtt.js'

Vue.use(Vant);

Vue.prototype.$axios = axios;





router.beforeEach((to, from, next) => {
  Vue.prototype.dataInfo = JSON.parse(localStorage.getItem('data'));
  if (to.path === '/') {
    next();
  } else {

    next();
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
