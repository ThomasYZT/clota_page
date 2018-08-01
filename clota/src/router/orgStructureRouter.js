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
      organization:{
        //组织架构--员工
        path : '/orgManage/organization',
        name : 'organization',
        component: () => import(/* webpackChunkName: "orgStructure" */ '../pages/orgStructure/organization/organization.vue'),
        meta : {
          menuName : 'org', //lang.config.js 里面的语言健
          lightMenu : 'orgManage',//高亮
          _name : 'organization', //
        },
      },
      employee:{
        //组织架构--员工
        path : '/orgManage/employee',
        name : 'employee',
        component: () => import(/* webpackChunkName: "orgStructure" */ '../pages/orgStructure/employee/employee.vue'),
        meta : {
          menuName : 'employee', //lang.config.js 里面的语言健
          lightMenu : 'orgManage',//高亮
          _name : 'employee', //
        },
      },
      rolePermission: {
        //组织架构--角色权限
        path : '/orgManage/rolePermission',
        name : 'rolePermission',
        component: () => import(/* webpackChunkName: "orgStructure" */ '../pages/orgStructure/rolePermission/rolePermission.vue'),
        meta : {
          menuName : 'rolePermission', //lang.config.js 里面的语言健
          lightMenu : 'orgManage',//高亮
          _name : 'rolePermission', //
        },
      },
      partner :  {
        //组织架构--合作伙伴
        path : '/orgManage/partner',
        name : 'partner',
        component: () => import(/* webpackChunkName: "orgStructure" */ '../pages/orgStructure/partner/partner.vue'),
        meta : {
          menuName : 'partner', //lang.config.js 里面的语言健
          lightMenu : 'orgManage',//高亮
          _name : 'partner', //
        },
      },
      channels:{
        //组织架构--自营渠道
        path : '/orgManage/channels',
        name : 'channels',
        component: () => import(/* webpackChunkName: "orgStructure" */ '../pages/orgStructure/channels/channels.vue'),
        meta : {
          menuName : 'channels',
          lightMenu : 'orgManage',
          _name : 'channels',
        },
      },
      saleChannelsGroup:{
        //组织架构--销售渠道分组
        path : '/orgManage/saleChannelsGroup',
        name : 'saleChannelsGroup',
        component: () => import(/* webpackChunkName: "orgStructure" */ '../pages/orgStructure/saleChannelsGroup/saleChannelsGroup.vue'),
        meta : {
          menuName : 'saleChannelsGroup',
          lightMenu : 'orgManage',
          _name : 'saleChannelsGroup',
        },
      },
      verificateGroup:{
        //组织架构--核销设备分组
        path : '/orgManage/verificateGroup',
        name : 'verificateGroup',
        component: () => import(/* webpackChunkName: "orgStructure" */ '../pages/orgStructure/verificateGroup/verificateGroup.vue'),
        meta : {
          menuName : 'verificateGroup',
          lightMenu : 'orgManage',
          _name : 'verificateGroup',
        },
      },
    }
  },
}
