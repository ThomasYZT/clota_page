/**
 * 系统设置菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * iconClass 图标类名
 * rightPath 菜单点亮路径,格式为 menuName.menuName 第一个menuName表示一级点亮的菜单，第二个menuName表示当前点亮的左侧菜单（不管层级有多深）
 * isMenu 是否是菜单
 */
//一级菜单的menuname
let topMenuName = 'systemSetting';
export default {
    systemSetting: {
        path: '/systemSetting',
        component: () => import(/* webpackChunkName: "systemSetting" */ '../../pages/systemSetting/index.vue'),
        meta: {
            _name: 'members',
            menuName: 'systemSetting',
            rightPath : topMenuName + '.' + 'systemSetting',
            isMenu : true
        },
        children: {
            collectionAccountSetting: {
                // 系统设置 - 在线支付账户设置
                path: '/systemSetting/accountSetting',
                name: 'onlinePaymentSetting',
                component: () => import(/* webpackChunkName: "systemSetting" */ '../../pages/systemSetting/onlinePaymentSetting/onlinePayment.vue'),
                meta: {
                    _name: 'members', //
                    menuName: 'onlinePaymentSetting', //lang.config.js 里面的语言键值
                    rightPath : topMenuName + '.' + 'accountSetting',
                    iconClass: 'icon-person',
                    isMenu : true
                },
            },
            resetPassword: {
                // 系统设置 - 重置全员密码
                path: '/systemSetting/resetPassword',
                name: 'resetPassword',
                component: () => import(/* webpackChunkName: "systemSetting" */ '../../pages/systemSetting/resetPassword/resetPassword.vue'),
                meta: {
                    _name: 'members', //
                    menuName: 'resetPassword', //lang.config.js 里面的语言键值
                    rightPath : topMenuName + '.' + 'resetPassword',
                    iconClass: 'icon-person',
                    isMenu : true
                },
            },
        }
    }
}
