/**
 * 获取所有的路由集合
 */
//组织架构路由
import orgStructureRouter from './orgStructureRouter';
import memberManageRouter from './memberManage';


export default {
    ...orgStructureRouter,
    ...memberManageRouter
}
