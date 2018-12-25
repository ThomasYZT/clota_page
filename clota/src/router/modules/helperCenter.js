/**
 * 工作台菜单路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * iconClass 图标类名
 * rightPath 菜单点亮路径,格式为 menuName.menuName 第一个menuName表示一级点亮的菜单，第二个menuName表示当前点亮的左侧菜单（不管层级有多深）
 * isMenu 是否是菜单
 * isStaticMenu 表示不需要权限的菜单，如果配置了这个属性，可以不用再配置是_name
 */

//一级菜单的menuname
let topMenuName = 'helperCenter';

export default {
    helperCenter : {
        path : '/helperCenter',
        component : () => import(/* webpackChunkName: "helperCenter" */ '../../pages/helperCenter/index.vue'),
        name : 'helperCenter',
        meta : {
            _name : 'org', //todo 暂时用数据报表一级菜单权限
            menuName : 'helperCenter',
            rightPath : topMenuName + '.' + 'helperCenter',
            hasSideBar : false,
        },
    }
}
