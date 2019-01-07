/**
 * 数据报表菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * iconClass 图标类名
 * rightPath 菜单点亮路径,格式为 menuName.menuName 第一个menuName表示一级点亮的菜单，第二个menuName表示当前点亮的左侧菜单（不管层级有多深）
 * isMenu 是否是菜单
 * isStaticMenu 表示不需要权限的菜单，如果配置了这个属性，可以不用再配置是_name
 */
//一级菜单的menuname
//一级菜单的menuname
let topMenuName = 'dataReport';
export default {
    dataReport : {
        path : '/dataReport',
        component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/index.vue'),
        meta : {
            _name : 'report',
            menuName : 'dataReport',
            rightPath : topMenuName + '.' + 'dataReport',
            isMenu : true
        },
        children : {
            //数据中心--会员报表
            memberReport : {
                path : '/dataReport/memberReport',
                component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/memberReport/index.vue'),
                name : 'memberReport',
                meta : {
                    menuName : 'memberReport', //lang.config.js 里面的语言键值
                    _name : 'member-report',
                    iconClass : 'icon-member-report',
                    rightPath : topMenuName + '.' + 'memberReport',
                    isMenu : true,
                },
                redirect : {
                    name : 'cardSaleReport'
                },
                children : {
                    //数据中心--会员报表--会员卡销售报表
                    cardSaleReport : {
                        path : '/dataReport/memberReport/cardSaleReport',
                        name : 'cardSaleReport',
                        component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/memberReport/cardSaleReport/index.vue'),
                        meta : {
                            menuName : 'memberReport', //lang.config.js 里面的语言键值
                            _name : 'member-report',
                            rightPath : topMenuName + '.' + 'memberReport',
                        },
                    },
                    //数据中心--会员报表--会员消费数据报表
                    consumeReport : {
                        path : '/dataReport/memberReport/consumeReport',
                        name : 'consumeReport',
                        component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/memberReport/consumeReport/index.vue'),
                        meta : {
                            menuName : 'consumeReport', //lang.config.js 里面的语言键值
                            _name : 'member-report',
                            rightPath : topMenuName + '.' + 'memberReport',
                        },
                    },
                    //数据中心--会员报表--会员个人消费记录
                    consumeRecord : {
                        path : '/dataReport/memberReport/consumeReport/consumeRecord',
                        name : 'consumeRecord',
                        component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/memberReport/consumeReport/child/memberConsumeDetail.vue'),
                        meta : {
                            menuName : 'consumeRecord', //lang.config.js 里面的语言键值
                            _name : 'member-report',
                            rightPath : topMenuName + '.' + 'memberReport',
                        },
                    },
                    //数据中心--会员报表--会员储值报表
                    storeValueReport : {
                        path : '/dataReport/memberReport/storeValueReport',
                        name : 'storeValueReport',
                        component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/memberReport/storeValueReport/index.vue'),
                        meta : {
                            menuName : 'storeValueReport', //lang.config.js 里面的语言键值
                            _name : 'member-report',
                            rightPath : topMenuName + '.' + 'memberReport',
                        },
                    },
                    //数据中心--会员报表--各渠道会员数据报表
                    mutipleChannelReport : {
                        path : '/dataReport/memberReport/mutipleChannelReport',
                        name : 'mutipleChannelReport',
                        component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/memberReport/mutipleChannelReport/index.vue'),
                        meta : {
                            menuName : 'mutipleChannelReport', //lang.config.js 里面的语言键值
                            _name : 'member-report',
                            rightPath : topMenuName + '.' + 'memberReport',
                        },
                    },
                    //数据中心--会员报表--会员积分数据报表
                    scoreReport : {
                        path : '/dataReport/memberReport/scoreReport',
                        name : 'scoreReport',
                        component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/memberReport/scoreReport/index.vue'),
                        meta : {
                            menuName : 'scoreReport', //lang.config.js 里面的语言键值
                            _name : 'member-report',
                            rightPath : topMenuName + '.' + 'memberReport',
                        },
                    },
                }
            },
            //会员报表通用版
            memberReportCommon : {
                path : '/memberReportCommon',
                component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/memberReportCommon/index.vue'),
                name : 'memberReportCommon',
                meta : {
                    menuName : 'memberReportCommon', //lang.config.js 里面的语言键值
                    _name : 'member-report',
                    iconClass : 'icon-member-report',
                    rightPath : topMenuName + '.' + 'memberReportCommon',
                    isMenu : true,
                },
                children : {
                    //会员等级报表
                    partnerAbality : {
                        path : '/memberReportCommon/memberGradeAnalysis',
                        name : 'memberGradeAnalysis',
                        component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/memberReportCommon/report.vue'),
                        meta : {
                            menuName : 'memberGradeAnalysis', //lang.config.js 里面的语言键值
                            _name : 'memberLevel',
                            rightPath : topMenuName + '.' + 'memberGradeAnalysis',
                            isMenu : true,
                        },
                    },
                    //会员消费报表
                    memberConsumeAnalysis : {
                        path : '/memberReportCommon/memberConsumeAnalysis',
                        name : 'memberConsumeAnalysis',
                        component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/memberReportCommon/report.vue'),
                        meta : {
                            menuName : 'memberConsumeAnalysis', //lang.config.js 里面的语言键值
                            _name : 'memberConsume',
                            rightPath : topMenuName + '.' + 'memberConsumeAnalysis',
                            isMenu : true,
                        },
                    },
                    //各渠道会员数量报表
                    channelAnalysis : {
                        path : '/memberReportCommon/channelAnalysis',
                        name : 'channelAnalysis',
                        component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/memberReportCommon/report.vue'),
                        meta : {
                            menuName : 'channelAnalysis', //lang.config.js 里面的语言键值
                            _name : 'memberCount',
                            rightPath : topMenuName + '.' + 'channelAnalysis',
                            isMenu : true,
                        },
                    },
                    //会员积分报表
                    memberIntegerAnalysis : {
                        path : '/memberReportCommon/memberIntegerAnalysis',
                        name : 'memberIntegerAnalysis',
                        component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/memberReportCommon/report.vue'),
                        meta : {
                            menuName : 'memberIntegerAnalysis', //lang.config.js 里面的语言键值
                            _name : 'memberScore',
                            rightPath : topMenuName + '.' + 'memberIntegerAnalysis',
                            isMenu : true,
                        },
                    },
                    //会员储值报表
                    memberRechargeAnalysis : {
                        path : '/memberReportCommon/memberRechargeAnalysis',
                        name : 'memberRechargeAnalysis',
                        component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/memberReportCommon/report.vue'),
                        meta : {
                            menuName : 'memberRechargeAnalysis', //lang.config.js 里面的语言键值
                            _name : 'memberCharging',
                            rightPath : topMenuName + '.' + 'memberRechargeAnalysis',
                            isMenu : true,
                        },
                    },
                }
            },
            //财务报表
            financeReport : {
                path : '/financeReport',
                component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/manageReport/index.vue'),
                name : 'financeReport',
                meta : {
                    menuName : 'financeReport', //lang.config.js 里面的语言键值
                    _name : 'economic-report',
                    iconClass : 'icon-finance-report',
                    rightPath : topMenuName + '.' + 'financeReport',
                    isMenu : true,
                },
                children : {
                    //收支明细报表
                    paymentsAnalysis : {
                        path : '/financeReport/paymentsAnalysis',
                        name : 'paymentsAnalysis',
                        component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/manageReport/report.vue'),
                        meta : {
                            menuName : 'paymentsAnalysis', //lang.config.js 里面的语言键值
                            _name : 'revenueStatement',
                            rightPath : topMenuName + '.' + 'paymentsAnalysis',
                            isMenu : true,
                        },
                    },
                }
            },
            //经营报表
            manageReport : {
                path : '/manageReport',
                component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/manageReport/index.vue'),
                name : 'manageReport',
                meta : {
                    menuName : 'manageReport', //lang.config.js 里面的语言键值
                    _name : 'manage-report',
                    iconClass : 'icon-manage-report',
                    rightPath : topMenuName + '.' + 'manageReport',
                    isMenu : true,
                },
                children : {
                    //合作伙伴能力分析报表
                    partnerAbality : {
                        path : '/manageReport/partnerAbality',
                        name : 'partnerAbality',
                        component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/manageReport/report.vue'),
                        meta : {
                            menuName : 'partnerAbality', //lang.config.js 里面的语言键值
                            _name : 'partnerAnalysis',
                            rightPath : topMenuName + '.' + 'partnerAbality',
                            isMenu : true,
                        },
                    },
                    //入园时段报表
                    enterGardenTimeAnalysis : {
                        path : '/manageReport/enterGardenTimeAnalysis',
                        name : 'enterGardenTimeAnalysis',
                        component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/manageReport/report.vue'),
                        meta : {
                            menuName : 'enterGardenTimeAnalysis', //lang.config.js 里面的语言键值
                            _name : 'admissionPeriodAnalysis',
                            rightPath : topMenuName + '.' + 'enterGardenTimeAnalysis',
                            isMenu : true,
                        },
                    },
                    //全民营销能力分析报表
                    marketAnalysis : {
                        path : '/manageReport/marketAnalysis',
                        name : 'marketAnalysis',
                        component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/manageReport/report.vue'),
                        meta : {
                            menuName : 'marketAnalysis', //lang.config.js 里面的语言键值
                            _name : 'marketAnalysis',
                            rightPath : topMenuName + '.' + 'marketAnalysis',
                            isMenu : true,
                        },
                    },
                    //产品销售排行报表
                    productSaleRankList : {
                        path : '/manageReport/productSaleRankList',
                        name : 'productSaleRankList',
                        component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/manageReport/report.vue'),
                        meta : {
                            menuName : 'productSaleRankList', //lang.config.js 里面的语言键值
                            _name : 'productSaleAnalysis',
                            rightPath : topMenuName + '.' + 'productSaleRankList',
                            isMenu : true,
                        },
                    },
                    //散客产品报表
                    individualProductAnalysis : {
                        path : '/manageReport/individualProductAnalysis',
                        name : 'individualProductAnalysis',
                        component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/manageReport/report.vue'),
                        meta : {
                            menuName : 'individualProductAnalysis', //lang.config.js 里面的语言键值
                            _name : 'individualProductAnalysis',
                            rightPath : topMenuName + '.' + 'individualProductAnalysis',
                            isMenu : true,
                        },
                    },
                    //团队产品报表
                    teamProductAnalysis : {
                        path : '/manageReport/teamProductAnalysis',
                        name : 'teamProductAnalysis',
                        component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/manageReport/report.vue'),
                        meta : {
                            menuName : 'teamProductAnalysis', //lang.config.js 里面的语言键值
                            _name : 'teamProductAnalysis',
                            rightPath : topMenuName + '.' + 'teamProductAnalysis',
                            isMenu : true,
                        },
                    },
                    //散客订单报表
                    individualOrderAnalysis : {
                        path : '/manageReport/individualOrderAnalysis',
                        name : 'individualOrderAnalysis',
                        component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/manageReport/report.vue'),
                        meta : {
                            menuName : 'individualOrderAnalysis', //lang.config.js 里面的语言键值
                            _name : 'individualOrderAnalysis',
                            rightPath : topMenuName + '.' + 'individualOrderAnalysis',
                            isMenu : true,
                        },
                    },
                    //团队订单报表
                    teamOrderAnalysis : {
                        path : '/manageReport/teamOrderAnalysis',
                        name : 'teamOrderAnalysis',
                        component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/manageReport/report.vue'),
                        meta : {
                            menuName : 'teamOrderAnalysis', //lang.config.js 里面的语言键值
                            _name : 'teamOrderAnalysis',
                            rightPath : topMenuName + '.' + 'teamOrderAnalysis',
                            isMenu : true,
                        },
                    },
                    //短信发送记录报表
                    smsSendAnalysis : {
                        path : '/manageReport/smsSendAnalysis',
                        name : 'smsSendAnalysis',
                        component : () => import(/* webpackChunkName: "dataReport" */ '../../pages/dataReport/manageReport/report.vue'),
                        meta : {
                            menuName : 'smsSendAnalysis', //lang.config.js 里面的语言键值
                            _name : 'smsSendRecordAnalysis',
                            rightPath : topMenuName + '.' + 'smsSendAnalysis',
                            isMenu : true,
                        },
                    },
                }
            }
        }
    }
};
