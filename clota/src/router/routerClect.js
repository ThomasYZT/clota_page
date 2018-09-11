/**
 * 获取所有的路由集合
 */
//组织架构路由
import orgStructureRouter from './modules/orgStructureRouter';
//会员管理路由
import memberManageRouter from './modules/memberManage';
// 系统设置路由
import systemSettingRouter from './modules/systemSetting';
// 个人中心路由
import personalCenterRouter from './modules/personalCenter';
// 产品中心路由
import productCenterRouter from './modules/productCenter';
// 财务管理路由
import financeManageRouter from './modules/financeManage';


export default {
    ...orgStructureRouter,
    ...memberManageRouter,
    ...systemSettingRouter,
    ...personalCenterRouter,
    ...productCenterRouter,
    ...financeManageRouter,
}
