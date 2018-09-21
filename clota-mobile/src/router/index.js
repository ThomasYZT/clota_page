import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';

Vue.use(Router);

// export default new Router({
//     routes: [
//         //登录页面路由
//         {
//             path: '/login',
//             name: 'login',
//             component: () => import(/* webpackChunkName: "login" */ '../pages/login/login.vue')
//             , meta: {
//                 noFrame: true
//             }
//         },
//     ]
// })


//生成新路由的方法
const createRouter = () => new Router({
    routes: [
        {
            path: '',
            //判断路由信息为空的时候，是否获取了权限信息，如果获取了，则跳转到第一个有权限的路由，如果没有权限信息，则跳转到一个没有权限的页面
            //如果是没有获取到用户信息，那么就直接跳转到登录页面
            // redirect: to => {
            //     if(Object.keys(store.getters.userInfo).length > 0){
            //         if(store.getters.routerInfo.length > 0){
            //             return {
            //                 path : store.getters.routerInfo[0].path
            //             }
            //         }
            //     }else{
            //         return {
            //             name : 'login'
            //         }
            //     }
            // }
        },
        {
            path: '/',
            //判断路由信息为空的时候，是否获取了权限信息，如果获取了，则跳转到第一个有权限的路由，如果没有权限信息，则跳转到一个没有权限的页面
            //如果是没有获取到用户信息，那么就直接跳转到登录页面
            // redirect: to => {
            //     if(Object.keys(store.getters.userInfo).length > 0){
            //         if(store.getters.routerInfo.length > 0){
            //             return {
            //                 path : store.getters.routerInfo[0].path
            //             }
            //         }
            //     }else{
            //         return {
            //             name : 'login'
            //         }
            //     }
            // }
        },
        {
            path: '/mobile/login',
            name: 'mobileLogin',
            component: () => import(/* webpackChunkName: "login" */ '../pages/login/login.vue'),
            meta: {
                noFrame: true
            }
        },
        {
            path: '/mobile/register',
            name: 'mobileRegister',
            component: () => import(/* webpackChunkName: "login" */ '../pages/register/register.vue'),
            meta: {
                noFrame: true
            }
        }
    ],
    scrollBehaviorHandler (to,from,savedPosition) {
        return {
            x : 0,
            y : 0
        }
    }
});

const router = createRouter();


export default router;
