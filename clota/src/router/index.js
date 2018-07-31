import Vue from 'vue'
import Router from 'vue-router'
//组织机构模块路由
import orgStructureRouter from './orgStructureRouter';

Vue.use(Router);

export default new Router({
  routes: [
    //登录页面路由
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../pages/login/login.vue'),
    },

    //组织机构模块路由
    ...orgStructureRouter,
  ]
})
