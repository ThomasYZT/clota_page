import Vue from 'vue'
import Router from 'vue-router'
//登录
import login from '../pages/login/login.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
  ]
})
