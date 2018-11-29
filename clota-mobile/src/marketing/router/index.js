import store from "../../store/index";

//会员页面路由进入前的处理
export const marketRouterDeal = (to, from, next) => {
    console.log(to)
    next();
};
//会员路由页面
/**
 * 路由的名字前缀必须是marketing开始
 * @type {*[]}
 */
export const marketingRoutes = [
    {
        path : '/marketing',
        // name : 'marketing',
        component : () => import(/* webpackChunkName: "marketing" */ '../pages/index.vue'),
        beforeEnter : marketRouterDeal,
        redirect : {
            name : 'marketingRegister'
        },
        children : [
            //注册
            {
                path : 'register',
                name : 'marketingRegister',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/register/index.vue'),
                meta : {
                    title : 'marketingRegister',
                    hideTabbar : true
                }
            },
            //注册成功
            {
                path : 'register/success',
                name : 'marketingRegisterSuc',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/register/child/registerResult.vue'),
                meta : {
                    title : '注册成功',
                    hideTabbar : true
                }
            },
            //登录
            {
                path : 'login',
                name : 'marketingLogin',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/login/index.vue'),
                meta : {
                    title : 'login',
                    hideTabbar : true
                }
            },
            //重置密码
            {
                path : 'resetPassword',
                name : 'marketingResetPassword',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/resetPass/index.vue'),
                meta : {
                    title : '重置密码',
                    hideTabbar : true
                }
            },
            //重置密码成功
            {
                path : 'resetPassword/success',
                name : 'marketingResetPasswordSuc',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/resetPass/child/resetPasswordResult.vue'),
                meta : {
                    title : '重置密码成功',
                    hideTabbar : true
                }
            },
            //我的产品
            {
                path : 'product',
                name : 'marketingProduct',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/product/index.vue'),
                meta : {
                    title : '我的产品'
                }
            },
            //我的订单
            {
                path : 'order',
                name : 'marketingOrder',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/order/index.vue'),
                meta : {
                    title : '我的订单'
                }
            }
        ]
    }
];
