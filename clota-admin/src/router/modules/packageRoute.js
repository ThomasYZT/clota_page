/**
 * 服务菜单路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * lightMenu 这个参数表示当前二级菜单对应的一级菜单
 * showInMenu 作为一级菜单的下拉二级菜单显示
 * subMenuType 二级菜单标志，值唯一，标识为二级菜单
 */
export default {
    //服务菜单主页
    packageIndex : {
        path : '/service',
        component : () => import(/* webpackChunkName: "package" */ '../../pages/package/index.vue'),
        meta : {
            _name : 'service',
            menuName : 'serve',
            lightMenu : 'package',
            isMenu : true
        },
        children : {
            //服务套餐
            packageList : {
                path : '/service/list',
                name : 'packageList',
                component : () => import(/* webpackChunkName: "package" */ '../../pages/package/child/packageInfo.vue'),
                meta : {
                    _name : 'service',
                    menuName : 'serverPackage',
                    lightMenu : 'package',
                    showInMenu : true,
                    subMenuType : 'packageList',
                    isMenu : true
                },
            },
            //新增/编辑服务套餐
            editPackage : {
                path : '/service/edit',
                name : 'editPackage',
                component : () => import(/* webpackChunkName: "package" */ '../../pages/package/child/editPackage.vue'),
                meta : {
                    _name : 'service',
                    menuName : 'serverPackage',
                    lightMenu : 'package',
                    showInMenu : false,
                    subMenuType : 'packageList'
                },
            },
            //短信套餐列表
            notePackageInfo : {
                path : '/service/notePackage/list',
                name : 'notePackageInfo',
                component : () => import(/* webpackChunkName: "package" */ '../../pages/package/child/notePackageInfo.vue'),
                meta : {
                    _name : 'service',
                    menuName : 'notePackage',
                    lightMenu : 'package',
                    showInMenu : true,
                    subMenuType : 'notePackage',
                    isMenu : true
                },
            },
            //新建/编辑短信套餐
            editNotePackageInfo : {
                path : '/service/notePackage/edit',
                name : 'editnotePackage',
                component : () => import(/* webpackChunkName: "package" */ '../../pages/package/child/editNotePackage.vue'),
                meta : {
                    _name : 'service',
                    lightMenu : 'package',
                    showInMenu : false,
                    subMenuType : 'notePackage'
                },
            },
            //服务开通记录
            serviceOpenedRecord : {
                path : '/service/opendRecord',
                name : 'serviceOpendRecord',
                component : () => import(/* webpackChunkName: "package" */ '../../pages/package/child/serviceOpenedRecord.vue'),
                meta : {
                    _name : 'service',
                    menuName : 'serviceOpenRecord',
                    lightMenu : 'package',
                    showInMenu : true,
                    subMenuType : 'serviceOpendRecord',
                    isMenu : true
                },
            },
            //短信购买记录
            smsBuyRecord : {
                path : '/service/smsBuyRecord',
                name : 'smsBuyRecord',
                component : () => import(/* webpackChunkName: "package" */ '../../pages/package/child/smsBuyRecord.vue'),
                meta : {
                    _name : 'service',
                    menuName : 'smsBuyRecord',
                    lightMenu : 'package',
                    showInMenu : true,
                    subMenuType : 'smsBuyRecord',
                    isMenu : true
                },
            },
            //短信发送记录
            smsSendRecord : {
                path : '/service/smsSendRecord',
                name : 'smsSendRecord',
                component : () => import(/* webpackChunkName: "package" */ '../../pages/package/child/smsSendRecord.vue'),
                meta : {
                    _name : 'service',
                    menuName : 'smsSendRecord',
                    lightMenu : 'package',
                    showInMenu : true,
                    subMenuType : 'smsSendRecord',
                    isMenu : true
                },
            },
            //短信发送详情
            smsSendDetail : {
                path : '/service/smsSendRecord/detail',
                name : 'smsSendRecordDetail',
                component : () => import(/* webpackChunkName: "package" */ '../../pages/package/child/smsSendDetail.vue'),
                meta : {
                    _name : 'service',
                    menuName : '',
                    lightMenu : 'package',
                    showInMenu : false,
                    subMenuType : 'smsSendRecord'
                },
            },
        }
    },
};
