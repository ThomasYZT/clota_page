/**
 * 预定中心管理菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * iconClass 图标类名
 * rightPath 菜单点亮路径,格式为 menuName.menuName 第一个menuName表示一级点亮的菜单，第二个menuName表示当前点亮的左侧菜单（不管层级有多深）
 * isMenu 是否是菜单
 * isStaticMenu 表示不需要权限的菜单，如果配置了这个属性，可以不用再配置是_name
 */
//一级菜单的menuname
let topMenuName = 'orderCenter';
export default {
    memberMange: {
        path: '/order',
        component: () => import(/* webpackChunkName: "orderCenterInit" */ '../../pages/orderCenter/index.vue'),
        meta: {
            _name: 'org',
            menuName: 'orderCenter',
            rightPath: topMenuName + '.' + 'orderCenter',
            isMenu: true
        },
        children : {
            //新建订单
            createOrder : {
                path: '/order/create',
                name: 'createOrder',
                component: () => import(/* webpackChunkName: "orderCenterInit" */ '../../pages/orderCenter/createOrder/index.vue'),
                meta: {
                    menuName: 'createOrder',
                    _name: 'org',
                    rightPath: topMenuName + '.' + 'createOrder',
                    isMenu: true
                },
            }
        }
    }

}
