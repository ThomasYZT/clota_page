/**
 * 会员管理菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * lightMenu 这个参数表示当前二级菜单对应的一级菜单
 * iconClass 图标类名
 */
export default {
    memberMange: {
        path: '/memberManage',
        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/index.vue'),
        meta: {
            _name: 'memberManage',
            menuName: 'menuList.memberHome',
            lightMenu: 'memberManage',
        },
        children: {
            memberHome: {
                //会员管理--会员主页
                path: '/memberManage/home',
                name: 'memberHome',
                component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/home/home.vue'),
                meta: {
                    menuName: 'menuList.memberHome', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'memberHome',
                    iconClass: 'icon-home'
                },
            },
            memberInfo: {
                //会员管理--会员信息--三级菜单
                path: '/memberManage/info',
                component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/information/index.vue'),
                meta: {
                    menuName: 'menuList.memberInfo', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'memberInfo',
                    iconClass: 'icon-people'
                },
                children: {
                    info: {
                        //会员管理--会员信息
                        path: '/memberManage/info',
                        name: 'memberInfo',
                        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/information/information.vue'),
                        meta: {
                            menuName: 'menuList.memberInfo', //lang.config.js 里面的语言键值
                            lightMenu: 'memberManage',//高亮
                            _name: 'memberInfo',
                        },
                    },
                    memberCount: {
                        //会员管理--会员统计
                        path: '/memberManage/count',
                        name: 'memberCount',
                        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/information/count.vue'),
                        meta: {
                            menuName: 'menuList.memberCount', //lang.config.js 里面的语言键值
                            lightMenu: 'memberManage',//高亮
                            _name: 'memberInfo',
                        },
                    },
                }
            },
            addMember: {
                //会员管理--会员信息--新增会员
                path: '/memberManage/add',
                name: 'addMember',
                component: () => import(/* webpackChunkName: "memberInfo" */ '../../pages/memberManage/information/child/addMember.vue'),
                meta: {
                    menuName: 'menuList.memberInfo', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'memberInfo',
                },
            },
            infoDetail: {
                //会员管理--会员信息--会员详情
                path: '/memberManage/detail',
                name: 'infoDetail',
                component: () => import(/* webpackChunkName: "memberInfo" */ '../../pages/memberManage/information/child/detail.vue'),
                meta: {
                    menuName: 'menuList.memberInfo', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'memberInfo',
                },
            },
            infoCard: {
                //会员管理--会员信息--会员卡包
                path: '/memberManage/card',
                name: 'infoCard',
                component: () => import(/* webpackChunkName: "memberInfo" */ '../../pages/memberManage/information/child/card.vue'),
                meta: {
                    menuName: 'menuList.memberInfo', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'memberInfo',
                },
            },
            infoInteg: {
                //会员管理--会员信息--个人积分交易明细
                path: '/memberManage/integ',
                name: 'infoInteg',
                component: () => import(/* webpackChunkName: "memberInfo" */ '../../pages/memberManage/information/child/integDetail.vue'),
                meta: {
                    menuName: 'menuList.memberInfo', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'memberInfo',
                },
            },
            infoFund: {
                //会员管理--会员信息--个人资金交易明细
                path: '/memberManage/fund',
                name: 'infoFund',
                component: () => import(/* webpackChunkName: "memberInfo" */ '../../pages/memberManage/information/child/fundDetail.vue'),
                meta: {
                    menuName: 'menuList.memberInfo', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'memberInfo',
                },
            },
            infoRate: {
                //会员管理--会员信息--享受积分、折扣率信息
                path: '/memberManage/rate',
                name: 'infoRate',
                component: () => import(/* webpackChunkName: "memberInfo" */ '../../pages/memberManage/information/child/rate.vue'),
                meta: {
                    menuName: 'menuList.memberInfo', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'memberInfo',
                },
            },
            integration: {
                //会员管理--会员积分--三级菜单
                path: '/memberManage/integ',
                component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/integration/index.vue'),
                meta: {
                    menuName: 'menuList.integration', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'integration',
                    iconClass: 'icon-diamond'
                },
                children: {
                    integ: {
                        //会员管理--会员积分--积分、折扣率设置
                        path: '/memberManage/integ',
                        name: 'integration',
                        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/integration/integration.vue'),
                        meta: {
                            menuName: 'menuList.integration', //lang.config.js 里面的语言键值
                            lightMenu: 'memberManage',//高亮
                            _name: 'integration',
                        },
                    },
                    specialMember: {
                        //会员管理--会员积分--特殊会员权益管理
                        path: '/memberManage/special',
                        name: 'specialMember',
                        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/integration/specialMember.vue'),
                        meta: {
                            menuName: 'menuList.specialMember', //lang.config.js 里面的语言键值
                            lightMenu: 'memberManage',//高亮
                            _name: 'integration',
                        },
                    },
                }
            },
            setRate: {
                //会员管理--会员积分--设置积分、折扣率
                path: '/memberManage/setRate',
                name: 'setRate',
                component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/integration/child/setRate.vue'),
                meta: {
                    menuName: 'menuList.integration', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'integration',
                },
            },
            setProductRate: {
                //会员管理--会员积分--设置积分、折扣率--按类型/产品
                path: '/memberManage/proRate',
                name: 'setProductRate',
                component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/integration/child/setProductRate.vue'),
                meta: {
                    menuName: 'menuList.integration', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'integration',
                },
            },
            linkSpeMember: {
                //会员管理--会员积分--特殊会员权益管理--关联会员信息
                path: '/memberManage/link',
                name: 'linkSpeMember',
                component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/integration/child/linkSpeMember.vue'),
                meta: {
                    menuName: 'menuList.specialMember', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'integration',
                },
            },
            card: {
                //会员管理--会员卡券
                path: '/memberManage/card',
                name: 'card',
                component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/card/card.vue'),
                meta: {
                    menuName: 'menuList.card', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'card',
                    iconClass: 'icon-card'
                },
            },
            addCard: {
                //会员管理--会员卡券--新增卡劵
                path: '/memberManage/add',
                name: 'addCard',
                component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/card/addCard.vue'),
                meta: {
                    menuName: 'menuList.card', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'card',
                },
            },
            fund: {
                //会员管理--储值管理--三级菜单
                path: '/memberManage/fund',
                component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/fund/index.vue'),
                meta: {
                    menuName: 'menuList.fund', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'fund',
                    iconClass: 'icon-print'
                },
                children: {
                    funds: {
                        //会员管理--储值管理--储值账户
                        path: '/memberManage/fund',
                        name: 'fund',
                        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/fund/fund.vue'),
                        meta: {
                            menuName: 'menuList.fund', //lang.config.js 里面的语言键值
                            lightMenu: 'memberManage',//高亮
                            _name: 'fund',
                        },
                    },
                    fundDetail: {
                        //会员管理--储值管理--资金明细
                        path: '/memberManage/fundDetail',
                        name: 'fundDetail',
                        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/fund/fundDetail.vue'),
                        meta: {
                            menuName: 'menuList.fundDetail', //lang.config.js 里面的语言键值
                            lightMenu: 'memberManage',//高亮
                            _name: 'fund',
                        },
                    },
                    financialManagement: {
                        //会员管理--储值管理--财务管理
                        path: '/memberManage/financial',
                        name: 'financialManagement',
                        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/fund/financialManagement.vue'),
                        meta: {
                            menuName: 'menuList.financialManagement', //lang.config.js 里面的语言键值
                            lightMenu: 'memberManage',//高亮
                            _name: 'fund',
                        },
                    },
                }
            },
            transferRecord: {
                //会员管理--储值管理--财务管理--转账记录
                path: '/memberManage/transfer',
                name: 'transferRecord',
                component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/fund/child/transferRecord.vue'),
                meta: {
                    menuName: 'menuList.financialManagement', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'fund',
                },
            },
            juniorDetail: {
                //会员管理--储值管理--财务管理--下级单位储值账户信息详情
                path: '/memberManage/fund/junior',
                name: 'juniorDetail',
                component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/fund/child/juniorDetail.vue'),
                meta: {
                    menuName: 'menuList.financialManagement', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'fund',
                },
            },
            memberSetting: {
                //会员管理--基础设置
                path: '/memberManage/basic',
                component: () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/index.vue'),
                meta: {
                    menuName: 'menuList.memberSetting', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'memberSetting',
                    iconClass: 'icon-setting'
                },
                children: {
                    basicSetting: {
                        //会员管理--基础设置
                        path: '/memberManage/basic',
                        name: 'memberSetting',
                        component: () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/setting.vue'),
                        meta: {
                            menuName: 'menuList.memberSetting', //lang.config.js 里面的语言键值
                            lightMenu: 'memberManage',//高亮
                            _name: 'memberSetting',
                        },
                    },
                    channelSetting: {
                        //会员管理--渠道设置
                        path: '/memberManage/channel',
                        name: 'channelSetting',
                        component: () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/channelSetting.vue'),
                        meta: {
                            menuName: 'menuList.channelSetting', //lang.config.js 里面的语言键值
                            lightMenu: 'memberManage',//高亮
                            _name: 'memberSetting',
                        },
                    },
                    levelSetting: {
                        //会员管理--会员级别
                        path: '/memberManage/level',
                        name: 'levelSetting',
                        component: () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/levelSetting.vue'),
                        meta: {
                            menuName: 'menuList.levelSetting', //lang.config.js 里面的语言键值
                            lightMenu: 'memberManage',//高亮
                            _name: 'memberSetting',
                        },
                    },
                    growthSetting: {
                        //会员管理--成长值设置
                        path: '/memberManage/growth',
                        name: 'growthSetting',
                        component: () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/growthSetting.vue'),
                        meta: {
                            menuName: 'menuList.growthSetting', //lang.config.js 里面的语言键值
                            lightMenu: 'memberManage',//高亮
                            _name: 'memberSetting',
                        },
                    },
                    fundSetting: {
                        //会员管理--储值设置
                        path: '/memberManage/setting/fund',
                        name: 'fundSetting',
                        component: () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/fundSetting.vue'),
                        meta: {
                            menuName: 'menuList.fundSetting', //lang.config.js 里面的语言键值
                            lightMenu: 'memberManage',//高亮
                            _name: 'memberSetting',
                        },
                    },
                    consumeSetting: {
                        //会员管理--积分消费管理
                        path: '/memberManage/consume',
                        name: 'consumeSetting',
                        component: () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/consumeSetting.vue'),
                        meta: {
                            menuName: 'menuList.consumeSetting', //lang.config.js 里面的语言键值
                            lightMenu: 'memberManage',//高亮
                            _name: 'memberSetting',
                        },
                    },
                }
            },
        }
    }
}
