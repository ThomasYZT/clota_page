/**
 * 会员管理菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * iconClass 图标类名
 * rightPath 菜单点亮路径,格式为 menuName.menuName 第一个menuName表示一级点亮的菜单，第二个menuName表示当前点亮的左侧菜单（不管层级有多深）
 * isMenu 是否是菜单
 */
//一级菜单的menuname
let topMenuName = 'memberHome';
export default {
    memberMange: {
        path: '/memberManage',
        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/index.vue'),
        meta: {
            _name: 'members',
            menuName: 'memberHome',
            rightPath : 'memberHome',
            isMenu : true
        },
        children: {
            memberHome: {
                //会员管理--会员主页
                path: '/memberManage/home',
                name: 'memberHome',
                component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/home/home.vue'),
                meta: {
                    menuName: 'memberHome', //lang.config.js 里面的语言键值
                    _name: 'members-index',
                    iconClass: 'icon-home',
                    rightPath : topMenuName + '.' + 'memberHome',
                    isMenu : true
                },
            },
            memberInfo: {
                //会员管理--会员信息--三级菜单
                path: '/memberManage/info',
                component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/information/index.vue'),
                meta: {
                    menuName: 'memberInfo', //lang.config.js 里面的语言键值
                    _name: 'members-info',
                    iconClass: 'icon-people',
                    rightPath : topMenuName + '.' + 'memberInfo',
                    isMenu : true
                },
                children: {
                    info: {
                        //会员管理--会员信息
                        path: '/memberManage/info',
                        name: 'memberInfo',
                        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/information/information.vue'),
                        meta: {
                            menuName: 'memberInfo', //lang.config.js 里面的语言键值
                            _name: 'members-detail',
                            rightPath : topMenuName + '.' + 'memberInfo',
                            isMenu : true
                        },
                    },
                    memberCount: {
                        //会员管理--会员统计
                        path: '/memberManage/count',
                        name: 'memberCount',
                        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/information/count.vue'),
                        meta: {
                            menuName: 'memberCount', //lang.config.js 里面的语言键值
                            _name: 'members-stat',
                            rightPath : topMenuName + '.' + 'memberCount',
                            isMenu : true
                        },
                    },
                    addMember: {
                        //会员管理--会员信息--新增会员
                        path: '/memberManage/add',
                        name: 'addMember',
                        component: () => import(/* webpackChunkName: "memberInfo" */ '../../pages/memberManage/information/child/addMember.vue'),
                        meta: {
                            menuName: 'memberInfo', //lang.config.js 里面的语言键值
                            _name: 'members-detail',
                            rightPath : topMenuName + '.' + 'memberInfo',
                        },
                    },
                    infoDetail: {
                        //会员管理--会员信息--会员详情
                        path: '/memberManage/detail',
                        name: 'infoDetail',
                        component: () => import(/* webpackChunkName: "memberInfo" */ '../../pages/memberManage/information/child/detail.vue'),
                        meta: {
                            menuName: 'memberInfo', //lang.config.js 里面的语言键值
                            _name: 'members-detail',
                            rightPath : topMenuName + '.' + 'memberInfo'
                        },
                    },
                    infoCard: {
                        //会员管理--会员信息--会员卡包
                        path: '/memberManage/card',
                        name: 'infoCard',
                        component: () => import(/* webpackChunkName: "memberInfo" */ '../../pages/memberManage/information/child/card.vue'),
                        meta: {
                            menuName: 'memberInfo', //lang.config.js 里面的语言键值
                            _name: 'members-detail',
                            rightPath : topMenuName + '.' + 'memberInfo'
                        },
                    },
                    infoInteg: {
                        //会员管理--会员信息--个人积分交易明细
                        path: '/memberManage/intega',
                        name: 'infoInteg',
                        component: () => import(/* webpackChunkName: "memberInfo" */ '../../pages/memberManage/information/child/integDetail.vue'),
                        meta: {
                            menuName: 'memberInfo', //lang.config.js 里面的语言键值
                            _name: 'members-detail',
                            rightPath : topMenuName + '.' + 'memberInfo'
                        },
                    },

                    infoFund: {
                        //会员管理--会员信息--个人资金交易明细
                        path: '/memberManage/perFundDetail',
                        name: 'infoFund',
                        component: () => import(/* webpackChunkName: "memberInfo" */ '../../pages/memberManage/information/child/fundDetail.vue'),
                        meta: {
                            menuName: 'memberInfo', //lang.config.js 里面的语言键值
                            _name: 'members-detail',
                            rightPath : topMenuName + '.' + 'memberInfo'
                        },
                    },
                    infoRate: {
                        //会员管理--会员信息--享受积分、折扣率信息
                        path: '/memberManage/rate',
                        name: 'infoRate',
                        component: () => import(/* webpackChunkName: "memberInfo" */ '../../pages/memberManage/information/child/rate.vue'),
                        meta: {
                            menuName: 'memberInfo', //lang.config.js 里面的语言键值
                            _name: 'members-detail',
                            rightPath : topMenuName + '.' + 'memberInfo'
                        },
                    },
                }
            },

            integration: {
                //会员管理--会员积分--三级菜单
                path: '/memberManage/integ',
                component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/integration/index.vue'),
                meta: {
                    menuName: 'integration', //lang.config.js 里面的语言键值
                    _name: 'members-point',
                    iconClass: 'icon-diamond',
                    rightPath : topMenuName + '.' + 'memberPoints',
                    isMenu : true
                },
                children: {
                    integ: {
                        //会员管理--会员积分--积分、折扣率设置
                        path: '/memberManage/integ',
                        name: 'integration',
                        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/integration/integration.vue'),
                        meta: {
                            menuName: 'integration', //lang.config.js 里面的语言键值
                            _name: 'point-setting',
                            rightPath : topMenuName + '.' + 'integration',
                            isMenu : true
                        },
                    },
                    specialMember: {
                        //会员管理--会员积分--特殊会员权益管理
                        path: '/memberManage/special',
                        name: 'specialMember',
                        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/integration/specialMember.vue'),
                        meta: {
                            menuName: 'specialMember', //lang.config.js 里面的语言键值
                            _name: 'stuff-setting',
                            rightPath : topMenuName + '.' + 'specialMember',
                            isMenu : true
                        },
                    },
                    setRate: {
                        //会员管理--会员积分--设置积分、折扣率
                        path: '/memberManage/setRate',
                        name: 'setRate',
                        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/integration/child/setRate.vue'),
                        meta: {
                            menuName: 'integration', //lang.config.js 里面的语言键值
                            _name: 'point-setting',
                            rightPath : topMenuName + '.' + 'integration',
                        },
                    },
                    setProductRate: {
                        //会员管理--会员积分--设置积分、折扣率--按类型/产品
                        path: '/memberManage/proRate',
                        name: 'setProductRate',
                        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/integration/child/setProductRate.vue'),
                        meta: {
                            menuName: 'integration', //lang.config.js 里面的语言键值
                            _name: 'point-setting',
                            rightPath : topMenuName + '.' + 'integration',
                        },
                    },
                    linkSpeMember: {
                        //会员管理--会员积分--特殊会员权益管理--关联会员信息
                        path: '/memberManage/link',
                        name: 'linkSpeMember',
                        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/integration/child/linkSpeMember.vue'),
                        meta: {
                            menuName: 'memberPoints', //lang.config.js 里面的语言键值
                            _name: 'point-setting',
                            rightPath : topMenuName + '.' + 'specialMember',
                        },
                    },
                }
            },

            card: {
                //会员管理--会员卡券
                path: '/memberManage/coupon/card',
                name: 'card',
                component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/card/card.vue'),
                meta: {
                    menuName: 'card', //lang.config.js 里面的语言键值
                    _name: 'members-coupon',
                    iconClass: 'icon-card',
                    rightPath : topMenuName + '.' + 'card',
                    isMenu : true
                },
            },
            addCard: {
                //会员管理--会员卡券--新增卡劵
                path: '/memberManage/coupon/add',
                name: 'addCard',
                component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/card/addCard.vue'),
                meta: {
                    menuName: 'card', //lang.config.js 里面的语言键值
                    _name: 'members-coupon',
                    rightPath : topMenuName + '.' + 'card',
                },
            },
            fund: {
                //会员管理--储值管理--三级菜单
                path: '/memberManage/fund',
                component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/fund/index.vue'),
                meta: {
                    menuName: 'financialManagement', //lang.config.js 里面的语言键值
                    _name: 'members-storage',
                    iconClass: 'icon-print',
                    rightPath : topMenuName + '.' + 'financialManagement',
                    isMenu : true
                },
                children: {
                    fundInfo: {
                        //会员管理--储值管理--储值信息
                        path: '/memberManage/fundInfo',
                        name: 'fundInfo',
                        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/fund/fundInfo.vue'),
                        meta: {
                            menuName: 'fundInfo', //lang.config.js 里面的语言键值
                            _name: 'storage-account',
                            rightPath : topMenuName + '.' + 'fundInfo',
                            isMenu : true
                        },
                    },
                    funds: {
                        //会员管理--储值管理--储值明细
                        path: '/memberManage/fund',
                        name: 'fund',
                        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/fund/fund.vue'),
                        meta: {
                            menuName: 'fund', //lang.config.js 里面的语言键值
                            _name: 'storage-account',
                            rightPath : topMenuName + '.' + 'fundInfo',
                        },
                    },
                    fundDetail: {
                        //会员管理--储值管理--资金明细
                        path: '/memberManage/fundDetail',
                        name: 'fundDetail',
                        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/fund/fundDetail.vue'),
                        meta: {
                            menuName: 'fundDetail', //lang.config.js 里面的语言键值
                            _name: 'storage-detail',
                            rightPath : topMenuName + '.' + 'fundDetail',
                            isMenu : true
                        },
                    },
                    financialManagement: {
                        //会员管理--储值管理--转账
                        path: '/memberManage/financial',
                        name: 'transfer',
                        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/fund/financialManagement.vue'),
                        meta: {
                            menuName: 'transfer', //lang.config.js 里面的语言键值
                            _name: 'storage-manage',
                            rightPath : topMenuName + '.' + 'transfer',
                            isMenu : true
                        },
                    },
                    transferRecord: {
                        //会员管理--储值管理--财务管理--转账记录
                        path: '/memberManage/transfer',
                        name: 'transferRecord',
                        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/fund/child/transferRecord.vue'),
                        meta: {
                            menuName: 'financialManagement', //lang.config.js 里面的语言键值
                            _name: 'storage-manage',
                            rightPath : topMenuName + '.' + 'transfer',
                        },
                    },
                    juniorDetail: {
                        //会员管理--储值管理--财务管理--下级单位储值账户信息详情
                        path: '/memberManage/fund/junior',
                        name: 'juniorDetail',
                        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/memberManage/fund/child/juniorDetail.vue'),
                        meta: {
                            menuName: 'financialManagement', //lang.config.js 里面的语言键值
                            _name: 'storage-manage',
                            rightPath : topMenuName + '.' + 'financialManagement',
                        },
                    },
                }
            },
            memberSetting: {
                //会员管理--基础设置
                path: '/memberManage/basic',
                component: () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/index.vue'),
                meta: {
                    menuName: 'initializationSettings', //lang.config.js 里面的语言键值
                    _name: 'init-setting',
                    iconClass: 'icon-setting',
                    rightPath : topMenuName + '.' + 'initializationSettings',
                    isMenu : true
                },
                children: {
                    basicSetting: {
                        //会员管理--基础设置
                        path: '/memberManage/basic',
                        name: 'memberSetting',
                        component: () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/setting.vue'),
                        meta: {
                            menuName: 'memberSetting', //lang.config.js 里面的语言键值
                            _name: 'basic-setting',
                            rightPath : topMenuName + '.' + 'memberSetting',
                            isMenu : true
                        },
                    },
                    channelSetting: {
                        //会员管理--渠道设置
                        path: '/memberManage/channel',
                        name: 'channelSetting',
                        component: () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/channelSetting.vue'),
                        meta: {
                            menuName: 'channelSetting', //lang.config.js 里面的语言键值
                            _name: 'channel-setting',
                            rightPath : topMenuName + '.' + 'channelSetting',
                            isMenu : true
                        },
                    },
                    levelSetting: {
                        //会员管理--会员级别
                        path: '/memberManage/level',
                        name: 'levelSetting',
                        component: () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/levelSetting.vue'),
                        meta: {
                            menuName: 'levelSetting', //lang.config.js 里面的语言键值
                            _name: 'member-level',
                            rightPath : topMenuName + '.' + 'levelSetting',
                            isMenu : true
                        },
                    },
                    growthSetting: {
                        //会员管理--成长值设置
                        path: '/memberManage/growth',
                        name: 'growthSetting',
                        component: () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/growthSetting.vue'),
                        meta: {
                            menuName: 'growthSetting', //lang.config.js 里面的语言键值
                            _name: 'growth-setting',
                            rightPath : topMenuName + '.' + 'growthSetting',
                            isMenu : true
                        },
                    },
                    fundSetting: {
                        //会员管理--储值设置
                        path: '/memberManage/setting/fund',
                        name: 'fundSetting',
                        component: () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/fundSetting.vue'),
                        meta: {
                            menuName: 'fundSetting', //lang.config.js 里面的语言键值
                            _name: 'storage-setting',
                            rightPath : topMenuName + '.' + 'fundSetting',
                            isMenu : true
                        },
                    },
                    consumeSetting: {
                        //会员管理--积分消费管理
                        path: '/memberManage/consume',
                        name: 'consumeSetting',
                        component: () => import(/* webpackChunkName: "memberSetting" */ '../../pages/memberManage/setting/consumeSetting.vue'),
                        meta: {
                            menuName: 'consumeSetting', //lang.config.js 里面的语言键值
                            _name: 'point-manage',
                            rightPath : topMenuName + '.' + 'consumeSetting',
                            isMenu : true
                        },
                    },
                }
            },
        }
    }
}
