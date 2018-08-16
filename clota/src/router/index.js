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
        //登录页面路由
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ '../pages/login/login.vue')
            , meta: {
                noFrame: true
            }
        },
    ],
    scrollBehaviorHandler (to,from,savedPosition) {
        return {
            x : 0,
            y : 0
        }
    }
});

const router = createRouter();

//更具新的路由，重置路由
export function resetRouter (routes) {
    const newRouter = createRouter();
    // the relevant part
    router.matcher = newRouter.matcher;
    router.addRoutes(routes);
}


export default router;
