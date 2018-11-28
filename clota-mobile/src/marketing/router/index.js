import store from "../../store/index";

//会员页面路由进入前的处理
export const marketRouterDeal = (to, from, next) => {
    next();
};
//会员路由页面
export const marketingRoutes = [
    {
        path : '/marketing',
        name : 'marketing',
        component : () => import(/* webpackChunkName: "marketing" */ '../pages/index.vue'),
        beforeEnter : marketRouterDeal
    }
];
