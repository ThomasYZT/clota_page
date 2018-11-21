/**
 * 服务器菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * lightMenu 这个参数表示当前二级菜单对应的一级菜单
 * showInMenu 作为一级菜单的下拉二级菜单显示
 * subMenuType 二级菜单标志，值唯一，标识为二级菜单
 */
export default {
    server : {
        path : '/server',
        name : 'server',
        component : () => import(/* webpackChunkName: "server" */ '../../pages/server/index.vue'),
        meta : {
            _name : 'server',
            menuName : 'server',
            lightMenu : 'server',
        }
    },
    //服务器详情
    serverDetail : {
        path : '/server/detail',
        name : 'serverDetail',
        component : () => import(/* webpackChunkName: "server" */ '../../pages/server/child/deviceInfo.vue'),
        meta : {
            _name : 'server',
            menuName : 'server',
            lightMenu : 'server',
        },
    },
    //服务器详情
    systemAlarmDetail : {
        path : '/server/detail/systemAlarm',
        name : 'systemAlarm',
        component : () => import(/* webpackChunkName: "server" */ '../../pages/server/child/systemAlarmDetail.vue'),
        meta : {
            _name : 'server',
            menuName : 'server',
            lightMenu : 'server',
        },
    },
    //新增服务器
    addServer : {
        path : '/server/addServer',
        name : 'addServer',
        component : () => import(/* webpackChunkName: "server" */ '../../pages/server/child/addServer.vue'),
        meta : {
            _name : 'server',
            menuName : 'server',
            lightMenu : 'server',
        },
    },

    //日志记录详情
    logDetail : {
        path : '/server/logDetail',
        name : 'logDetail',
        component : () => import(/* webpackChunkName: "server" */ '../../pages/server/child/logDetail.vue'),
        meta : {
            _name : 'server',
            menuName : 'server',
            lightMenu : 'server',
        },
    },

    //磁盘情况监督
    diskDetail : {
        path : '/server/diskDetail',
        name : 'diskDetail',
        component : () => import(/* webpackChunkName: "server" */ '../../pages/server/child/diskDetail.vue'),
        meta : {
            _name : 'server',
            menuName : 'server',
            lightMenu : 'server',
        },
    }
};
