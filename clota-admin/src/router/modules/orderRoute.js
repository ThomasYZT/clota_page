/**
 * 订单菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * lightMenu 这个参数表示当前二级菜单对应的一级菜单
 * showInMenu 作为一级菜单的下拉二级菜单显示
 * subMenuType 二级菜单标志，值唯一，标识为二级菜单
 */
export default {
    orderIndex : {
        path : '/order',
        component : () => import(/* webpackChunkName : "order" */'../../pages/order/index.vue'),
        meta : {
            _name : 'order',
            menuName : 'order',
            lightMenu : 'order',
        },
        children : {
            //订单列表
            order : {
                path : 'list',
                name : 'orderList',
                component : () => import(/* webpackChunkName: "order" */ '../../pages/order/order.vue'),
                meta : {
                    _name : 'order',
                    menuName : 'order',
                    lightMenu : 'order',
                }
            },
            //订单详情
            orderDetail : {
                path : 'orderDetail',
                name : 'orderDetail',
                component : () => import(/* webpackChunkName: "order" */ '../../pages/order/child/orderDetail.vue'),
                meta : {
                    _name : 'order',
                    menuName : 'order',
                    lightMenu : 'order',
                }
            }
        }
    },
    //团队订单详情
    teamOrderDetail : {
        path : '/orderDetail/team',
        name : 'teamOrderDetail',
        component : () => import(/* webpackChunkName: "order" */'../../pages/order/teamOrderDetail.vue'),
        meta : {
            _name : 'order',
            menuName : 'order',
            lightMenu : 'order',
        }
    },
    //散客订单一级详情
    individualOneLevelOrderDetail : {
        path : '/orderDetail/individual/oneLevel',
        name : 'individualOrderDetail1Level',
        component : () => import(/* webpackChunkName: "order" */'../../pages/order/individualOrderDetail1Level.vue'),
        meta : {
            _name : 'order',
            menuName : 'order',
            lightMenu : 'order',
        }
    },
};
