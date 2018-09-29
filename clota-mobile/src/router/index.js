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
            redirect : {
                name : 'mobileLogin'
            }
        },
        {
            path: '/',
            redirect : {
                name : 'mobileLogin'
            }
        },
        //会员登陆
        {
            path: '/login',
            name: 'mobileLogin',
            component: () => import(/* webpackChunkName: "login" */ '../pages/login/login.vue'),
            meta: {
                title: 'login'
            }
        },
        //会员注册
        {
            path: '/register',
            name: 'mobileRegister',
            component: () => import(/* webpackChunkName: "login" */ '../pages/register/register.vue'),
            meta: {
                noFrame: true
            }
        },
        //会员主页
        {
            path: '/home',
            name: 'home',
            component: () => import(/* webpackChunkName: "login" */ '../pages/home/home.vue'),
            meta: {
                title: 'home'
            }
        },
        //会员账户
        {
            path : '/account',
            name : 'account',
            component : () => import(/* webpackChunkName: "account" */'../pages/account/index.vue'),
            meta : {
                title : '账户'
            }
        },
        //账户充值
        {
            path : '/account/recharge',
            name : 'accountRecharge',
            component : () => import(/* webpackChunkName: "account" */'../pages/account/child/accountRecharge.vue'),
            meta : {
                title : '默认账户充值'
            }
        },
        //个人信息
        {
            path : '/personInfo',
            name : 'personInfo',
            component : () => import(/* webpackChunkName: "personInfo" */'../pages/personInfo/index.vue'),
            meta : {
                title : 'personInfo'
            }
        },
        //个人信息--修改手机号码
        {
            path : '/personInfo/changeMobile',
            name : 'changeMobile',
            component : () => import(/* webpackChunkName: "personInfo" */'../pages/personInfo/child/changePhone.vue'),
            meta : {
                title : 'changePhone'
            }
        },
        //个人信息--修改证件号码
        {
            path : '/personInfo/changeId',
            name : 'changeId',
            component : () => import(/* webpackChunkName: "personInfo" */'../pages/personInfo/child/changeId.vue'),
            meta : {
                title : '修改证件号'
            }
        },
        //个人信息--修改交易密码
        {
            path : '/personInfo/changeTradePass',
            name : 'changeTradePass',
            component : () => import(/* webpackChunkName: "personInfo" */'../pages/personInfo/child/setTradePass.vue'),
            meta : {
                title : 'setTradePass'
            }
        },
        //个人信息--输入密码
        {
            path : '/personInfo/inputPass',
            name : 'inputPass',
            component : () => import(/* webpackChunkName: "personInfo" */'../pages/personInfo/child/input-pass.vue'),
            meta : {
                title : 'setTradePass'
            }
        },
        //会员二维码
        {
            path : '/memberCode',
            name : 'memberCode',
            component : () => import(/* webpackChunkName: "personInfo" */'../pages/memberCode/index.vue'),
            meta : {
                title : 'payQRcode'
            }
        },
        //会员权益
        {
            path: '/memberRight',
            name: 'memberRight',
            component: () => import(/* webpackChunkName: "memberRight" */'../pages/memberRight/memberRight.vue'),
        },
        //资金明细
        {
            path: '/checkFlow',
            name: 'checkFlow',
            component: () => import(/* webpackChunkName: "memberRight" */'../pages/checkFlow/checkFlow.vue'),
        },
        //积分明细
        {
            path: '/integralDetail',
            name: 'integralDetail',
            component: () => import(/* webpackChunkName: "memberRight" */'../pages/integralDetail/integralDetail.vue'),
        },
        //安全设置 暂时不做
        /*{
            path: '/securitySetting',
            name: 'securitySetting',
            component: () => import(/!* webpackChunkName: "securitySetting" *!/'../pages/securitySetting/securitySetting.vue'),
        }*/
        //订单
        {
            path : '/order',
            name : 'order',
            component : () => import(/* webpackChunkName: "order" */'../pages/order/index.vue'),
            meta : {
                title : 'myOrder'
            }
        },
        //订单详情
        {
            path : '/order/detail',
            name : 'orderDetail',
            component : () => import(/* webpackChunkName: "order" */'../pages/order/child/orderDetail.vue'),
            meta : {
                title : 'orderDetail'
            }
        },
        //我的卡包
        {
            path : '/card',
            name : 'card',
            component : () => import(/* webpackChunkName: "order" */'../pages/card/index.vue'),
            meta : {
                title : '我的卡包'
            }
        },
        //会员卡二维码页面
        // {
        //     path : '/cardCode',
        //     name : 'cardCode',
        //     component : () => import(/* webpackChunkName: "order" */'../pages/cardCode/cardCode.vue'),
        //     meta : {
        //         title : '我的卡包'
        //     }
        // }
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
