import store from "../../store/index";
import { wxCard } from './third-access';

//会员页面路由进入前的处理
export const memberRouterDeal = (to, from, next) => {
    //无操作的路由
    if (
        to.name === 'mobileLogin' //会员登录
        || to.name === 'activateCard' //激活会员卡
        || to.name === 'activateInfo' //填写激活会员卡信息
        || to.name === 'h5Pay' //c端支付
        || to.name === 'payStatus' //c端支付结果
        || to.name === 'mobileRegister' // 会员注册
        || to.name === 'wxActivateCard' // 微信会员卡激活
        || to.name === 'wxPay' // 微信支付
        || to.name === 'getCardUrl' // 获取卡
    ) {
        next();
    } else {
        //判断是否保存了用户信息和token，如果没有保存需要重新登录
        //获取保存到本地的用户信息、当前选择的卡信息
            let token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
            if (token && store.getters.userInfo && Object.keys(store.getters.userInfo).length > 0) {
                let query = to.query;
                if (query && Object.keys(query).length > 0 && query.card_id && query.openid && query.root && query.encrypt_code) {
                    //此处为从微信卡包菜单中直接登陆进入会员系统(当且仅当cardId,encrypt_code,root三个参数都存在时)
                    wxCard.wxCardLogin({ cardId : query.card_id, openId : query.openid, encryptCode : query.encrypt_code }).then((res) => {
                        store.commit('updateCardInfo',res);
                        next({
                            name : query.root,
                            query : {},
                        });
                    }).catch(() => {
                        next({
                            name : 'mobileLogin',
                            query : {
                                openId : query.openid,
                            },
                            replace : true,
                        });
                    });
                } else {
                    //此处为正常登陆进入会员系统
                    //判断vuex中是否保存了当前卡信息，如果没有保存则重新获取会员卡信息
                    if (store.getters.cardInfo && Object.keys(store.getters.cardInfo).length > 0 && store.getters.cardInfoList && store.getters.cardInfoList.length > 0) {
                        next();
                    } else {
                        //接口更新卡列表信息，更新vuex数据
                        store.dispatch('getCardListInfo').then(() => {
                            next();
                        }).catch(() => {
                            next({
                                name : 'mobileLogin',
                                replace : true,
                            });
                        });
                    }
                }
            } else {
                next({
                    name : 'mobileLogin',
                    replace : true,
                });
            }

    }
};
//会员路由页面
export const memberRoutes = [
    {
        module : 'member',
        path : '/member',
        name : 'mobileLogin',
        component : () => import(/* webpackChunkName: "login" */ '../pages/index.vue'),
        children : [
            //会员登录
            {
                path : 'login',
                name : 'mobileLogin',
                component : () => import(/* webpackChunkName: "login" */ '../pages/login/login.vue'),
                meta : {
                    title : 'memberLogin'
                }
            },
            //会员注册
            {
                path : 'register',
                name : 'mobileRegister',
                component : () => import(/* webpackChunkName: "login" */ '../pages/register/register.vue'),
                meta : {
                    title : 'register'
                }
            },
            //卡领取
            {
                path : 'getCardUrl',
                name : 'getCardUrl',
                component : () => import(/* webpackChunkName: "login" */ '../pages/getCardUrl/getCardUrl.vue'),
                meta : {
                    title : 'getCardUrl'
                }
            },
            //会员主页
            {
                path : 'home',
                name : 'home',
                component : () => import(/* webpackChunkName: "login" */ '../pages/home/home.vue'),
                meta : {
                    title : 'home'
                },
            },
            //会员账户
            {
                path : 'account',
                name : 'account',
                component : () => import(/* webpackChunkName: "account" */'../pages/account/index.vue'),
                meta : {
                    title : 'account'
                },
            },
            //账户充值
            {
                path : 'account/recharge',
                name : 'accountRecharge',
                component : () => import(/* webpackChunkName: "account" */'../pages/account/child/accountRecharge.vue'),
                meta : {
                    title : ''
                },
            },
            //个人信息
            {
                path : 'personInfo',
                name : 'personInfo',
                component : () => import(/* webpackChunkName: "personInfo" */'../pages/personInfo/index.vue'),
                meta : {
                    title : 'personInfo'
                },
            },
            //个人信息--修改手机号码
            {
                path : 'personInfo/changeMobile',
                name : 'changeMobile',
                component : () => import(/* webpackChunkName: "personInfo" */'../pages/personInfo/child/changePhone.vue'),
                meta : {
                    title : 'changePhone'
                },
            },
            //个人信息--修改证件号码
            {
                path : 'personInfo/changeId',
                name : 'changeId',
                component : () => import(/* webpackChunkName: "personInfo" */'../pages/personInfo/child/changeId.vue'),
                meta : {
                    title : 'changeIdNum'
                },
            },
            //个人信息--修改交易密码
            {
                path : 'personInfo/changeTradePass',
                name : 'changeTradePass',
                component : () => import(/* webpackChunkName: "personInfo" */'../pages/personInfo/child/setTradePass.vue'),
                meta : {
                    title : 'setTradePass'
                }
            },
            //个人信息--支付协议
            {
                path : 'personInfo/payAgreement',
                name : 'payAgreement',
                component : () => import(/* webpackChunkName: "personInfo" */'../pages/personInfo/child/payAgreement.vue'),
                meta : {
                    title : 'payAgreement'
                }
            },
            //个人信息--输入密码
            {
                path : 'personInfo/inputPass',
                name : 'inputPass',
                component : () => import(/* webpackChunkName: "personInfo" */'../pages/personInfo/child/input-pass.vue'),
                meta : {
                    title : 'setTradePass'
                }
            },
            //会员二维码
            {
                path : 'memberCode',
                name : 'memberCode',
                component : () => import(/* webpackChunkName: "personInfo" */'../pages/memberCode/index.vue'),
                meta : {
                    title : 'payQRcode'
                }
            },
            //会员权益
            {
                path : 'memberRight',
                name : 'memberRight',
                component : () => import(/* webpackChunkName: "memberRight" */'../pages/memberRight/memberRight.vue'),
                meta : {
                    title : 'memberRight'
                }
            },
            //资金明细
            {
                path : 'checkFlow',
                name : 'checkFlow',
                component : () => import(/* webpackChunkName: "memberRight" */'../pages/checkFlow/checkFlow.vue'),
                meta : {
                    title : 'checkFlow'
                }
            },
            //积分明细
            {
                path : 'integralDetail',
                name : 'integralDetail',
                component : () => import(/* webpackChunkName: "memberRight" */'../pages/integralDetail/integralDetail.vue'),
                meta : {
                    title : 'pointDetail'
                }
            },
            //安全设置 暂时不做
            /*{
				path: '/securitySetting',
				name: 'securitySetting',
				component: () => import(/!* webpackChunkName: "securitySetting" *!/'../pages/securitySetting/securitySetting.vue'),
			}*/
            //订单
            {
                path : 'order',
                name : 'order',
                component : () => import(/* webpackChunkName: "order" */'../pages/order/index.vue'),
                meta : {
                    title : 'myOrder'
                }
            },
            //订单详情
            {
                path : 'order/detail',
                name : 'orderDetail',
                component : () => import(/* webpackChunkName: "order" */'../pages/order/child/orderDetail.vue'),
                meta : {
                    title : 'orderDetail'
                }
            },
            //我的卡包
            {
                path : 'card',
                name : 'card',
                component : () => import(/* webpackChunkName: "order" */'../pages/card/index.vue'),
                meta : {
                    title : 'card'
                }
            },
            // // 会员卡二维码页面
            // {
            //     path : '/cardCode',
            //     name : 'cardCode',
            //     component : () => import(/* webpackChunkName: "order" */'../pages/cardCode/cardCode.vue'),
            //     meta : {
            //         title : '我的卡包'
            //     }
            // }
            //积分商城
            {
                path : 'integralMall',
                name : 'integralMall',
                component : () => import(/* webpackChunkName: "integralMall" */'../pages/integralMall/integralMall.vue'),
                meta : {
                    title : 'integralMall'
                }
            },
            //商品详情
            {
                path : 'goodDetail',
                name : 'goodDetail',
                component : () => import(/* webpackChunkName: "integralMall" */'../pages/integralMall/goodDetail.vue'),
                meta : {
                    title : 'goodDetail'
                }
            },
            //兑换商品
            {
                path : 'exchangeGood',
                name : 'exchangeGood',
                component : () => import(/* webpackChunkName: "integralMall" */'../pages/integralMall/exchangeGood.vue'),
                meta : {
                    title : 'exchangeGood'
                }
            },
            //兑换记录
            {
                path : 'exchangeRecord',
                name : 'exchangeRecord',
                component : () => import(/* webpackChunkName: "integralMall" */'../pages/integralMall/exchangeRecord.vue'),
                meta : {
                    title : 'conversionRecord'
                }
            },
            //激活会员卡
            {
                path : 'activateCard',
                name : 'activateCard',
                component : () => import(/* webpackChunkName: "integralMall" */'../pages/activateCard/index.vue'),
                meta : {
                    title : 'memberCardActivating'
                }
            },
            //填写激活信息
            {
                path : 'activateInfo',
                name : 'activateInfo',
                component : () => import(/* webpackChunkName: "integralMall" */'../pages/activateCard/child/activateInfo.vue'),
                meta : {
                    title : 'memberCardActivating'
                }
            },
            //填写微信卡包激活信息
            {
                path : 'wxActivateCard',
                name : 'wxActivateCard',
                component : () => import(/* webpackChunkName: "integralMall" */'../pages/wxActivateCard/index.vue'),
                meta : {
                    title : 'memberCardActivating'
                }
            },
            //h5支付跳转页
            {
                path : 'h5Pay',
                name : 'h5Pay',
                component : () => import(/* webpackChunkName: "integralMall" */'../pages/h5Pay/index.vue'),
                meta : {
                    title : 'h5Pay'
                }
            },
            //支付结果页面
            {
                path : 'payStatus',
                name : 'payStatus',
                component : () => import(/* webpackChunkName: "integralMall" */'../pages/h5Pay/payStatus.vue'),
                meta : {
                    title : 'payStatus'
                }
            },
            //跳转入园二维码
            {
                path : 'scenicCode',
                name : 'scenicCode',
                component : () => import(/* webpackChunkName: "integralMall" */'../pages/scenicCode/index.vue'),
                meta : {
                    title : 'scenicCode'
                }
            },
            //跳转入园二维码
            {
                path : 'wxPay',
                name : 'wxPay',
                component : () => import(/* webpackChunkName: "integralMall" */'../pages/wxPay/wxPay.vue'),
                meta : {
                    title : 'wxPay'
                }
            }
        ],
        beforeEnter : memberRouterDeal
    }
];
