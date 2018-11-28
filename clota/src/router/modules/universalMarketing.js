/**
 * 全民营销菜单路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * iconClass 图标类名
 * rightPath 菜单点亮路径,格式为 menuName.menuName 第一个menuName表示一级点亮的菜单，第二个menuName表示当前点亮的左侧菜单（不管层级有多深）
 * isMenu 是否是菜单
 * isStaticMenu 表示不需要权限的菜单，如果配置了这个属性，可以不用再配置是_name
 */

//一级菜单的menuname
let topMenuName = 'universalMarketing';

export default {
    universalMarketing : {
        path : '/universalMarketing',
        component : () => import(/* webpackChunkName: "universalMarketing" */ '../../pages/dataReport/index.vue'),
        meta : {
            _name : 'report', //todo 暂时用数据报表一级菜单权限
            menuName : 'universalMarketing',
            rightPath : topMenuName + '.' + 'universalMarketing',
            isMenu : true
        },
        children : {
            //海报信息
            posterInformation : {
                path : '/universalMarketing/posterInformation',
                component : () => import(/* webpackChunkName: "universalMarketing" */ '../../pages/universalMarketing/posterInformation/index.vue'),
                name : 'posterInformation',
                meta : {
                    menuName : 'posterInformation', //lang.config.js 里面的语言键值
                    _name : 'member-report', //todo 暂时用数据报表二级菜单权限
                    iconClass : 'icon-diamond',
                    rightPath : topMenuName + '.' + 'posterInformation',
                    isMenu : true,
                },
            },
            //综合设置
            comprehensiveSetup : {
                path : '/universalMarketing/comprehensiveSetup',
                component : () => import(/* webpackChunkName: "universalMarketing" */ '../../pages/universalMarketing/comprehensiveSetup/index.vue'),
                name : 'comprehensiveSetup',
                meta : {
                    menuName : 'comprehensiveSetup', //lang.config.js 里面的语言键值
                    _name : 'member-report', //todo 暂时用数据报表二级菜单权限
                    iconClass : 'icon-diamond',
                    rightPath : topMenuName + '.' + 'comprehensiveSetup',
                    isMenu : true,
                },
                children : {
                    //营销类别设置
                    marketingTypeSetting : {
                        path : '/universalMarketing/marketingTypeSetting',
                        component : () => import(/* webpackChunkName: "universalMarketing" */ '../../pages/universalMarketing/comprehensiveSetup/marketingTypeSetting/index.vue'),
                        name : 'marketingTypeSetting',
                        meta : {
                            menuName : 'marketingTypeSetting', //lang.config.js 里面的语言键值
                            _name : 'member-report', //todo 暂时用数据报表二级菜单权限
                            rightPath : topMenuName + '.' + 'marketingTypeSetting',
                            isMenu : true,
                        },
                    },
                    //营销地理位置设置
                    marketingPositionSetting : {
                        path : '/universalMarketing/marketingPositionSetting',
                        component : () => import(/* webpackChunkName: "universalMarketing" */ '../../pages/universalMarketing/comprehensiveSetup/marketingPositionSetting/index.vue'),
                        name : 'marketingPositionSetting',
                        meta : {
                            menuName : 'marketingPositionSetting', //lang.config.js 里面的语言键值
                            _name : 'member-report', //todo 暂时用数据报表二级菜单权限
                            rightPath : topMenuName + '.' + 'marketingPositionSetting',
                            isMenu : true,
                        },
                    }
                }
            },
            //提现记录
            cashRecord : {
                path : '/universalMarketing/cashRecord',
                component : () => import(/* webpackChunkName: "universalMarketing" */ '../../pages/universalMarketing/cashRecord/cashRecord.vue'),
                name : 'cashRecord',
                meta : {
                    menuName : 'cashRecord', //lang.config.js 里面的语言键值
                    _name : 'member-report', //todo 暂时用数据报表二级菜单权限
                    iconClass : 'icon-diamond',
                    rightPath : topMenuName + '.' + 'cashRecord',
                    isMenu : true,
                },
            },
            //营销产品管理
            marketingProductManage : {
                path : '/universalMarketing/marketingManage',
                component : () => import(/* webpackChunkName: "universalMarketing" */ '../../pages/universalMarketing/marketingManage/index.vue'),
                name : 'marketingProductManage',
                meta : {
                    menuName : 'marketingProductManage', //lang.config.js 里面的语言键值
                    _name : 'member-report', //todo 暂时用数据报表二级菜单权限
                    iconClass : 'icon-diamond',
                    rightPath : topMenuName + '.' + 'marketingProductManage',
                    isMenu : true,
                },
            },
            //销售用户信息
            salesUserInfo : {
                path : '/universalMarketing/salesUserInfo',
                component : () => import(/* webpackChunkName: "universalMarketing" */ '../../pages/universalMarketing/salesUserInfo/salesUserInfo.vue'),
                name : 'salesUserInfo',
                meta : {
                    menuName : 'salesUserInfo', //lang.config.js 里面的语言键值
                    _name : 'member-report', //todo 暂时用数据报表二级菜单权限
                    iconClass : 'icon-diamond',
                    rightPath : topMenuName + '.' + 'salesUserInfo',
                    isMenu : true,
                },
            },
        }
    }
}
