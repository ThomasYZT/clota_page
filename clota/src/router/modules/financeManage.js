/**
 * 财务管理菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * iconClass 图标类名
 * rightPath 菜单点亮路径,格式为 menuName.menuName 第一个menuName表示一级点亮的菜单，第二个menuName表示当前点亮的左侧菜单（不管层级有多深）
 * isMenu 是否是菜单
 * isStaticMenu 表示不需要权限的菜单，如果配置了这个属性，可以不用再配置是_name
 */
//一级菜单的menuname
let topMenuName = 'financeManage';
export default {
    financeManage : {
        path : '/financeManage',
        component : () => import(/* webpackChunkName: "financeManage" */ '../../pages/financeManage/index.vue'),
        meta : {
            _name : 'finance-manage',
            menuName : 'financeManage',
            rightPath : topMenuName + '.' + 'financeManage',
            isMenu : true
        },
        children : {
            rechargeRecord : {
                // 财务管理 -- 充值记录
                path : '/financeManage/rechargeRecord',
                name : 'rechargeRecord',
                component : () => import(/* webpackChunkName: "financeManage" */ '../../pages/financeManage/rechargeRecord/rechargeRecord.vue'),
                meta : {
                    _name : 'recharge-record', //
                    menuName : 'rechargeRecord', //lang.config.js 里面的语言键值
                    rightPath : topMenuName + '.' + 'rechargeRecord',
                    iconClass : 'icon-recharge-record',
                    isMenu : true
                },
            },

            paymentManage : {
                // 财务管理 -- 付款账户管理
                path : '/financeManage/payment',
                name : 'paymentManage',
                component : () => import(/* webpackChunkName: "systemSetting" */ '../../pages/financeManage/paymentAccount/paymentManage.vue'),
                meta : {
                    _name : 'payment-account-manage',
                    menuName : 'paymentManage', //lang.config.js 里面的语言键值
                    rightPath : topMenuName + '.' + 'paymentManage',
                    iconClass : 'icon-payment-account',
                    isMenu : true
                },
            },
            financeRecharge : {
                // 财务管理 -- 付款账户管理 -- 充值
                path : '/financeManage/financeRecharge',
                name : 'financeRecharge',
                component : () => import(/* webpackChunkName: "systemSetting" */ '../../pages/financeManage/paymentAccount/child/recharge.vue'),
                meta : {
                    _name : 'payment-account-manage',
                    menuName : 'financeRecharge', //lang.config.js 里面的语言键值
                    rightPath : topMenuName + '.' + 'financeRecharge',
                },
            },

            collectionManage : {
                // 财务管理 -- 收款账户管理
                path : '/financeManage/collection',
                name : 'collectionManage',
                component : () => import(/* webpackChunkName: "systemSetting" */ '../../pages/financeManage/collectionAccount/collectionManage.vue'),
                meta : {
                    _name : 'receivable-account-manage', //
                    menuName : 'collectionManage', //lang.config.js 里面的语言键值
                    rightPath : topMenuName + '.' + 'collectionManage',
                    iconClass : 'icon-credited-account',
                    isMenu : true
                },

            },
        }
    }
};
