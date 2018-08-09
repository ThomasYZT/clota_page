/**
 * 获取所有的动态路由
 */
//首页路由
import orgStructureRouter from './modules/indexRoute';
//租户路由
import lesseeRoute from './modules/lesseeRoute';
//服务器
import serverRoute from './modules/serverRoute';
//订单
import orderRoute from './modules/orderRoute';

export default {
    ...orgStructureRouter,
    ...lesseeRoute,
    ...serverRoute,
    ...orderRoute
}
