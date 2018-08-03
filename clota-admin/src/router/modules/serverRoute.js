/**
 * 服务器菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * lightMenu 这个参数表示当前二级菜单对应的一级菜单
 */
export default {
  server : {
    path : '/server',
    name : 'server',
    component: () => import(/* webpackChunkName: "index" */ '../../pages/server/index.vue'),
    meta : {
      _name : 'server',
      menuName : 'server',
      lightMenu : 'server',
    }
  },
  serverDetail : {
    path : '/server/detail',
    name : 'serverDetail',
    component: () => import(/* webpackChunkName: "index" */ '../../pages/server/child/deviceInfo.vue'),
    meta : {
      _name : 'server',
      menuName : 'server',
      lightMenu : 'server',
    },
  }
}
