/**
 * 财务管理菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * iconClass 图标类名
 * rightPath 菜单点亮路径,格式为 menuName.menuName 第一个menuName表示一级点亮的菜单，第二个menuName表示当前点亮的左侧菜单（不管层级有多深）
 * isMenu 是否是菜单
 */
//一级菜单的menuname
let topMenuName = 'financeManage';
export default {
    financeManage: {
        path: '/financeManage',
        component: () => import(/* webpackChunkName: "financeManage" */ '../../pages/financeManage/index.vue'),
        meta: {
            _name: 'members',
            menuName: 'financeManage',
            rightPath : topMenuName + '.' + 'financeManage',
            isMenu : true
        },
        children: {
            rechargeRecord: {
                // 系统设置 - 在线支付账户设置
                path: '/financeManage/rechargeRecord',
                name: 'rechargeRecord',
                component: () => import(/* webpackChunkName: "financeManage" */ '../../pages/financeManage/rechargeRecord/rechargeRecord.vue'),
                meta: {
                    _name: 'members', //
                    menuName: 'rechargeRecord', //lang.config.js 里面的语言键值
                    rightPath : topMenuName + '.' + 'rechargeRecord',
                    iconClass: 'icon-person',
                    isMenu : true
                },
            },

            paymentManage: {
                // 系统设置 - 重置全员密码
                path: '/financeManage/payment',
                name: 'paymentManage',
                component: () => import(/* webpackChunkName: "systemSetting" */ '../../pages/financeManage/paymentAccount/paymentManage.vue'),
                meta: {
                    _name: 'members', //
                    menuName: 'paymentManage', //lang.config.js 里面的语言键值
                    rightPath : topMenuName + '.' + 'paymentManage',
                    iconClass: 'icon-person',
                    isMenu : true
                },
            },

            collectionManage: {
                //系统设置--短信管理--三级菜单
                path: '/financeManage/collection',
                component: () => import(/* webpackChunkName: "systemSetting" */ '../../pages/financeManage/collectionAccount/collectionManage.vue'),
                meta: {
                    _name: 'members-point',
                    menuName: 'collectionManage', //lang.config.js 里面的语言键值
                    rightPath : topMenuName + '.' + 'collectionManage',
                    iconClass: 'icon-diamond',
                    isMenu : true
                },

            },
        }
    }
}
