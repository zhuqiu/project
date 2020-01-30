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

import { Toast } from 'vant';

// 引入组件
// import WeuiVue from 'weui-vue'

// 引入样式
// import 'weui-vue/weui.css'

Vue.use(Vant);

Vue.use(Toast);

// Vue.use(WeuiVue);

Vue.prototype.$axios = axios;

router.beforeEach((to, from, next) => {
  // localStorage.clear();
  // return;

  Vue.prototype.dataInfo = JSON.parse(localStorage.getItem('data'));

  // if(to.name === 'Index' && !JSON.parse(localStorage.getItem('data'))){
  //   router.push({name: 'wxlogin'})
  // }

  //添加请求拦截器
  axios.interceptors.request.use(function (config) {
    return config
  }),function (error) {

    return Promise.reject(error)
  }
  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {

    if(response.data.code === '1001' ){
      router.replace({
        path: '/wxlogin',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
      localStorage.removeItem('data');
    }
  　// 对响应数据做点什么
  　return response
  }, function (error) {
  　// 对响应错误做点什么
  　return Promise.reject(error)
  });
  next();
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
