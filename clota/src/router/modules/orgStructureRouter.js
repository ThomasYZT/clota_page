/**
 * 组织架构菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值,如果路由有name属性，那么路由的name属性必须和menuName相同
 * iconClass 图标类名
 * rightPath 菜单点亮路径,格式为 menuName.menuName 第一个menuName表示一级点亮的菜单，第二个menuName表示当前点亮的左侧菜单（不管层级有多深）
 * isMenu 是否是菜单
 * isStaticMenu 表示不需要权限的菜单，如果配置了这个属性，可以不用再配置是_name
 */
//一级菜单的menuname
let topMenuName = 'org';
export default {
    orgStructure : {
        //组织架构
        path : '/orgManage',
        component : () => import(/* webpackChunkName: "orgStructureInit" */ '../../pages/orgStructure/index.vue'),
        meta : {
            _name : 'org',
            menuName : 'org',
            rightPath : topMenuName + '.' + 'org',
            isMenu : true
        },
        children : {
            organization : {
                //组织架构--组织架构
                path : '/orgManage/organization',
                name : 'organization',
                component : () => import(/* webpackChunkName: "orgStructureInit" */ '../../pages/orgStructure/organization/ISPinternetChild/ISPinternetDetail.vue'),
                meta : {
                    menuName : 'organization', //lang.config.js 里面的语言键值
                    _name : 'org-struct', //
                    iconClass : 'icon-orgaization',
                    rightPath : topMenuName + '.' + 'organization',
                    isMenu : true
                },
            },
            employee : {
                //组织架构--员工
                path : '/orgManage/employee',
                component : () => import(/* webpackChunkName: "orgStructure" */ '../../pages/orgStructure/employee/index.vue'),
                meta : {
                    menuName : 'employee', //lang.config.js 里面的语言键值
                    _name : 'org-emp', //
                    iconClass : 'icon-person',
                    rightPath : topMenuName + '.' + 'employee',
                    isMenu : true
                },
                children : {
                    generalEmployeeManager : {
                        //组织架构--普通员工列表
                        path : '/orgManage/employee/generalEmployee/List',
                        name : 'generalEmployeeManager',
                        component : () => import(/* webpackChunkName: "orgStructure" */ '../../pages/orgStructure/employee/employee.vue'),
                        meta : {
                            menuName : 'generalEmployeeManager', //lang.config.js 里面的语言键值
                            _name : 'org-emp-common', //
                            lightMenu : 'employee',
                            rightPath : topMenuName + '.' + 'generalEmployeeManager',
                            isMenu : true
                        },
                    },
                    addEmployee : {
                        //组织架构--普通员工--新增普通员工
                        path : '/orgManage/employee/generalEmployee/addEmployee',
                        name : 'addEmployee',
                        component : () => import(/* webpackChunkName: "orgStructure" */ '../../pages/orgStructure/employee/child/addEmployee.vue'),
                        meta : {
                            menuName : 'employee', //lang.config.js 里面的语言键值
                            _name : 'org-emp-common', //
                            lightMenu : 'employee',
                            rightPath : topMenuName + '.' + 'generalEmployeeManager'
                        },
                    },
                    courierManager : {
                        //组织架构--导游管理
                        path : '/orgManage/employee/courierManager/list',
                        name : 'courierManager',
                        component : () => import(/* webpackChunkName: "orgStructure" */ '../../pages/orgStructure/employee/courierManager/courierList.vue'),
                        meta : {
                            menuName : 'courierManager',
                            _name : 'org-emp-guide',//'org-guide',
                            lightMenu : 'employee',
                            rightPath : topMenuName + '.' + 'courierManager',
                            isMenu : true
                        },
                    },
                    driverManager : {
                        //组织架构--司机管理
                        path : '/orgManage/employee/driverManager/list',
                        name : 'driverManager',
                        component : () => import(/* webpackChunkName: "orgStructure" */ '../../pages/orgStructure/employee/driverManager/driverList.vue'),
                        meta : {
                            menuName : 'driverManager',
                            _name : 'org-emp-driver',//'org-driver',
                            lightMenu : 'employee',
                            rightPath : topMenuName + '.' + 'driverManager',
                            isMenu : true
                        },
                    },
                }
            },
            rolePermission : {
                //组织架构--角色权限
                path : '/orgManage/rolePermission',
                name : 'rolePermission',
                component : () => import(/* webpackChunkName: "orgStructure" */ '../../pages/orgStructure/rolePermission/rolePermission.vue'),
                meta : {
                    menuName : 'rolePermission', //lang.config.js 里面的语言键值
                    _name : 'org-role', //
                    iconClass : 'icon-role-permission',
                    rightPath : topMenuName + '.' + 'rolePermission',
                    isMenu : true
                },
            },
            addRole : {
                //组织架构--新增角色权限
                path : '/orgManage/addRole',
                name : 'addRole',
                component : () => import(/* webpackChunkName: "orgStructure" */ '../../pages/orgStructure/rolePermission/child/addRole.vue'),
                meta : {
                    menuName : 'addRole', //lang.config.js 里面的语言键值
                    _name : 'org-role', //
                    rightPath : topMenuName + '.' + 'rolePermission'
                },
            },
            partner : {
                //组织架构--合作伙伴
                path : '/orgManage/partner',
                name : 'partner',
                component : () => import(/* webpackChunkName: "orgStructure" */ '../../pages/orgStructure/partner/partner.vue'),
                meta : {
                    menuName : 'partner', //lang.config.js 里面的语言键值
                    _name : 'org-partner', //
                    iconClass : 'icon-partner',
                    rightPath : topMenuName + '.' + 'partner',
                    isMenu : true
                },
            },
            channels : {
                //组织架构--自营渠道
                path : '/orgManage/channels',
                name : 'channels',
                component : () => import(/* webpackChunkName: "orgStructure" */ '../../pages/orgStructure/channels/channels.vue'),
                meta : {
                    menuName : 'channels',
                    _name : 'org-channel',
                    iconClass : 'icon-trade-channel',
                    rightPath : topMenuName + '.' + 'channels',
                    isMenu : true
                },
            },
            saleChannelsGroup : {
                //组织架构--销售渠道分组
                path : '/orgManage/saleChannelsGroup',
                name : 'saleChannelsGroup',
                component : () => import(/* webpackChunkName: "orgStructure" */ '../../pages/orgStructure/saleChannelsGroup/saleChannelsGroup.vue'),
                meta : {
                    menuName : 'saleChannelsGroup',
                    _name : 'org-sale',
                    iconClass : 'icon-market-channel',
                    rightPath : topMenuName + '.' + 'saleChannelsGroup',
                    isMenu : true
                },
            },
            verificateGroup : {
                //组织架构--核销设备分组
                path : '/orgManage/verificateGroup',
                name : 'verificateGroup',
                component : () => import(/* webpackChunkName: "orgStructure" */ '../../pages/orgStructure/verificateGroup/checkGroup.vue'),
                meta : {
                    menuName : 'verificateGroup',
                    _name : 'org-checker',
                    iconClass : 'icon-check-group',
                    rightPath : topMenuName + '.' + 'verificateGroup',
                    isMenu : true
                },
            },
        }
    },
};
