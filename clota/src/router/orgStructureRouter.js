/**
 * 组织架构菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 */
export default {
  partner :  {
    //组织架构--合作伙伴
    path : '/orgManage/partner',
    name : 'partner',
    component: () => import(/* webpackChunkName: "orgStructure" */ '../pages/orgStructure/partner.vue'),
  },
}
