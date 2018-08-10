/**
 * 系统菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * lightMenu 这个参数表示当前二级菜单对应的一级菜单
 * showInMenu 作为一级菜单的下拉二级菜单显示
 * subMenuType 二级菜单标志，值唯一，标识为二级菜单
 */
export default {
    //系统主页
    systemIndex: {
        path: '/system',
        component: () => import(/* webpackChunkName: "system" */ '../../pages/system/index.vue'),
        meta: {
            _name: 'system',
            menuName: 'system',
            lightMenu: 'system',
        },
        children : {
            //账号管理
            account : {
                path: '/system/account',
                name: 'account',
                component: () => import(/* webpackChunkName: "system" */ '../../pages/system/child/account.vue'),
                meta: {
                    _name: 'system',
                    menuName: 'accountName',
                    lightMenu: 'system',
                    showInMenu : true,
                    subMenuType : 'account'
                },
            },
            //系统公告
            systemNotice : {
                path: '/system/notice',
                name: 'systemNotice',
                component: () => import(/* webpackChunkName: "system" */ '../../pages/system/child/systemNotice.vue'),
                meta: {
                    _name: 'system',
                    menuName: 'systemNotice',
                    lightMenu: 'system',
                    showInMenu : true,
                    subMenuType : 'notice'
                },
            },
            //新增账号
            addAccount : {
                path: '/system/account/add',
                name: 'addAccount',
                component: () => import(/* webpackChunkName: "system" */ '../../pages/system/child/addAccount.vue'),
                meta: {
                    _name: 'system',
                    menuName: 'addAccount',
                    lightMenu: 'system',
                    subMenuType : 'account'
                },
            },
        }
    },
}
