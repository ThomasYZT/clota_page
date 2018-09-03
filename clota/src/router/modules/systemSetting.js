/**
 * 系统设置菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * iconClass 图标类名
 * rightPath 菜单点亮路径,格式为 menuName.menuName 第一个menuName表示一级点亮的菜单，第二个menuName表示当前点亮的左侧菜单（不管层级有多深）
 * isMenu 是否是菜单
 */
export default {
    systemSetting: {
        path: '/systemSetting',
        component: () => import(/* webpackChunkName: "systemSetting" */ '../../pages/systemSetting/index.vue'),
        meta: {
            _name: '',
            menuName: '',
            rightPath : '',
            isMenu : true
        },
        children: {
            collectionAccountSetting: {
                //组织架构--组织架构
                path: 'collectionAccountSetting',
                name: 'collectionAccountSetting',
                component: () => import(/* webpackChunkName: "systemSetting" */ '../../pages/systemSetting/collectionAccountSetting/collectionAccount.vue'),
                meta: {
                    menuName: '', //lang.config.js 里面的语言键值
                    lightMenu: 'orgManage',//高亮
                    _name: '', //
                    iconClass: 'icon-person'
                },
            },
        }
    }
}
