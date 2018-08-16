/**
 * 获取所有的路由集合
 */
//组织架构路由
import orgStructureRouter from './modules/orgStructureRouter';
import memberManageRouter from './modules/memberManage';


export default {
    ...orgStructureRouter,
    ...memberManageRouter
}
