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
                    iconClass : 'icon-check-group',
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
        }
    }
};
