/**
 * 会员管理菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * lightMenu 这个参数表示当前二级菜单对应的一级菜单
 * iconClass 图标类名
 */
export default {
    memberMange: {
        path: '/memberManage',
        component: () => import(/* webpackChunkName: "memberManage" */ '../pages/memberManage/index.vue'),
        meta: {
            _name: 'memberManage',
            menuName: 'menuList.memberHome',
            lightMenu: 'memberManage',
        },
        children: {
            memberHome: {
                //会员管理--会员主页
                path: 'memberHome',
                name: 'memberHome',
                component: () => import(/* webpackChunkName: "memberManage" */ '../pages/memberManage/home/home.vue'),
                meta: {
                    menuName: 'menuList.memberHome', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'memberHome',
                    iconClass: 'icon-person'
                },
            },
            memberInfo: {
                //会员管理--会员信息
                path: 'memberInfo',
                name: 'memberInfo',
                component: () => import(/* webpackChunkName: "memberManage" */ '../pages/memberManage/information/information.vue'),
                meta: {
                    menuName: 'menuList.memberInfo', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'memberInfo',
                    iconClass: 'icon-person'
                },
            },
            integration: {
                //会员管理--会员积分
                path: 'integration',
                name: 'integration',
                component: () => import(/* webpackChunkName: "memberManage" */ '../pages/memberManage/integration/integration.vue'),
                meta: {
                    menuName: 'menuList.integration', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'integration',
                    iconClass: 'icon-person'
                },
            },
            card: {
                //会员管理--会员卡券
                path: 'card',
                name: 'card',
                component: () => import(/* webpackChunkName: "memberManage" */ '../pages/memberManage/card/card.vue'),
                meta: {
                    menuName: 'menuList.card', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'card',
                    iconClass: 'icon-person'
                },
            },
            fund: {
                //会员管理--储值管理
                path: 'fund',
                name: 'fund',
                component: () => import(/* webpackChunkName: "memberManage" */ '../pages/memberManage/fund/fund.vue'),
                meta: {
                    menuName: 'menuList.fund', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'fund',
                    iconClass: 'icon-person'
                },
            },
            memberSetting: {
                //会员管理--基础设置
                path: 'memberSetting',
                name: 'memberSetting',
                component: () => import(/* webpackChunkName: "memberManage" */ '../pages/memberManage/setting/setting.vue'),
                meta: {
                    menuName: 'menuList.memberSetting', //lang.config.js 里面的语言键值
                    lightMenu: 'memberManage',//高亮
                    _name: 'memberSetting',
                    iconClass: 'icon-person'
                },
            },
        }
    }
}
