import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import Index from '@/components/Index.vue'

import login from '@/components/login.vue'

import wxlogin from '@/components/wxLogin.vue'

import register from '@/components/register.vue'

import rechargecenter from '@/components/views/recharge-center.vue'

import extractcenter from '@/components/views/extract-center.vue'

import welfarecenter from '@/components/views/welfare-center.vue'

import groupcenter from '@/components/views/group-center.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'wxlogin',
      component: wxlogin
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/wxlogin',
      name: 'wxlogin',
      component: wxlogin
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/rechargecenter',
      name: 'rechargecenter',
      component: rechargecenter
    },
    {
      path: '/extractcenter',
      name: 'extractcenter',
      component: extractcenter
    },
    {
      path: '/welfarecenter',
      name: 'welfarecenter',
      component: welfarecenter
    },
    {
      path: '/groupcenter',
      name: 'groupcenter',
      component: groupcenter
    }
  ]
})
