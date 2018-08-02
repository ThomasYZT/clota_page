/**
 * 静态路由列表
 * meta信息解释
 * noFrame表示不需要mainFrame的外壳
 */
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
  routes: [
    //登录
    {
      path : '/login',
      name : 'login',
      component: () => import(/* webpackChunkName: "login" */ '../pages/login/index.vue'),
      meta: {
        noFrame: true
      }
    }
  ]
})
