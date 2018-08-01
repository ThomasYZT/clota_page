import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    //登录页面路由
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../pages/login/login.vue')
      ,meta: {
        noFrame: true
      }
    },
    // {
    //   path : '*',
    //   redirect : 'login'
    // },
  ]
})
