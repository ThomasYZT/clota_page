/**
 * 会员管理菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * lightMenu 这个参数表示当前二级菜单对应的一级菜单
 */
export default {
  memberMange : {
    path : '/memberManage',
    component: () => import(/* webpackChunkName: "memberManage" */ '../pages/memberManage/index.vue'),
    meta : {
      _name : 'memberManage',
      menuName : 'menuList.memberManage',
      lightMenu : 'memberManage',
    },
    children : {
      test :  {
        //组织架构--合作伙伴
        path : 'test',
        name : 'test',
        component: () => import(/* webpackChunkName: "memberManage" */ '../pages/memberManage/menuTest/index.vue'),
        meta : {
          menuName : 'menuList.test',
          lightMenu : 'memberManage',
          _name : 'test',
        },
      },
    }
  }
}
