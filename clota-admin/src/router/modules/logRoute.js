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
    //订单列表
    logIndex: {
        path: '/log',
        component: () => import(/* webpackChunkName: "log" */ '../../pages/log/index.vue'),
        meta: {
            _name: 'log',
            menuName: 'log',
            lightMenu: 'log',
        },
        children : {
            //运维后台操作日志
            operationLog : {
                path: '/log/operationLog',
                name: 'operationLog',
                component: () => import(/* webpackChunkName: "log" */ '../../pages/log/child/operationLog.vue'),
                meta: {
                    _name: 'log',
                    menuName: 'operationLog',
                    lightMenu: 'log',
                    showInMenu : true,
                    subMenuType : 'operate'
                },
            },
            //sass平台操作日志
            sassLog : {
                path: '/log/sassLog',
                name: 'sassLog',
                component: () => import(/* webpackChunkName: "log" */ '../../pages/log/child/operationLog.vue'),
                meta: {
                    _name: 'log',
                    menuName: 'sassLog',
                    lightMenu: 'log',
                    showInMenu : true,
                    subMenuType : 'sass'
                },
            }
        }
    },
}
