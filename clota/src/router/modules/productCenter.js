/**
 * 产品中心菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * iconClass 图标类名
 * rightPath 菜单点亮路径,格式为 menuName.menuName 第一个menuName表示一级点亮的菜单，第二个menuName表示当前点亮的左侧菜单（不管层级有多深）
 * isMenu 是否是菜单
 */
//一级菜单的menuname
let topMenuName = 'productCenter';
export default {
    productCenter: {
        path: '/productCenter',
        component: () => import(/* webpackChunkName: "productCenter" */ '../../pages/productCenter/index.vue'),
        meta: {
            _name: 'members',
            menuName: 'productCenter',
            rightPath : topMenuName + '.' + 'productCenter',
            isMenu : true
        },
        children: {
            productList: {
                //产品中心--产品列表--三级菜单
                path: '/productCenter/pList',
                name : 'productList',
                component: () => import(/* webpackChunkName: "productCenter" */ '../../pages/productCenter/productList/index.vue'),
                meta: {
                    menuName: 'productList', //lang.config.js 里面的语言键值
                    _name: 'members',
                    iconClass: 'icon-diamond',
                    rightPath : topMenuName + '.' + 'productList',
                    isMenu : true
                },
                children: {
                    ticketType: {
                        //产品中心--产品列表--票类
                        path: '/productCenter/pList/ticketType',
                        name: 'ticketType',
                        component: () => import(/* webpackChunkName: "productCenter" */ '../../pages/productCenter/productList/ticketType.vue'),
                        meta: {
                            menuName: 'ticketType', //lang.config.js 里面的语言键值
                            _name: 'point-setting',
                            rightPath : topMenuName + '.' + 'productList',
                            isMenu : true
                        },
                    },

                }
            },

            /*marketingPolicy: {
                //产品中心--销售政策
                path: '/productCenter/productList',
                name: 'onlinePaymentSetting',
                component: () => import(/!* webpackChunkName: "productCenter" *!/ '../../pages/systemSetting/onlinePaymentSetting/onlinePayment.vue'),
                meta: {
                    _name: 'members', //
                    menuName: 'onlinePaymentSetting', //lang.config.js 里面的语言键值
                    rightPath : topMenuName + '.' + 'onlinePaymentSetting',
                    iconClass: 'icon-person',
                    isMenu : true
                },
            },*/


        }
    }
}