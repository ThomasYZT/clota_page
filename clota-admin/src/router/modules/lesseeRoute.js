/**
 * 租户菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * lightMenu 这个参数表示当前二级菜单对应的一级菜单
 * showInMenu 作为一级菜单的下拉二级菜单显示
 * subMenuType 二级菜单标志，值唯一，标识为二级菜单
 */
export default {
    //租户菜单
    lessee : {
        path : '/lessee',
        component : () => import(/* webpackChunkName: "lessee" */ '../../pages/lessee/index.vue'),
        meta : {
            _name : 'lessee',
            menuName : 'lessee',
            lightMenu : 'lessee',
        },
        children : {
            //服务提供商
            ISPinternet : {
                path : 'ISPinternet',
                name : 'ISPinternet',
                component : () => import(/* webpackChunkName: "lessee" */ '../../pages/lessee/child/ISPinternet'),
                meta : {
                    _name : 'lessee',
                    menuName : 'lessee',
                    lightMenu : 'lessee',
                },
            },
            //合作渠道（机构）
            cooperaChannelOrg : {
                path : 'cooperaChannelOrg',
                name : 'cooperaChannelOrg',
                component : () => import(/* webpackChunkName: "lessee" */ '../../pages/lessee/child/cooperaChannelOrg'),
                meta : {
                    _name : 'lessee',
                    menuName : 'lessee',
                    lightMenu : 'lessee',
                },
            },
            //合作渠道（个人）
            cooperaChannelPer : {
                path : 'cooperaChannelPer',
                name : 'cooperaChannelPer',
                component : () => import(/* webpackChunkName: "lessee" */ '../../pages/lessee/child/cooperaChannelPer'),
                meta : {
                    _name : 'lessee',
                    menuName : 'lessee',
                    lightMenu : 'lessee',
                },
            },
        }
    },
    //新增租户
    addLess : {
        path : '/ISPinternet/addLess',
        name : 'addLess',
        component : () => import(/* webpackChunkName: "lessee" */ '../../pages/lessee/child/ISPinternetChild/addLess.vue'),
        meta : {
            _name : 'lessee',
            menuName : 'lessee',
            lightMenu : 'lessee',
        },
    },
    //服务提供商详情
    ISPinternet : {
        path : '/ISPinternet/detail',
        name : 'ISPinternetDetail',
        component : () => import(/* webpackChunkName: "lessee" */ '../../pages/lessee/child/ISPinternetChild/ISPinternetDetail.vue'),
        meta : {
            _name : 'lessee',
            menuName : 'lessee',
            lightMenu : 'lessee',
        },
    },
    // //合作渠道（个人）详情
    cooperaChannelPerDetail : {
        path : '/cooperaChannelPer/detail',
        name : 'cooperaChannelPerDetail',
        component : () => import(/* webpackChunkName: "lessee" */ '../../pages/lessee/child/cooperaChannelChild/index.vue'),
        meta : {
            _name : 'lessee',
            menuName : 'lessee',
            lightMenu : 'lessee',
        },
    },
};
