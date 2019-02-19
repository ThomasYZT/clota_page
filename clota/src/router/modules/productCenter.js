/**
 * 产品中心菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * iconClass 图标类名
 * rightPath 菜单点亮路径,格式为 menuName.menuName 第一个menuName表示一级点亮的菜单，第二个menuName表示当前点亮的左侧菜单（不管层级有多深）
 * isMenu 是否是菜单
 * isStaticMenu 表示不需要权限的菜单，如果配置了这个属性，可以不用再配置是_name
 */
//一级菜单的menuname
let topMenuName = 'productCenter';
export default {
    productCenter : {
        path : '/productCenter',
        component : () => import(/* webpackChunkName: "productCenter" */ '../../pages/productCenter/index.vue'),
        meta : {
            _name : 'product',
            menuName : 'productCenter',
            rightPath : topMenuName + '.' + 'productCenter',
            isMenu : true
        },
        children : {
            productList : {
                //产品中心--产品列表--三级菜单
                path : '/productCenter/pList',
                // name : 'productList',
                component : () => import(/* webpackChunkName: "productCenter" */ '../../pages/productCenter/productList/index.vue'),
                meta : {
                    menuName : 'productList', //lang.config.js 里面的语言键值
                    _name : 'product-list',
                    iconClass : 'icon-product-list',
                    rightPath : topMenuName + '.' + 'productList',
                    isMenu : true
                },
                children : {
                    ticketType : {
                        //产品中心--产品列表--票类
                        path : '/productCenter/pList/ticket',
                        name : 'ticketType',
                        component : () => import(/* webpackChunkName: "productCenter" */ '../../pages/productCenter/productList/ticket/ticketTypeList.vue'),
                        meta : {
                            menuName : 'ticketType', //lang.config.js 里面的语言键值
                            _name : 'ticket',
                            rightPath : topMenuName + '.' + 'ticketType',
                            isMenu : true
                        },
                    },
                    addTicket : {
                        //产品中心--产品列表--新建/修改票类
                        path : '/productCenter/pList/addTicket',
                        name : 'addTicket',
                        component : () => import(/* webpackChunkName: "productCenter" */ '../../pages/productCenter/productList/ticket/editTicket/editTicket.vue'),
                        meta : {
                            menuName : 'ticketType', //lang.config.js 里面的语言键值
                            _name : 'ticket',
                            rightPath : topMenuName + '.' + 'ticketType',
                        },
                    },
                    ticketDetail : {
                        //产品中心--产品列表--票类详情
                        path : '/productCenter/pList/ticketDetail',
                        name : 'ticketDetail',
                        component : () => import(/* webpackChunkName: "productCenter" */ '../../pages/productCenter/productList/ticket/ticketDetail.vue'),
                        meta : {
                            menuName : 'ticketType', //lang.config.js 里面的语言键值
                            _name : 'ticket',
                            rightPath : topMenuName + '.' + 'ticketType',
                        },
                    },
                }
            },
            marketingPolicy : {
                //产品中心--销售政策
                path : '/productCenter/marketingPolicy',
                name : 'marketingPolicy',
                component : () => import(/* webpackChunkName: "productCenter" */ '../../pages/productCenter/marketingPolicy/list.vue'),
                meta : {
                    _name : 'product-policy', //
                    menuName : 'marketingPolicy', //lang.config.js 里面的语言键值
                    rightPath : topMenuName + '.' + 'marketingPolicy',
                    iconClass : 'icon-sale-policy',
                    isMenu : true
                },
            },
            editSalePolicy : {
                //产品中心--销售政策--新建/修改政策
                path : '/productCenter/editSalePolicy',
                name : 'editSalePolicy',
                component : () => import(/* webpackChunkName: "productCenter" */ '../../pages/productCenter/marketingPolicy/myDefinedPolicy/editSalePolicy/editSalePolicy.vue'),
                meta : {
                    menuName : 'marketingPolicy', //lang.config.js 里面的语言键值
                    _name : 'addAndModifyPolicy',
                    rightPath : topMenuName + '.' + 'marketingPolicy',
                },
            },
            quotaAllowance : {
                //产品中心--销售政策--配额余量
                path : '/productCenter/quotaAllowance',
                name : 'quotaAllowance',
                component : () => import(/* webpackChunkName: "productCenter" */ '../../pages/productCenter/marketingPolicy/myDefinedPolicy/quotaAllowance/quotaAllowance.vue'),
                meta : {
                    menuName : 'quotaAllowance', //lang.config.js 里面的语言键值
                    _name : 'addAndModifyPolicy',
                    rightPath : topMenuName + '.' + 'quotaAllowance',
                },
            },
            salePolicyDetail : {
                //产品中心--销售政策--政策详情
                path : '/productCenter/salePolicyDetail',
                name : 'salePolicyDetail',
                component : () => import(/* webpackChunkName: "productCenter" */ '../../pages/productCenter/marketingPolicy/myDefinedPolicy/salePolicyDetail.vue'),
                meta : {
                    menuName : 'marketingPolicy', //lang.config.js 里面的语言键值
                    _name : 'product-policy',
                    rightPath : topMenuName + '.' + 'marketingPolicy',
                },
            },
            distributeDetail : {
                //产品中心--销售政策--分销详情
                path : '/productCenter/distributeDetail',
                name : 'distributeDetail',
                component : () => import(/* webpackChunkName: "productCenter" */ '../../pages/productCenter/marketingPolicy/policyToMe/distributeDetail.vue'),
                meta : {
                    menuName : 'marketingPolicy', //lang.config.js 里面的语言键值
                    _name : 'product-policy',
                    rightPath : topMenuName + '.' + 'marketingPolicy',
                }
            }
        }
    }
};
