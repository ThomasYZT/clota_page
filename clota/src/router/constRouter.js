/**
 * 非静态路由，动态添加到其它路由的重定向路由
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * lightMenu 这个参数表示当前二级菜单对应的一级菜单
 * hidden 不需要显示在菜单中的路由
 */
export const getFourRoute = ({ menuName, lightMenu, _name }) => {
    return {
        path : '*',
        component : () => import(/* webpackChunkName: "login" */ '../pages/permissionNot/index.vue'),
        meta : {
            menuName : menuName,
            lightMenu : lightMenu,
            _name : _name,
            hidden : true
        },
    };
};
//没有二级菜单的提示页面
export const getNoSubMenuRoute = ({ menuName, lightMenu, _name,rightPath }) => {
    return {
        path : '',
        component : () => import(/* webpackChunkName: "login" */ '../pages/withoutSubMenu/index.vue'),
        meta : {
            menuName : menuName,
            lightMenu : lightMenu,
            _name : _name,
            hidden : true,
            rightPath : rightPath
        },
    };
};
