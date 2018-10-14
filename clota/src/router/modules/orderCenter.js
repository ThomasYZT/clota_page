/**
 * 预定中心管理菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * iconClass 图标类名
 * rightPath 菜单点亮路径,格式为 menuName.menuName 第一个menuName表示一级点亮的菜单，第二个menuName表示当前点亮的左侧菜单（不管层级有多深）
 * isMenu 是否是菜单
 * isStaticMenu 表示不需要权限的菜单，如果配置了这个属性，可以不用再配置是_name
 */
//一级菜单的menuname
let topMenuName = 'orderCenter';
export default {
    order: {
        path: '/order',
        component: () => import(/* webpackChunkName: "orderCenterInit" */ '../../pages/orderCenter/index.vue'),
        meta: {
            _name: 'org',
            menuName: 'orderCenter',
            rightPath: topMenuName + '.' + 'orderCenter',
            isMenu: true
        },
        children : {
            //新建订单
            createOrder : {
                path: '/order/create',
                name: 'createOrder',
                component: () => import(/* webpackChunkName: "orderCenterInit" */ '../../pages/orderCenter/createOrder/index.vue'),
                meta: {
                    menuName: 'createOrder',
                    _name: 'org',
                    rightPath: topMenuName + '.' + 'createOrder',
                    isMenu: true
                },
            },
            //订单填写
            writeOrder : {
                path: '/order/create/write',
                name: 'writeOrder',
                component: () => import(/* webpackChunkName: "orderCenterInit" */ '../../pages/orderCenter/createOrder/orderWrite/index.vue'),
                meta: {
                    menuName: 'writeOrder',
                    _name: 'org',
                    rightPath: topMenuName + '.' + 'createOrder',
                },
            },
            //审核中心
            auditCenter : {
                path: '/order/audit',
                name: 'auditCenter',
                component: () => import(/* webpackChunkName: "orderCenterInit" */ '../../pages/orderCenter/auditCenter/index.vue'),
                meta: {
                    menuName: 'auditCenter',
                    _name: 'org',
                    rightPath: topMenuName + '.' + 'auditCenter',
                    isMenu: true
                },
                children: {
                    groupOrder: {
                        //预定中心--审核中心--团队订单预审核
                        path: '/order/audit/group',
                        name: 'auditGroupOrder',
                        component: () => import(/* webpackChunkName: "orderCenterInit" */ '../../pages/orderCenter/auditCenter/groupOrder.vue'),
                        meta: {
                            menuName: 'auditGroupOrder', //lang.config.js 里面的语言键值
                            _name: 'point-setting',
                            rightPath: topMenuName + '.' + 'auditGroupOrder',
                            isMenu: true
                        },
                    },
                    bulkRefund: {
                        //预定中心--审核中心--散客退票审核
                        path: '/order/audit/bulkRefund',
                        name: 'auditBulkRefund',
                        component: () => import(/* webpackChunkName: "orderCenterInit" */ '../../pages/orderCenter/auditCenter/bulkRefund.vue'),
                        meta: {
                            menuName: 'auditBulkRefund', //lang.config.js 里面的语言键值
                            _name: 'stuff-setting',
                            rightPath: topMenuName + '.' + 'auditBulkRefund',
                            isMenu: true
                        },
                    },
                    bulkChange: {
                        //预定中心--审核中心--散客改签审核
                        path: '/order/audit/bulkChange',
                        name: 'auditBulkChange',
                        component: () => import(/* webpackChunkName: "orderCenterInit" */ '../../pages/orderCenter/auditCenter/bulkChange.vue'),
                        meta: {
                            menuName: 'auditBulkChange', //lang.config.js 里面的语言键值
                            _name: 'stuff-setting',
                            rightPath: topMenuName + '.' + 'auditBulkChange',
                            isMenu: true
                        },
                    },
                }
            },

        }
    }

}
