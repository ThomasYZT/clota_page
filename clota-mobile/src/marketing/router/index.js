import store from "../../store/index";

//会员页面路由进入前的处理
export const marketRouterDeal = (to, from, next) => {
    //meta信息上填写了notNeedCheck表示改路由不需要校验，直接进入
    if (to.meta && to.meta.notNeedCheck) {
        next();
    } else if (store.getters.marketToken) {//有token继续校验，没有则直接跳到登录页
        //vuex中如果用户信息为空，则需要重新获取用户信息，获取用户信息失败，则需要跳转到登录页面重新登录
        if (store.getters.marketUserInfo && Object.keys(store.getters.marketUserInfo).length > 0) {
            next();
        } else {
            store.dispatch('marketGetUserInfo').then(() => {
                next();
            }).catch(() => {
                next({
                    name : 'marketingLogin'
                });
            });
        }
    } else {
        next({
            name : 'marketingLogin'
        });
    }
};
//会员路由页面
/**
 * 路由的名字前缀必须是marketing开始
 */
/*
* meta参数说明
* title 网页的title标题
* hideTabbar  隐藏底部导航栏
* notNeedCheck 路由进入前是否需要进行登录状态检查
* menuBar 当前路由激活的底部导航栏
* */
export const marketingRoutes = [
    {
        path : '/marketing',
        // name : 'marketing',
        component : () => import(/* webpackChunkName: "marketing" */ '../pages/index.vue'),
        // beforeEnter : marketRouterDeal,
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
                    hideTabbar : true,
                    notNeedCheck : true
                }
            },
            //注册成功
            {
                path : 'register/success',
                name : 'marketingRegisterSuc',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/register/child/registerResult.vue'),
                meta : {
                    title : '注册成功',
                    hideTabbar : true,
                    notNeedCheck : true
                }
            },
            //登录
            {
                path : 'login',
                name : 'marketingLogin',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/login/index.vue'),
                meta : {
                    title : 'login',
                    hideTabbar : true,
                    notNeedCheck : true
                }
            },
            //重置密码
            {
                path : 'resetPassword',
                name : 'marketingResetPassword',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/resetPass/index.vue'),
                meta : {
                    title : '重置密码',
                    hideTabbar : true,
                    notNeedCheck : true
                }
            },
            //重置密码成功
            {
                path : 'resetPassword/success',
                name : 'marketingResetPasswordSuc',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/resetPass/child/resetPasswordResult.vue'),
                meta : {
                    title : '重置密码成功',
                    hideTabbar : true,
                    notNeedCheck : true
                }
            },
            //我的产品
            {
                path : 'product',
                name : 'marketingProduct',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/product/index.vue'),
                meta : {
                    title : '我的产品',
                    menuBar : 'product'
                }
            },
            //我的订单
            {
                path : 'order',
                name : 'marketingOrder',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/order/index.vue'),
                meta : {
                    title : '我的订单',
                    menuBar : 'order'
                }
            },
            //我的订单详情
            {
                path : 'order/detail',
                name : 'marketingOrderDetail',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/order/child/orderDetail.vue'),
                meta : {
                    title : '我的订单',
                    hideTabbar : true
                }
            },
            //提现申请结果
            {
                path : 'order/result',
                name : 'marketingDepositResult',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/order/child/depositResult.vue'),
                meta : {
                    title : '提现申请',
                    hideTabbar : true
                }
            },
            //我的中心页面
            {
                path : 'ownerCenter',
                name : 'marketingOwnerCenter',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/myCenter/index.vue'),
                meta : {
                    title : '我的',
                    menuBar : 'mine'
                }
            },
            //我的中心页面--可提现金额
            {
                path : 'ownerCenter/deposit',
                name : 'marketingDeposit',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/myCenter/child/deposit.vue'),
                meta : {
                    title : '可提现金额',
                    hideTabbar : true
                }
            },
            //我的中心页面--扫码购票页面
            {
                path : 'ownerCenter/qrCode',
                name : 'marketingQrCode',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/myCenter/child/qrCode.vue'),
                meta : {
                    title : '扫码购票',
                    hideTabbar : true
                }
            },
            //我的中心页面--设置收款账户
            {
                path : 'ownerCenter/setAccount',
                name : 'marketingSetAccount',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/myCenter/child/setDepositAccount.vue'),
                meta : {
                    title : '设置收款账户',
                    hideTabbar : true
                }
            },
            //我的中心页面--我的海报
            {
                path : 'ownerCenter/poster',
                name : 'marketingPoster',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/myCenter/child/poster.vue'),
                meta : {
                    title : '海报',
                    hideTabbar : true
                }
            },
            //我的中心页面--设置
            {
                path : 'ownerCenter/setting',
                name : 'marketingSetting',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/myCenter/child/setting.vue'),
                meta : {
                    title : '设置',
                    hideTabbar : true
                }
            },
            //我的中心页面--设置--修改手机号
            {
                path : 'ownerCenter/setting/changePhone',
                name : 'marketingChangePhone',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/myCenter/child/settingChild/changePhone.vue'),
                meta : {
                    title : '更改手机号',
                    hideTabbar : true
                }
            },
            //我的中心页面--设置--修改登录密码
            {
                path : 'ownerCenter/setting/changePassword',
                name : 'marketingChangePassword',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/myCenter/child/settingChild/changePassword.vue'),
                meta : {
                    title : '更改密码',
                    hideTabbar : true
                }
            },
            //我的中心页面--设置--修改登录密码结果页
            {
                path : 'ownerCenter/setting/changePassword/success',
                name : 'marketingChangePasswordSuc',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/myCenter/child/settingChild/changePasswordSuc.vue'),
                meta : {
                    title : '更改密码',
                    hideTabbar : true
                }
            },
            //游客下单
            {
                path : 'tourist',
                name : 'marketingTourist',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/touristOrder/index.vue'),
                meta : {
                    title : '广州长隆水上乐园',
                    hideTabbar : true,
                    notNeedCheck : true
                }
            },
            //游客下单
            {
                path : 'tourist/createOrder',
                name : 'marketingCreateOrder',
                component : () => import(/* webpackChunkName: "marketing" */ '../pages/touristOrder/child/createOrder.vue'),
                meta : {
                    title : '填写订单',
                    hideTabbar : true,
                    notNeedCheck : true
                }
            }
        ]
    }
];
