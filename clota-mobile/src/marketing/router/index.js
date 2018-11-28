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
            {
                path : 'register',
                name : 'marketingRegister',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/register/index.vue'),
                meta : {
                    title : 'marketingRegister'
                }
            },
            {
                path : 'register/success',
                name : 'marketingRegisterSuc',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/register/child/registerResult.vue'),
                meta : {
                    title : '注册成功'
                }
            },
            {
                path : 'login',
                name : 'marketingLogin',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/login/index.vue'),
                meta : {
                    title : 'login'
                }
            }
        ]
    }
];
