/**
 * 组织架构菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * lightMenu 这个参数表示当前二级菜单对应的一级菜单
 */
export default {
  orgStructure:{
    //组织架构
    path : '/orgManage',
    component: () => import(/* webpackChunkName: "orgStructure" */ '../pages/orgStructure/index.vue'),
    meta : {
      _name : 'orgManage',
      menuName : 'org'
    },
    children:{
      partner :  {
        //组织架构--合作伙伴
        path : '/orgManage/partner',
        name : 'partner',
        component: () => import(/* webpackChunkName: "orgStructure" */ '../pages/orgStructure/partner/partner.vue'),
        meta : {
          menuName : 'partner',
          lightMenu : 'orgManage',
          _name : 'partner',
        },
      },
      selfSupport:{
        //组织架构--自营渠道
        path : '/orgManage/selfSupport',
        name : 'selfSupport',
        component: () => import(/* webpackChunkName: "orgStructure" */ '../pages/orgStructure/selfSupport/selfSupport.vue'),
        meta : {
          menuName : 'channels',
          lightMenu : 'orgManage',
          _name : 'selfSupport',
        },
      },
    }
  },
}
