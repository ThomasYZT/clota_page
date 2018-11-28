import Vue from 'vue';
import Router from 'vue-router';
//会员系统路由信息
import { memberRoutes } from '../member/router/index';
import { marketingRoutes } from '../marketing/router/index'

Vue.use(Router);
//生成新路由的方法
const createRouter = () => new Router({
    mode : 'history',
    base : '/clota/mobile',
    routes : [
        {
            path : '',
            redirect : {
                name : 'mobileLogin'
            }
        },
        {
            path : '/',
            redirect : {
                name : 'mobileLogin'
            }
        },
        //会员系统路由信息
        ...memberRoutes,
        //营销系统路由信息
        ...marketingRoutes
    ],
    scrollBehaviorHandler (to, from, savedPosition) {
        return {
            x : 0,
            y : 0
        };
    }
});

const router = createRouter();

export default router;
