//会员路由页面
export const wxMemberCardRoutes = [
    {
        path : '/wxMemberCard',
        name : 'cardRegister',
        component : () => import(/* webpackChunkName: "cardRegister" */ '../pages/index.vue'),
        children : [
            //会员注册
            {
                path : 'register',
                name : 'cardRegister',
                component : () => import(/* webpackChunkName: "cardRegister" */ '../pages/register/index.vue'),
                meta : {
                    title : 'cardRegister'
                }
            },
            // 完善信息
            {
                path : 'finishInfo',
                name : 'cardFinishInfo',
                component : () => import(/* webpackChunkName: "cardFinishInfo" */ '../pages/finishInfo/finishInfo.vue'),
                meta : {
                    title : 'cardFinishInfo'
                }
            }
        ]
    }
];
