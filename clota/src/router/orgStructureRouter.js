/**
 * Created by djc on 2018/7/31.
 */
export default [
  {
    //组织架构--合作伙伴
    path : '/orgManage/partner',
    name : 'partner',
    component: () => import(/* webpackChunkName: "orgStructure" */ '../pages/orgStructure/partner.vue'),
  },
];
