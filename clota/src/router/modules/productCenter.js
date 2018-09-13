/**
 * 产品中心菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * iconClass 图标类名
 * rightPath 菜单点亮路径,格式为 menuName.menuName 第一个menuName表示一级点亮的菜单，第二个menuName表示当前点亮的左侧菜单（不管层级有多深）
 * isMenu 是否是菜单
 */
//一级菜单的menuname
let topMenuName = 'productCenter';
export default {
    productCenter: {
        path: '/productCenter',
        component: () => import(/* webpackChunkName: "productCenter" */ '../../pages/productCenter/index.vue'),
        meta: {
            _name: 'members',
            menuName: 'productCenter',
            rightPath : topMenuName + '.' + 'productCenter',
            isMenu : true
        },
        children: {
            productList: {
                //产品中心--产品列表--三级菜单
                path: '/productCenter/pList',
                // name : 'productList',
                component: () => import(/* webpackChunkName: "productCenter" */ '../../pages/productCenter/productList/index.vue'),
                meta: {
                    menuName: 'productList', //lang.config.js 里面的语言键值
                    _name: 'members',
                    iconClass: 'icon-diamond',
                    rightPath : topMenuName + '.' + 'productList',
                    isMenu : true
                },
                children: {
                    ticketType: {
                        //产品中心--产品列表--票类
                        path: '/productCenter/pList/ticketType',
                        name: 'ticketType',
                        component: () => import(/* webpackChunkName: "productCenter" */ '../../pages/productCenter/productList/ticketType.vue'),
                        meta: {
                            menuName: 'ticketType', //lang.config.js 里面的语言键值
                            _name: 'members',
                            rightPath : topMenuName + '.' + 'productList',
                            isMenu : true
                        },
                    },
                    addTicket: {
                        //产品中心--产品列表--新建/修改票类
                        path: '/productCenter/pList/addTicket',
                        name: 'addTicket',
                        component: () => import(/* webpackChunkName: "productCenter" */ '../../pages/productCenter/productList/child/editTicket.vue'),
                        meta: {
                            menuName: 'ticketType', //lang.config.js 里面的语言键值
                            _name: 'point-setting',
                            rightPath : topMenuName + '.' + 'productList',
                        },
                    },
                    ticketDetail: {
                        //产品中心--产品列表--票类详情
                        path: '/productCenter/pList/ticketDetail',
                        name: 'ticketDetail',
                        component: () => import(/* webpackChunkName: "productCenter" */ '../../pages/productCenter/productList/child/ticketDetail.vue'),
                        meta: {
                            menuName: 'ticketType', //lang.config.js 里面的语言键值
                            _name: 'point-setting',
                            rightPath : topMenuName + '.' + 'productList',
                        },
                    },
                }
            },

            marketingPolicy: {
                //产品中心--销售政策
                path: '/productCenter/mPolicy',
                name: 'marketingPolicy',
                component: () => import(/* webpackChunkName: "productCenter" */ '../../pages/productCenter/marketingPolicy/list.vue'),
                meta: {
                    _name: 'members', //
                    menuName: 'marketingPolicy', //lang.config.js 里面的语言键值
                    rightPath : topMenuName + '.' + 'marketingPolicy',
                    iconClass: 'icon-person',
                    isMenu : true
                },
            },
            editSalePolicy: {
                //产品中心--销售政策--新建/修改政策
                path: '/productCenter/MPEdit',
                name: 'editSalePolicy',
                component: () => import(/* webpackChunkName: "productCenter" */ '../../pages/productCenter/marketingPolicy/child/editSalePolicy.vue'),
                meta: {
                    menuName: 'marketingPolicy', //lang.config.js 里面的语言键值
                    _name: 'point-setting',
                    rightPath : topMenuName + '.' + 'marketingPolicy',
                },
            },
            salePolicyDetail: {
                //产品中心--销售政策--政策详情
                path: '/productCenter/MPDetail',
                name: 'salePolicyDetail',
                component: () => import(/* webpackChunkName: "productCenter" */ '../../pages/productCenter/marketingPolicy/child/salePolicyDetail.vue'),
                meta: {
                    menuName: 'marketingPolicy', //lang.config.js 里面的语言键值
                    _name: 'point-setting',
                    rightPath : topMenuName + '.' + 'marketingPolicy',
                },
            },

        }
    }
}
