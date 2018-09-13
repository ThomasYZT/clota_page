/**
 * 组织架构菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * lightMenu 这个参数表示当前二级菜单对应的一级菜单
 * iconClass 图标类名
 */
//一级菜单的menuname
let topMenuName = 'org';
export default {
    orgStructure: {
        //组织架构
        path: '/orgManage',
        component: () => import(/* webpackChunkName: "orgStructure" */ '../../pages/orgStructure/index.vue'),
        meta: {
            _name: 'members',
            menuName: 'org',
            rightPath : topMenuName + '.' + 'org',
            isMenu : true
        },
        children: {
            organization: {
                //组织架构--组织架构
                path: '/orgManage/organization',
                name: 'organization',
                component: () => import(/* webpackChunkName: "orgStructure" */ '../../pages/orgStructure/organization/ISPinternetChild/ISPinternetDetail.vue'),
                meta: {
                    menuName: 'organization', //lang.config.js 里面的语言键值
                    _name: 'members', //
                    iconClass: 'icon-person',
                    rightPath : topMenuName + '.' + 'organization',
                    isMenu : true
                },
            },
            employee: {
                //组织架构--员工
                path: '/orgManage/employee',
                name: 'employee',
                component: () => import(/* webpackChunkName: "orgStructure" */ '../../pages/orgStructure/employee/employee.vue'),
                meta: {
                    menuName: 'employee', //lang.config.js 里面的语言键值
                    _name: 'members', //
                    iconClass: 'icon-orgaization',
                    rightPath : topMenuName + '.' + 'employee',
                    isMenu : true
                },
            },
            addEmployee: {
                //组织架构--员工--新增员工
                path: '/orgManage/addEmployee',
                name: 'addEmployee',
                component: () => import(/* webpackChunkName: "orgStructure" */ '../../pages/orgStructure/employee/child/addEmployee.vue'),
                meta: {
                    menuName: 'employee', //lang.config.js 里面的语言键值
                    _name: 'members', //
                    iconClass: 'icon-orgaization',
                    rightPath : topMenuName + '.' + 'employee'
                },
            },
            rolePermission: {
                //组织架构--角色权限
                path: '/orgManage/rolePermission',
                name: 'rolePermission',
                component: () => import(/* webpackChunkName: "orgStructure" */ '../../pages/orgStructure/rolePermission/rolePermission.vue'),
                meta: {
                    menuName: 'rolePermission', //lang.config.js 里面的语言键值
                    _name: 'members', //
                    iconClass: 'icon-role-permission',
                    rightPath : topMenuName + '.' + 'rolePermission',
                    isMenu : true
                },
            },
            addRole: {
                //组织架构--角色权限
                path: '/orgManage/addRole',
                name: 'addRole',
                component: () => import(/* webpackChunkName: "orgStructure" */ '../../pages/orgStructure/rolePermission/child/addRole.vue'),
                meta: {
                    menuName: 'addRole', //lang.config.js 里面的语言键值
                    _name: 'members', //
                    rightPath : topMenuName + '.' + 'rolePermission'
                },
            },
            roleSceneryDetail: {
                //组织架构--角色权限--角色详情
                path: '/orgManage/rolePermission/roleDetail',
                name: 'roleDetail',
                component: () => import(/* webpackChunkName: "orgStructure" */ '../../pages/orgStructure/rolePermission/child/roleDetail.vue'),
                meta: {
                    menuName: 'rolePermission', //lang.config.js 里面的语言键值
                    _name: 'members', //
                    iconClass: 'icon-role-permission',
                    rightPath : topMenuName + '.' + 'rolePermission'
                },
            },
            partner: {
                //组织架构--合作伙伴
                path: '/orgManage/partner',
                name: 'partner',
                component: () => import(/* webpackChunkName: "orgStructure" */ '../../pages/orgStructure/partner/partner.vue'),
                meta: {
                    menuName: 'partner', //lang.config.js 里面的语言键值
                    _name: 'members', //
                    iconClass: 'icon-partner',
                    rightPath : topMenuName + '.' + 'partner',
                    isMenu : true
                },
            },
            channels: {
                //组织架构--自营渠道
                path: '/orgManage/channels',
                name: 'channels',
                component: () => import(/* webpackChunkName: "orgStructure" */ '../../pages/orgStructure/channels/channels.vue'),
                meta: {
                    menuName: 'channels',
                    _name: 'members',
                    iconClass: 'icon-market-channel',
                    rightPath : topMenuName + '.' + 'channels',
                    isMenu : true
                },
            },
            saleChannelsGroup: {
                //组织架构--销售渠道分组
                path: '/orgManage/saleChannelsGroup',
                name: 'saleChannelsGroup',
                component: () => import(/* webpackChunkName: "orgStructure" */ '../../pages/orgStructure/saleChannelsGroup/saleChannelsGroup.vue'),
                meta: {
                    menuName: 'saleChannelsGroup',
                    _name: 'members',
                    iconClass: 'icon-trade-channel',
                    rightPath : topMenuName + '.' + 'saleChannelsGroup',
                    isMenu : true
                },
            },
            verificateGroup: {
                //组织架构--核销设备分组
                path: '/orgManage/verificateGroup',
                name: 'verificateGroup',
                component: () => import(/* webpackChunkName: "orgStructure" */ '../../pages/orgStructure/verificateGroup/verificateGroup.vue'),
                meta: {
                    menuName: 'verificateGroup',
                    _name: 'members',
                    iconClass: 'icon-partner',
                    rightPath : topMenuName + '.' + 'verificateGroup',
                    isMenu : true
                },
            },
        }
    },
}
