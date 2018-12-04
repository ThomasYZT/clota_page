//会员路由页面
export const wxMemberCardRoutes = [
    {
        path : '/wxMemberCard',
        name : 'cardRegister',
        component : () => import(/* webpackChunkName: "cardRegister" */ '../pages/index.vue'),
        children : [
            //会员登陆
            {
                path : 'register',
                name : 'cardRegister',
                component : () => import(/* webpackChunkName: "cardRegister" */ '../pages/register/register.vue'),
                meta : {
                    title : 'cardRegister'
                }
            }
        ]
    }
];
