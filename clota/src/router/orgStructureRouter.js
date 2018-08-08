/**
 * 组织架构菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * lightMenu 这个参数表示当前二级菜单对应的一级菜单
 * iconClass 图标类名
 */
export default {
    orgStructure: {
        //组织架构
        path: '/orgManage',
        component: () => import(/* webpackChunkName: "orgStructure" */ '../pages/orgStructure/index.vue'),
        meta: {
            _name: 'orgManage',
            menuName: 'menuList.org',
            lightMenu: 'orgManage',
        },
        children: {
            organization: {
                //组织架构--组织架构
                path: 'organization',
                name: 'organization',
                component: () => import(/* webpackChunkName: "orgStructure" */ '../pages/orgStructure/organization/organization.vue'),
                meta: {
                    menuName: 'menuList.org', //lang.config.js 里面的语言键值
                    lightMenu: 'orgManage',//高亮
                    _name: 'organization', //
                    iconClass: 'icon-person'
                },
            },
            employee: {
                //组织架构--员工
                path: 'employee',
                name: 'employee',
                component: () => import(/* webpackChunkName: "orgStructure" */ '../pages/orgStructure/employee/employee.vue'),
                meta: {
                    menuName: 'menuList.employee', //lang.config.js 里面的语言键值
                    lightMenu: 'orgManage',//高亮
                    _name: 'employee', //
                    iconClass: 'icon-orgaization'
                },
            },
            rolePermission: {
                //组织架构--角色权限
                path: 'rolePermission',
                name: 'rolePermission',
                component: () => import(/* webpackChunkName: "orgStructure" */ '../pages/orgStructure/rolePermission/rolePermission.vue'),
                meta: {
                    menuName: 'menuList.rolePermission', //lang.config.js 里面的语言键值
                    lightMenu: 'orgManage',//高亮
                    _name: 'rolePermission', //
                    iconClass: 'icon-role-permission'
                },
            },
            roleSceneryDetail: {
                //组织架构--角色权限--角色详情
                path: 'rolePermission/roleDetail',
                name: 'roleDetail',
                component: () => import(/* webpackChunkName: "orgStructure" */ '../pages/orgStructure/rolePermission/child/roleDetail.vue'),
                meta: {
                    menuName: 'menuList.rolePermission', //lang.config.js 里面的语言键值
                    lightMenu: 'orgManage',//高亮
                    _name: 'rolePermission', //
                    iconClass: 'icon-role-permission'
                },
            },
            partner: {
                //组织架构--合作伙伴
                path: 'partner',
                name: 'partner',
                component: () => import(/* webpackChunkName: "orgStructure" */ '../pages/orgStructure/partner/partner.vue'),
                meta: {
                    menuName: 'menuList.partner', //lang.config.js 里面的语言键值
                    lightMenu: 'orgManage',//高亮
                    _name: 'partner', //
                    iconClass: 'icon-partner'
                },
            },
            channels: {
                //组织架构--自营渠道
                path: 'channels',
                name: 'channels',
                component: () => import(/* webpackChunkName: "orgStructure" */ '../pages/orgStructure/channels/channels.vue'),
                meta: {
                    menuName: 'menuList.channels',
                    lightMenu: 'orgManage',
                    _name: 'channels',
                    iconClass: 'icon-market-channel'
                },
            },
            saleChannelsGroup: {
                //组织架构--销售渠道分组
                path: 'saleChannelsGroup',
                name: 'saleChannelsGroup',
                component: () => import(/* webpackChunkName: "orgStructure" */ '../pages/orgStructure/saleChannelsGroup/saleChannelsGroup.vue'),
                meta: {
                    menuName: 'menuList.saleChannelsGroup',
                    lightMenu: 'orgManage',
                    _name: 'saleChannelsGroup',
                    iconClass: 'icon-trade-channel'
                },
            },
            verificateGroup: {
                //组织架构--核销设备分组
                path: 'verificateGroup',
                name: 'verificateGroup',
                component: () => import(/* webpackChunkName: "orgStructure" */ '../pages/orgStructure/verificateGroup/verificateGroup.vue'),
                meta: {
                    menuName: 'menuList.verificateGroup',
                    lightMenu: 'orgManage',
                    _name: 'verificateGroup',
                    iconClass: 'icon-partner'
                },
            },
        }
    },
}
