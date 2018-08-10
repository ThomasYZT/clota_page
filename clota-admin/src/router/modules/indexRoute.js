/**
 * 首页菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * lightMenu 这个参数表示当前二级菜单对应的一级菜单
 * showInMenu 作为一级菜单的下拉二级菜单显示
 * subMenuType 二级菜单标志，值唯一，标识为二级菜单
 */
export default {
    index: {
        path: '/index',
        name: 'index',
        component: () => import(/* webpackChunkName: "index" */ '../../pages/index/index.vue'),
        meta: {
            _name: 'index',
            menuName: 'index',
            lightMenu: 'index',
        }
    }
}
