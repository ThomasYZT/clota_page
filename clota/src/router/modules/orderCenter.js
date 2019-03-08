/**
 * 预定中心管理菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值,如果路由有name属性，那么路由的name属性必须和menuName相同
 * iconClass 图标类名
 * rightPath 菜单点亮路径,格式为 menuName.menuName 第一个menuName表示一级点亮的菜单，第二个menuName表示当前点亮的左侧菜单（不管层级有多深）
 * isMenu 是否是菜单
 * isStaticMenu 表示不需要权限的菜单，如果配置了这个属性，可以不用再配置是_name
 */
//一级菜单的menuname
let topMenuName = 'orderCenter';
export default {
    order : {
        path : '/order',
        component : () => import(/* webpackChunkName: "orderCenterInit" */ '../../pages/orderCenter/index.vue'),
        meta : {
            _name : 'order',
            menuName : 'orderCenter',
            rightPath : topMenuName + '.' + 'orderCenter',
            isMenu : true
        },
        children : {
            //新建订单
            createOrder : {
                path : '/order/create',
                name : 'createOrder',
                component : () => import(/* webpackChunkName: "orderCenterInit" */ '../../pages/orderCenter/createOrder/index.vue'),
                meta : {
                    menuName : 'createOrder',
                    _name : 'order-addOrder',
                    rightPath : topMenuName + '.' + 'createOrder',
                    iconClass : 'icon-create-order',
                    isMenu : true
                },
            },
            //散客订单填写
            individualWriteOrder : {
                path : '/order/create/individual',
                name : 'individualOrder',
                component : () => import(/* webpackChunkName: "orderCenter" */ '../../pages/orderCenter/createOrder/orderWrite/individualOrder.vue'),
                meta : {
                    menuName : 'individualOrder',
                    _name : 'order-addOrder',
                    rightPath : topMenuName + '.' + 'createOrder',
                },
            },
            //团队订单填写
            teamWriteOrder : {
                path : '/order/create/team',
                name : 'teamOrder',
                component : () => import(/* webpackChunkName: "orderCenter" */ '../../pages/orderCenter/createOrder/orderWrite/teamOrder.vue'),
                meta : {
                    menuName : 'teamOrder',
                    _name : 'order-addOrder',
                    rightPath : topMenuName + '.' + 'createOrder',
                },
            },
            //订单提交成功
            orderSubmitSuc : {
                path : '/order/create/success',
                name : 'successSubmit',
                component : () => import(/* webpackChunkName: "orderCenter" */ '../../pages/orderCenter/createOrder/orderWrite/orderSubmitSuccess.vue'),
                meta : {
                    menuName : 'successSubmit',
                    _name : 'order-addOrder',
                    rightPath : topMenuName + '.' + 'createOrder',
                },
            },
            //订单详情
            orderDetail : {
                path : '/ordert/detail',
                name : 'reserveOrderDetail',
                component : () => import(/* webpackChunkName: "orderCenter" */ '../../pages/orderCenter/orderDetail/index.vue'),
                meta : {
                    menuName : 'reserveOrderDetail',
                    _name : 'order-list',
                    rightPath : topMenuName + '.' + 'reserveOrderDetail',
                    iconClass : 'icon-order-query',
                    isMenu : true
                },
            },
            //团队订单详情
            teamOrderDetail : {
                path : '/ordert/detail/team',
                name : 'teamOrderDetail',
                component : () => import(/* webpackChunkName: "orderCenter" */ '../../pages/orderCenter/orderDetail/teamOrderDetail.vue'),
                meta : {
                    menuName : 'teamOrderDetail',
                    _name : 'order-list',
                    rightPath : topMenuName + '.' + 'reserveOrderDetail'
                },
            },
            //团队订单详情 -- 团队订单退单审核
            cancelOrderDetail : {
                path : '/cancelOrderDetail/team',
                name : 'cancelOrderDetail',
                component : () => import(/* webpackChunkName: "orderCenter" */ '../../pages/orderCenter/orderDetail/teamOrderDetail.vue'),
                meta : {
                    menuName : 'teamOrderDetail',
                    _name : 'teamOrder-cancel_audit',
                    rightPath : topMenuName + '.' + 'reserveOrderDetail'
                },
            },
            //散客一级订单详情
            individualFirstLevel : {
                path : '/ordert/detail/individualFirstLevel',
                name : 'individualFirstLevel',
                component : () => import(/* webpackChunkName: "orderCenter" */ '../../pages/orderCenter/orderDetail/individualOrderDetail1Level.vue'),
                meta : {
                    menuName : 'individualFirstLevel',
                    _name : 'order-list',
                    rightPath : topMenuName + '.' + 'reserveOrderDetail'
                },
            },
            //散客二级订单详情
            individualSecondLevel : {
                path : '/ordert/detail/individualSecondLevel',
                name : 'individualSecondLevel',
                component : () => import(/* webpackChunkName: "orderCenter" */ '../../pages/orderCenter/orderDetail/individualOrderDetail2Level.vue'),
                meta : {
                    menuName : 'individualSecondLevel',
                    _name : 'order-list',
                    rightPath : topMenuName + '.' + 'reserveOrderDetail'
                },
            },
            //审核中心
            auditCenter : {
                path : '/order/audit',
                name : 'auditCenter',
                component : () => import(/* webpackChunkName: "orderCenter" */ '../../pages/orderCenter/auditCenter/index.vue'),
                meta : {
                    menuName : 'auditCenter',
                    _name : 'order-auditCenter',
                    rightPath : topMenuName + '.' + 'auditCenter',
                    isMenu : true,
                    iconClass : 'icon-order-audit',
                },
                children : {
                    groupOrder : {
                        //预定中心--审核中心--团队订单预审核
                        path : '/order/audit/group',
                        name : 'auditGroupOrder',
                        component : () => import(/* webpackChunkName: "orderCenter" */ '../../pages/orderCenter/auditCenter/groupOrder.vue'),
                        meta : {
                            menuName : 'auditGroupOrder', //lang.config.js 里面的语言键值
                            _name : 'teamOrder-audit',
                            rightPath : topMenuName + '.' + 'auditGroupOrder',
                            isMenu : true
                        },
                    },
                    bulkRefund : {
                        //预定中心--审核中心--散客退票审核
                        path : '/order/audit/bulkRefund',
                        name : 'auditBulkRefund',
                        component : () => import(/* webpackChunkName: "orderCenter" */ '../../pages/orderCenter/auditCenter/bulkRefund.vue'),
                        meta : {
                            menuName : 'auditBulkRefund', //lang.config.js 里面的语言键值
                            _name : 'individual-refund',
                            rightPath : topMenuName + '.' + 'auditBulkRefund',
                            isMenu : true
                        },
                    },
                    bulkRefundDetail : {
                        //预定中心--审核中心--散客（退票）审核详情
                        path : '/order/audit/bulkRefundDetail',
                        name : 'bulkRefundDetail',
                        component : () => import(/* webpackChunkName: "orderCenter" */ '../../pages/orderCenter/auditCenter/child/bulkOrderDetail.vue'),
                        meta : {
                            menuName : 'auditBulkRefund', //lang.config.js 里面的语言键值
                            _name : 'individual-refund',
                            rightPath : topMenuName + '.' + 'auditBulkRefund',
                            isMenu : false
                        },
                    },
                    bulkChange : {
                        //预定中心--审核中心--散客改签审核
                        path : '/order/audit/bulkChange',
                        name : 'auditBulkChange',
                        component : () => import(/* webpackChunkName: "orderCenter" */ '../../pages/orderCenter/auditCenter/bulkChange.vue'),
                        meta : {
                            menuName : 'auditBulkChange', //lang.config.js 里面的语言键值
                            _name : 'individual-alter',
                            rightPath : topMenuName + '.' + 'auditBulkChange',
                            isMenu : true
                        },
                    },
                    bulkChangeDetail : {
                        //预定中心--审核中心--散客（改签）审核详情
                        path : '/order/audit/bulkChangeDetail',
                        name : 'bulkChangeDetail',
                        component : () => import(/* webpackChunkName: "orderCenter" */ '../../pages/orderCenter/auditCenter/child/bulkOrderDetail.vue'),
                        meta : {
                            menuName : 'auditBulkChange', //lang.config.js 里面的语言键值
                            _name : 'individual-alter',
                            rightPath : topMenuName + '.' + 'auditBulkChange',
                            isMenu : false
                        },
                    },
                    chargeBack : {
                        //预定中心--审核中心--团队订单退单审核
                        path : '/order/audit/chargeBack',
                        name : 'chargeBack',
                        component : () => import(/* webpackChunkName: "orderCenter" */ '../../pages/orderCenter/auditCenter/chargeBack.vue'),
                        meta : {
                            menuName : 'chargeBack', //lang.config.js 里面的语言键值
                            _name : 'teamOrder-cancel_audit',
                            rightPath : topMenuName + '.' + 'chargeBack',
                            isMenu : true
                        },
                    }
                }
            },
            //核销管理
            verifyManage : {
                path : '/order/verifyManage',
                name : 'verifyManage',
                component : () => import(/* webpackChunkName: "orderCenter" */ '../../pages/orderCenter/verifyManage/verifyManage.vue'),
                meta : {
                    menuName : 'verifyManage',
                    _name : 'order-checkerManage',
                    rightPath : topMenuName + '.' + 'verifyManage',
                    isMenu : true,
                    iconClass : 'icon-check-manage',
                }
            },
            verifySuccess : {
                //核销管理--核销成功
                path : '/order/verifyManage/success',
                name : 'verifySuccess',
                component : () => import(/* webpackChunkName: "orderCenter" */ '../../pages/orderCenter/verifyManage/child/verifySuccess.vue'),
                meta : {
                    menuName : 'verifyManage', //lang.config.js 里面的语言键值
                    _name : 'order-checkerManage',
                    rightPath : topMenuName + '.' + 'verifyManage',
                    isMenu : false
                },
            }
        }
    }

};
