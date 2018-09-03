/**
 * 获取所有的路由集合
 */
//组织架构路由
import orgStructureRouter from './modules/orgStructureRouter';
import memberManageRouter from './modules/memberManage';
import systemSettingRouter from './modules/systemSetting';


export default {
    ...orgStructureRouter,
    ...memberManageRouter,
    ...systemSettingRouter,
}
