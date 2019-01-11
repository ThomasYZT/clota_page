/**
 * 会员管理菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * iconClass 图标类名
 * rightPath 菜单点亮路径,格式为 menuName.menuName 第一个menuName表示一级点亮的菜单，第二个menuName表示当前点亮的左侧菜单（不管层级有多深）
 * isMenu 是否是菜单
 * isStaticMenu 表示不需要权限的菜单，如果配置了这个属性，可以不用再配置是_name
 */
//一级菜单的menuname
let topMenuName = 'memberHome';
export default {
    memberMange : {
        path : '/memberManage',
        component : () => import(/* webpackChunkName: "memberManageInit" */ '../../pages/memberManage/index.vue'),
        meta : {
            _name : 'members',
            menuName : 'memberHome',
            rightPath : topMenuName + '.' + 'memberHome',
            isMenu : true
        },
        children : {
            memberHome : {
                //会员管理--会员主页
                path : '/memberManage/home',
                name : 'memberHome',
                component : () => import(/* webpackChunkName: "memberManageInit" */ '../../pages/memberManage/home/home.vue'),
                meta : {
                    menuName : 'memberHome', //lang.config.js 里面的语言键值
                    _name : 'members-index',
                    iconClass : 'icon-home',
                    rightPath : topMenuName + '.' + 'memberHome',
                    isMenu : true
                },
            },
            //新开会员卡
            openCard : {
                path : '/memberManage/openNewCard',
                name : 'openNewCard',
                component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/newCard/index.vue'),
                meta : {
                    menuName : 'openNewCard', //lang.config.js 里面的语言键值
                    _name : 'members-card',
                    iconClass : 'icon-open-new-card',
                    rightPath : topMenuName + '.' + 'openNewCard',
                    isMenu : true
                },
                children : {
                    //会员管理--新开会员卡
                    newCard : {
                        path : '/memberManage/newCard',
                        name : 'newCard',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/newCard/openMemberCard.vue'),
                        meta : {
                            menuName : 'newCard', //lang.config.js 里面的语言键值
                            _name : 'new-card',
                            rightPath : topMenuName + '.' + 'newCard',
                            isMenu : true
                        }
                    },
                    //会员管理--新开会员卡--批量开卡
                    newBatchCard : {
                        path : '/memberManage/newCard/batch',
                        name : 'newBatchCard',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/newCard/batchCard.vue'),
                        meta : {
                            menuName : 'newBatchCard', //lang.config.js 里面的语言键值
                            _name : 'batchNewCard',
                            rightPath : topMenuName + '.' + 'newCard',
                        },
                    },
                    //会员管理--新开会员卡--续期
                    cardRenewal : {
                        path : '/memberManage/newCard/renewal',
                        name : 'renewal',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/newCard/renewal.vue'),
                        meta : {
                            menuName : 'renewal', //lang.config.js 里面的语言键值
                            _name : 'new-card',
                            rightPath : topMenuName + '.' + 'newCard',
                        },
                    },
                    //会员管理--新开会员卡--申请关联实体卡
                    associateEntityCard : {
                        path : '/memberManage/newCard/associate',
                        name : 'associateEntityCard',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/newCard/associateEntityCard.vue'),
                        meta : {
                            menuName : 'associateEntityCard', //lang.config.js 里面的语言键值
                            _name : 'associatedEntityCard',
                            rightPath : topMenuName + '.' + 'newCard',
                        },
                    },
                    //会员管理--新开会员卡--关联实体卡
                    applyAssociateEntityCard : {
                        path : '/memberManage/newCard/applyAssociateCard',
                        name : 'applyAssociateCard',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/newCard/child/applyForAssociateEntityCard.vue'),
                        meta : {
                            menuName : 'applyAssociateCard', //lang.config.js 里面的语言键值
                            _name : 'associatedEntityCard',
                            rightPath : topMenuName + '.' + 'newCard',
                        },
                    },
                    //会员管理--新开会员卡--补卡
                    replenishCard : {
                        path : '/memberManage/newCard/replenishCard',
                        name : 'replenishCard',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/newCard/reissueCard.vue'),
                        meta : {
                            menuName : 'replenishCard', //lang.config.js 里面的语言键值
                            _name : 'supplementCard',
                            rightPath : topMenuName + '.' + 'newCard',
                        },
                    },
                    //会员管理--新开会员卡--申请补卡
                    applyReissuceCard : {
                        path : '/memberManage/newCard/applyReissueCard',
                        name : 'applyReissuceCard',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/newCard/child/applyReissuceCard.vue'),
                        meta : {
                            menuName : 'applyReissuceCard', //lang.config.js 里面的语言键值
                            _name : 'supplementCard',
                            rightPath : topMenuName + '.' + 'newCard',
                        },
                    },
                    //会员管理--新开会员卡--挂失
                    reportLoss : {
                        path : '/memberManage/newCard/reportLoss',
                        name : 'reportLoss',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/newCard/applyCardForLostList.vue'),
                        meta : {
                            menuName : 'reportLoss', //lang.config.js 里面的语言键值
                            _name : 'reportLoss',
                            rightPath : topMenuName + '.' + 'newCard',
                        },
                    },
                    //会员管理--新开会员卡--挂失申请
                    applyForLost : {
                        path : '/memberManage/newCard/applyForLost',
                        name : 'applyForLost',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/newCard/child/applyForLost.vue'),
                        meta : {
                            menuName : 'reportLoss', //lang.config.js 里面的语言键值
                            _name : 'reportLoss',
                            rightPath : topMenuName + '.' + 'newCard',
                        },
                    },
                    //会员管理--新开会员卡--退卡
                    refundedCard : {
                        path : '/memberManage/newCard/refunded',
                        name : 'refundedCard',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/newCard/refundedCard.vue'),
                        meta : {
                            menuName : 'refundedCard', //lang.config.js 里面的语言键值
                            _name : 'backCard',
                            rightPath : topMenuName + '.' + 'newCard',
                        },
                    },
                    //会员管理--新开会员卡--批量退卡
                    batchRefundedCard : {
                        path : '/memberManage/newCard/batchRefund',
                        name : 'batchRefundCard',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/newCard/child/batchReturnCard.vue'),
                        meta : {
                            menuName : 'refundedCard', //lang.config.js 里面的语言键值
                            _name : 'batchNewCard',
                            rightPath : topMenuName + '.' + 'newCard',
                        },
                    },
                    //会员管理--新开会员卡--申请退卡
                    applyRefundedCard : {
                        path : '/memberManage/newCard/applyRefunded',
                        name : 'applyRefundedCard',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/newCard/child/applyRefundCard.vue'),
                        meta : {
                            menuName : 'applyRefundedCard', //lang.config.js 里面的语言键值
                            _name : 'new-card',
                            rightPath : topMenuName + '.' + 'newCard',
                        },
                    },
                    //会员管理--新开会员卡--在线交易记录
                    tradeOnlineRecord : {
                        path : '/memberManage/newCard/tradeRecord',
                        name : 'tradeRecord',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/newCard/tradeRecord.vue'),
                        meta : {
                            menuName : 'tradeRecord', //lang.config.js 里面的语言键值
                            _name : 'transaction-record',
                            rightPath : topMenuName + '.' + 'tradeRecord',
                            isMenu : true
                        },
                    },
                }
            },
            memberInfo : {
                //会员管理--会员信息
                path : '/memberManage/infoList',
                name : 'memberInfo',
                component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/information/information.vue'),
                meta : {
                    menuName : 'memberInfo', //lang.config.js 里面的语言键值
                    _name : 'members-info',
                    iconClass : 'icon-people',
                    rightPath : topMenuName + '.' + 'memberInfo',
                    isMenu : true
                },
            },
            addMember : {
                //会员管理--会员信息--新增会员
                path : '/memberManage/add',
                name : 'addMember',
                component : () => import(/* webpackChunkName: "memberInfo" */ '../../pages/memberManage/information/child/addMember.vue'),
                meta : {
                    menuName : 'memberInfo', //lang.config.js 里面的语言键值
                    _name : 'modifyMembersInfo',
                    rightPath : topMenuName + '.' + 'memberInfo',
                },
            },
            memberInfoDetail : {
                //会员管理--会员信息--会员详情
                path : '/memberManage/detail',
                name : 'infoDetail',
                component : () => import(/* webpackChunkName: "memberInfo" */ '../../pages/memberManage/information/child/detail.vue'),
                meta : {
                    menuName : 'memberInfo', //lang.config.js 里面的语言键值
                    _name : 'members-info',
                    rightPath : topMenuName + '.' + 'memberInfo'
                },
            },
            memberInfoCard : {
                //会员管理--会员信息--会员卡包
                path : '/memberManage/card',
                name : 'infoCard',
                component : () => import(/* webpackChunkName: "memberInfo" */ '../../pages/memberManage/information/child/card.vue'),
                meta : {
                    menuName : 'memberInfo', //lang.config.js 里面的语言键值
                    _name : 'members-info',
                    rightPath : topMenuName + '.' + 'memberInfo'
                },
            },
            memberInfoInteg : {
                //会员管理--会员信息--个人积分交易明细
                path : '/memberManage/intega',
                name : 'infoInteg',
                component : () => import(/* webpackChunkName: "memberInfo" */ '../../pages/memberManage/information/child/integDetail.vue'),
                meta : {
                    menuName : 'memberInfo', //lang.config.js 里面的语言键值
                    _name : 'members-info',
                    rightPath : topMenuName + '.' + 'memberInfo'
                },
            },
            infoFund : {
                //会员管理--会员信息--个人资金交易明细
                path : '/memberManage/perFundDetail',
                name : 'infoFund',
                component : () => import(/* webpackChunkName: "memberInfo" */ '../../pages/memberManage/information/child/fundDetail.vue'),
                meta : {
                    menuName : 'memberInfo', //lang.config.js 里面的语言键值
                    _name : 'members-info',
                    rightPath : topMenuName + '.' + 'memberInfo'
                },
            },
            infoRate : {
                //会员管理--会员信息--享受积分、折扣率信息
                path : '/memberManage/integral',
                name : 'infoRate',
                component : () => import(/* webpackChunkName: "memberInfo" */ '../../pages/memberManage/information/child/rate.vue'),
                meta : {
                    menuName : 'memberInfo', //lang.config.js 里面的语言键值
                    _name : 'members-info',
                    rightPath : topMenuName + '.' + 'memberInfo'
                },
            },
            myOrder : {
                //会员管理--会员信息--我的订单
                path : '/memberManage/order',
                name : 'myOrder',
                component : () => import(/* webpackChunkName: "memberInfo" */ '../../pages/memberManage/information/child/orders.vue'),
                meta : {
                    menuName : 'memberInfo', //lang.config.js 里面的语言键值
                    _name : 'members-info',
                    rightPath : topMenuName + '.' + 'memberInfo'
                },
            },
            orderDetail : {
                //会员管理--会员信息--我的订单--订单详情
                path : '/memberManage/order/detail',
                name : 'orderDetail',
                component : () => import(/* webpackChunkName: "memberInfo" */ '../../pages/memberManage/information/child/orderDetail.vue'),
                meta : {
                    menuName : 'memberInfo', //lang.config.js 里面的语言键值
                    _name : 'members-info',
                    rightPath : topMenuName + '.' + 'memberInfo'
                },
            },

            integration : {
                //会员管理--会员积分--三级菜单
                path : '/memberManage/point',
                component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/integration/index.vue'),
                meta : {
                    menuName : 'memberPoints', //lang.config.js 里面的语言键值
                    _name : 'members-point',
                    iconClass : 'icon-diamond',
                    rightPath : topMenuName + '.' + 'memberPoints',
                    isMenu : true
                },
                children : {
                    integ : {
                        //会员管理--会员积分--积分、折扣率设置
                        path : '/memberManage/point/discount',
                        name : 'integration',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/integration/integration.vue'),
                        meta : {
                            menuName : 'integration', //lang.config.js 里面的语言键值
                            _name : 'point-setting',
                            rightPath : topMenuName + '.' + 'integration',
                            isMenu : true
                        },
                    },
                    specialMember : {
                        //会员管理--会员积分--特殊会员权益管理
                        path : '/memberManage/point/specialMem',
                        name : 'specialMember',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/integration/specialMember.vue'),
                        meta : {
                            menuName : 'specialMember', //lang.config.js 里面的语言键值
                            _name : 'staff-setting',
                            rightPath : topMenuName + '.' + 'specialMember',
                            isMenu : true
                        },
                    },
                    //节假日特殊时期积分、折扣率设置
                    activityIntegration : {
                        path : '/memberManage/point/activity',
                        name : 'activityIntegrate',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/integration/activityIntegration.vue'),
                        meta : {
                            menuName : 'activityIntegrate', //lang.config.js 里面的语言键值
                            _name : 'activity-point-setting',
                            rightPath : topMenuName + '.' + 'activityIntegrate',
                            isMenu : true
                        },
                    },
                    setRate : {
                        //会员管理--会员积分--设置积分、折扣率
                        path : '/memberManage/point/memberRate',
                        name : 'setRate',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/integration/child/setRate.vue'),
                        meta : {
                            menuName : 'integration', //lang.config.js 里面的语言键值
                            _name : 'point-setting',
                            rightPath : topMenuName + '.' + 'integration',
                        },
                    },
                    //会员管理--会员积分--特殊节日设置积分、折扣率
                    activitySetRate : {
                        path : '/memberManage/point/activity/store',
                        name : 'activityStore',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/integration/child/setRate.vue'),
                        meta : {
                            menuName : 'activityStore', //lang.config.js 里面的语言键值
                            _name : 'activity-point-setting',
                            rightPath : topMenuName + '.' + 'activityIntegrate',
                        },
                    },
                    setProductRate : {
                        //会员管理--会员积分--设置积分、折扣率--按类型/产品
                        path : '/memberManage/point/proRate',
                        name : 'setProductRate',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/integration/child/setProductRate.vue'),
                        meta : {
                            menuName : 'integration', //lang.config.js 里面的语言键值
                            _name : 'point-setting',
                            rightPath : topMenuName + '.' + 'integration',
                        },
                    },
                    //会员管理--会员积分--特殊活动设置积分、折扣率--按类型/产品
                    activitySetProductRate : {
                        path : '/memberManage/point/activity/proRate',
                        name : 'activitySetProductRate',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/integration/child/setProductRate.vue'),
                        meta : {
                            menuName : 'activitySetProductRate', //lang.config.js 里面的语言键值
                            _name : 'activity-point-setting',
                            rightPath : topMenuName + '.' + 'activityIntegrate',
                        },
                    },
                    linkSpeMember : {
                        //会员管理--会员积分--特殊会员权益管理--关联会员信息
                        path : '/memberManage/point/link',
                        name : 'linkSpeMember',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/integration/child/linkSpeMember.vue'),
                        meta : {
                            menuName : 'memberPoints', //lang.config.js 里面的语言键值
                            _name : 'point-setting',
                            rightPath : topMenuName + '.' + 'specialMember',
                        },
                    },
                }
            },

            card : {
                //会员管理--会员卡券
                path : '/memberManage/coupon/card',
                name : 'card',
                component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/card/card.vue'),
                meta : {
                    menuName : 'card', //lang.config.js 里面的语言键值
                    _name : 'members-coupon',
                    iconClass : 'icon-card',
                    rightPath : topMenuName + '.' + 'card',
                    isMenu : true
                },
            },
            addCard : {
                //会员管理--会员卡券--新增卡劵
                path : '/memberManage/coupon/add',
                name : 'addCard',
                component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/card/addCard.vue'),
                meta : {
                    menuName : 'card', //lang.config.js 里面的语言键值
                    _name : 'addMembersCoupon',
                    rightPath : topMenuName + '.' + 'card',
                },
            },
            fund : {
                //会员管理--储值管理--三级菜单
                path : '/memberManage/fiance',
                component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/fund/index.vue'),
                meta : {
                    menuName : 'financialManagement', //lang.config.js 里面的语言键值
                    _name : 'members-storage',
                    iconClass : 'icon-print',
                    rightPath : topMenuName + '.' + 'financialManagement',
                    isMenu : true
                },
                children : {
                    fundInfo : {
                        //会员管理--储值管理--储值信息
                        path : '/memberManage/fiance/fundInfo',
                        name : 'fundInfo',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/fund/fundInfo.vue'),
                        meta : {
                            menuName : 'fundInfo', //lang.config.js 里面的语言键值
                            _name : 'storage-account',
                            rightPath : topMenuName + '.' + 'fundInfo',
                            isMenu : true
                        },
                    },
                    perFundInfo : {
                        //会员管理--会员信息--个人资金交易明细
                        path : '/memberManage/fundInfo/perFundDetail',
                        name : 'perFundDetail',
                        component : () => import(/* webpackChunkName: "memberInfo" */ '../../pages/memberManage/information/child/fundDetail.vue'),
                        meta : {
                            menuName : 'perFundDetail', //lang.config.js 里面的语言键值
                            _name : 'storage-account',
                            rightPath : topMenuName + '.' + 'fundInfo'
                        },
                    },
                    //会员管理-账户资金交易明细
                    accountFianceDetail : {
                        path : '/memberManage/fiance/account/fianceDetail',
                        name : 'fianceDetail',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/fund/fundDetail.vue'),
                        meta : {
                            menuName : 'fund', //lang.config.js 里面的语言键值
                            _name : 'storage-account-detail',
                            rightPath : topMenuName + '.' + 'fundInfo',
                        },
                    },
                    funds : {
                        //会员管理--储值管理--储值明细
                        path : '/memberManage/fiance/fund',
                        name : 'fund',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/fund/fund.vue'),
                        meta : {
                            menuName : 'fund', //lang.config.js 里面的语言键值
                            _name : 'storage-account',
                            rightPath : topMenuName + '.' + 'fundInfo',
                        },
                    },
                    fundDetail : {
                        //会员管理--储值管理--资金明细
                        path : '/memberManage/fiance/fundDetail',
                        name : 'fundDetail',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/fund/fundDetail.vue'),
                        meta : {
                            menuName : 'fundDetail', //lang.config.js 里面的语言键值
                            _name : 'storage-account-detail',
                            rightPath : topMenuName + '.' + 'fundDetail',
                            isMenu : true
                        },
                    },
                    financialManagement : {
                        //会员管理--储值管理--转账
                        path : '/memberManage/fiance/transfer',
                        name : 'transfer',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/fund/financialManagement.vue'),
                        meta : {
                            menuName : 'transfer', //lang.config.js 里面的语言键值
                            _name : 'queryStorageTransfer',
                            rightPath : topMenuName + '.' + 'transfer',
                            isMenu : true
                        },
                    },
                    transferRecord : {
                        //会员管理--储值管理--财务管理--转账记录
                        path : '/memberManage/fiance/record',
                        name : 'transferRecord',
                        component : () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/fund/child/transferRecord.vue'),
                        meta : {
                            menuName : 'financialManagement', //lang.config.js 里面的语言键值
                            _name : 'operateTransfer',
                            rightPath : topMenuName + '.' + 'transfer',
                        },
                    },
                }
            },
            //会员管理--基础设置--实体卡管理
            entityCardControle : {
                path : '/memberManage/entityCard',
                name : 'cardManagement',
                component : () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/entityCardControl.vue'),
                meta : {
                    menuName : 'cardManagement', //lang.config.js 里面的语言键值
                    _name : 'entity-card',
                    rightPath : topMenuName + '.' + 'cardManagement',
                    iconClass : 'icon-card',
                    isMenu : true
                },
            },
            //会员管理--基础设置--实体卡管理--批量导入
            importEntityCcard : {
                path : '/memberManage/entityCard/import',
                name : 'importEntityCard',
                component : () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/importEntityCard.vue'),
                meta : {
                    menuName : 'importEntityCard', //lang.config.js 里面的语言键值
                    _name : 'uploadEntityCard',
                    rightPath : topMenuName + '.' + 'cardManagement'
                },
            },
            memberSetting : {
                //会员管理--基础设置
                path : '/memberManage/initializationSettings',
                component : () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/index.vue'),
                meta : {
                    menuName : 'initializationSettings', //lang.config.js 里面的语言键值
                    _name : 'init-setting',
                    iconClass : 'icon-setting',
                    rightPath : topMenuName + '.' + 'initializationSettings',
                    isMenu : true
                },
                children : {
                    basicSetting : {
                        //会员管理--基础设置
                        path : '/memberManage/basic',
                        name : 'memberSetting',
                        component : () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/setting.vue'),
                        meta : {
                            menuName : 'memberSetting', //lang.config.js 里面的语言键值
                            _name : 'basic-setting',
                            rightPath : topMenuName + '.' + 'memberSetting',
                            isMenu : true
                        },
                    },
                    // 会员3期暂时去掉
                    // //会员管理--基础设置--实体卡管理
                    // entityCardControle: {
                    //     path: '/memberManage/entityCard',
                    //     name: 'entityCard',
                    //     component: () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/entityCardControl.vue'),
                    //     meta: {
                    //         menuName: 'entityCard', //lang.config.js 里面的语言键值
                    //         _name: 'basic-setting',
                    //         rightPath: topMenuName + '.' + 'memberSetting',
                    //     },
                    // },
                    // 会员3期暂时去掉
                    // //会员管理--基础设置--实体卡管理--批量导入
                    // importEntityCcard : {
                    //     path : '/memberManage/entityCard/import',
                    //     name : 'importEntityCard',
                    //     component : () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/importEntityCard.vue'),
                    //     meta : {
                    //         menuName : 'importEntityCard', //lang.config.js 里面的语言键值
                    //         _name : 'basic-setting',
                    //         rightPath : topMenuName + '.' + 'cardManagement'
                    //     },
                    // },
                    //基础设置--会员卡可用范围
                    cardScopeSetting : {
                        path : '/memberManage/cardScope',
                        name : 'cardScopeSetting',
                        component : () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/cardScope.vue'),
                        meta : {
                            menuName : 'cardScopeSetting', //lang.config.js 里面的语言键值
                            _name : 'card-range',
                            rightPath : topMenuName + '.' + 'cardScopeSetting',
                            isMenu : true
                        },
                    },
                    // channelSetting: {
                    //     //会员管理--渠道设置
                    //     path: '/memberManage/channel',
                    //     name: 'channelSetting',
                    //     component: () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/channelSetting.vue'),
                    //     meta: {
                    //         menuName: 'channelSetting', //lang.config.js 里面的语言键值
                    //         _name: 'channel-setting',
                    //         rightPath : topMenuName + '.' + 'channelSetting',
                    //         isMenu : true
                    //     },
                    // },
                    //会员管理--会员类别设置
                    categorySetting : {
                        path : '/memberManage/category',
                        name : 'memCardManagement',
                        component : () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/categorySetting.vue'),
                        meta : {
                            menuName : 'memCardManagement', //lang.config.js 里面的语言键值
                            _name : 'card-manage',
                            rightPath : topMenuName + '.' + 'memCardManagement',
                            isMenu : true
                        },
                    },
                    levelSetting : {
                        //会员管理--会员级别
                        path : '/memberManage/category/level',
                        name : 'levelSetting',
                        component : () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/levelSetting.vue'),
                        meta : {
                            menuName : 'levelSetting', //lang.config.js 里面的语言键值
                            _name : 'card-manage',
                            rightPath : topMenuName + '.' + 'memCardManagement',
                        },
                    },
                    growthSetting : {
                        //会员管理--成长值设置
                        path : '/memberManage/growth',
                        name : 'growthSetting',
                        component : () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/growthSetting.vue'),
                        meta : {
                            menuName : 'growthSetting', //lang.config.js 里面的语言键值
                            _name : 'growth-setting',
                            rightPath : topMenuName + '.' + 'growthSetting',
                            isMenu : true
                        },
                    },
                    fundSetting : {
                        //会员管理--储值设置
                        path : '/memberManage/setting/fund',
                        name : 'fundSetting',
                        component : () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/fundSetting.vue'),
                        meta : {
                            menuName : 'fundSetting', //lang.config.js 里面的语言键值
                            _name : 'storage-setting',
                            rightPath : topMenuName + '.' + 'fundSetting',
                            isMenu : true
                        },
                    },
                    consumeSetting : {
                        //会员管理--积分消费管理
                        path : '/memberManage/consume',
                        name : 'consumeSetting',
                        component : () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/consumeSetting.vue'),
                        meta : {
                            menuName : 'consumeSetting', //lang.config.js 里面的语言键值
                            _name : 'point-manage',
                            rightPath : topMenuName + '.' + 'consumeSetting',
                            isMenu : true
                        },
                    },
                    //初始化设置-产品类别设置
                    productTypeSetting : {
                        //会员管理--积分消费管理
                        path : '/memberManage/productTypeSetting',
                        name : 'productTypeSetting',
                        component : () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/productTypeSetting.vue'),
                        meta : {
                            menuName : 'productTypeSetting', //lang.config.js 里面的语言键值
                            _name : 'product-type',
                            rightPath : topMenuName + '.' + 'productTypeSetting',
                            isMenu : true
                        },
                    },
                    //初始化设置-会员权益设置
                    memberRightsSetting : {
                        path : '/memberManage/memRights',
                        name : 'memberRights',
                        component : () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/memberRightsSetting.vue'),
                        meta : {
                            menuName : 'memberRights', //lang.config.js 里面的语言键值
                            _name : 'member-right',
                            rightPath : topMenuName + '.' + 'memberRights',
                            isMenu : true
                        },
                    },
                    //初始化设置-会员活动
                    memberActivitySetting : {
                        path : '/memberManage/memActivity',
                        name : 'memberActivity',
                        component : () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/memberActivity.vue'),
                        meta : {
                            menuName : 'memberActivity', //lang.config.js 里面的语言键值
                            _name : 'member-activity',
                            rightPath : topMenuName + '.' + 'memberActivity',
                            isMenu : true
                        },
                    },
                    //初始化设置-会员活动-短信发送记录
                    smsSendRecord : {
                        path : '/memberManage/smsSendRecord',
                        name : 'smsSendRecord',
                        component : () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/smsSendRecord.vue'),
                        meta : {
                            menuName : 'smsSendRecord', //lang.config.js 里面的语言键值
                            _name : 'member-activity',
                            rightPath : topMenuName + '.' + 'memberActivity'
                        },
                    },
                    //初始化设置-会员活动-短信发送记录详情
                    smsSendRecordDetail : {
                        path : '/memberManage/smsSendRecord/detail',
                        name : 'smsSendRecordDetail',
                        component : () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/smsSendRecordDetail.vue'),
                        meta : {
                            menuName : 'smsSendRecordDetail', //lang.config.js 里面的语言键值
                            _name : 'member-activity',
                            rightPath : topMenuName + '.' + 'memberActivity'
                        },
                    },
                    paymentProtocol : {
                        //会员管理--基础设置--支付协议设置
                        path : '/memberManage/paymentProtocol',
                        name : 'paymentProtocol',
                        component : () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/paymentProtocol.vue'),
                        meta : {
                            menuName : 'entityCard', //lang.config.js 里面的语言键值
                            _name : 'basic-setting',
                            rightPath : topMenuName + '.' + 'memberSetting'
                        },
                    }
                }
            },
            inventoryManage : {
                //会员管理--进销存管理
                path : '/memberManage/inventoryManage',
                component : () => import(/*webpackChunkName: "inventoryManage" */'../../pages/memberManage/inventoryManage/index.vue'),
                meta : {
                    _name : 'invoicing-management',
                    menuName : 'inventoryManage',
                    iconClass : 'icon-goods-control',
                    rightPath : topMenuName + '.' + 'inventoryManage',
                    isMenu : true
                },
                children : {
                    goodsManage : {
                        //会员管理--进销存管理--商品管理
                        path : '/memberManage/inventoryManage/goodsManage',
                        name : 'goodsManage',
                        component : () => import(/*webpackChunkName: "inventoryManage" */'../../pages/memberManage/inventoryManage/child/goodsManage.vue'),
                        meta : {
                            _name : 'invoicing-management',
                            menuName : 'goodsManage',
                            rightPath : topMenuName + '.' + 'goodsManage',
                            isMenu : true
                        },
                    },
                    stocking : {
                        //会员管理--进销存管理--库存盘点
                        path : '/memberManage/inventoryManage/stocking',
                        name : 'stocking',
                        component : () => import(/*webpackChunkName: "inventoryManage" */'../../pages/memberManage/inventoryManage/child/stocking.vue'),
                        meta : {
                            _name : 'invoicing-management',
                            menuName : 'stocking',
                            rightPath : topMenuName + '.' + 'stocking',
                            isMenu : true
                        }
                    },
                    editGoodsWarehousing : {
                        //会员管理--进销存管理--新增商品入库
                        path : '/memberManage/inventoryManage/editGoodsWarehousing',
                        name : 'editGoodsWarehousing',
                        component : () => import(/*webpackChunkName: "inventoryManage" */'../../pages/memberManage/inventoryManage/child/editGoodsWarehousing.vue'),
                        meta : {
                            _name : 'operateMemberProduct',
                            menuName : 'editGoodsWarehousing',
                            rightPath : topMenuName + '.' + 'goodsManage',
                        },
                    },
                    stockInfo : {
                        //会员管理--进销存管理--库存详情
                        path : '/memberManage/inventoryManage/stockInfo',
                        name : 'stockInfo',
                        component : () => import(/*webpackChunkName: "inventoryManage" */'../../pages/memberManage/inventoryManage/child/stockInfo.vue'),
                        meta : {
                            _name : 'invoicing-management',
                            menuName : 'stockInfo',
                            rightPath : topMenuName + '.' + 'goodsManage',
                        },
                    },
                }
            },
            integralMall : {
                //会员管理--积分商城
                path : '/memberManage/integralMall',
                name : 'integralMall',
                component : () => import(/* webpackChunkName: "integralMall" */'../../pages/memberManage/integralMall/integralMall.vue'),
                meta : {
                    _name : 'integral-mall',
                    menuName : 'integralMall', //lang.config.js 里面的语言键值
                    iconClass : 'icon-integer-mall',
                    rightPath : topMenuName + '.' + 'integralMall',
                    isMenu : true
                },
            }
        }
    }

};
