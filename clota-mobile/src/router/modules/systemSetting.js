/**
 * 系统设置菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * iconClass 图标类名
 * rightPath 菜单点亮路径,格式为 menuName.menuName 第一个menuName表示一级点亮的菜单，第二个menuName表示当前点亮的左侧菜单（不管层级有多深）
 * isMenu 是否是菜单
 * isStaticMenu 表示不需要权限的菜单，如果配置了这个属性，可以不用再配置是_name
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
                    rightPath : topMenuName + '.' + 'onlinePaymentSetting',
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

            smsManage: {
                //系统设置--短信管理--三级菜单
                path: '/systemSetting/smsManage',
                component: () => import(/* webpackChunkName: "systemSetting" */ '../../pages/systemSetting/smsManage/index.vue'),
                meta: {
                    menuName: 'smsManage', //lang.config.js 里面的语言键值
                    _name: 'members-point',
                    iconClass: 'icon-diamond',
                    rightPath : topMenuName + '.' + 'smsManage',
                    isMenu : true
                },
                children: {
                    buySms: {
                        //系统设置--短信管理--购买短信
                        path: '/systemSetting/smsManage/buySms',
                        name: 'buySms',
                        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/systemSetting/smsManage/buySms.vue'),
                        meta: {
                            menuName: 'buySms', //lang.config.js 里面的语言键值
                            _name: 'point-setting',
                            rightPath : topMenuName + '.' + 'buySms',
                            isMenu : true
                        },
                    },
                    smsTemplate: {
                        //系统设置--短信管理--短信模板
                        path: '/systemSetting/smsManage/smsTemplate',
                        name: 'smsTemplate',
                        component: () => import(/* webpackChunkName: "memberManage" */ '../../pages/systemSetting/smsManage/smsTemplate.vue'),
                        meta: {
                            menuName: 'smsTemplate', //lang.config.js 里面的语言键值
                            _name: 'stuff-setting',
                            rightPath : topMenuName + '.' + 'smsTemplate',
                            isMenu : true
                        },
                    },
                    addSmsTemplate: {
                        //系统设置--短信管理--新增短信模板
                        path: '/systemSetting/smsManage/addSmsTpl',
                        name: 'addSmsTemplate',
                        component: () => import(/* webpackChunkName: "memberInfo" */ '../../pages/systemSetting/smsManage/child/addSmsTemplate.vue'),
                        meta: {
                            menuName: 'smsTemplate', //lang.config.js 里面的语言键值
                            _name: 'stuff-setting',
                            rightPath : topMenuName + '.' + 'smsTemplate',
                        },
                    },
                }
            },
        }
    }
}
