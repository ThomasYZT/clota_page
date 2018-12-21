/**
 * 系统菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * lightMenu 这个参数表示当前二级菜单对应的一级菜单
 * showInMenu 作为一级菜单的下拉二级菜单显示
 * subMenuType 二级菜单标志，值唯一，标识为二级菜单
 */
export default {
    //系统主页
    systemIndex : {
        path : '/system',
        component : () => import(/* webpackChunkName: "system" */ '../../pages/system/index.vue'),
        meta : {
            _name : 'system',
            menuName : 'system',
            lightMenu : 'system',
            isMenu : true
        },
        children : {
            //账号管理
            account : {
                path : '/system/account',
                name : 'account',
                component : () => import(/* webpackChunkName: "system" */ '../../pages/system/child/account.vue'),
                meta : {
                    _name : 'system',
                    menuName : 'accountName',
                    lightMenu : 'system',
                    showInMenu : true,
                    subMenuType : 'account',
                    isMenu : true
                },
            },
            //系统公告
            systemNotice : {
                path : '/system/notice',
                name : 'systemNotice',
                component : () => import(/* webpackChunkName: "system" */ '../../pages/system/child/systemNotice.vue'),
                meta : {
                    _name : 'system',
                    menuName : 'systemNotice',
                    lightMenu : 'system',
                    showInMenu : true,
                    subMenuType : 'notice',
                    isMenu : true
                },
            },
            //新增/编辑系统公告
            editSystemNotice : {
                path : '/system/notice/edit',
                name : 'editSystemNotice',
                component : () => import(/* webpackChunkName: "system" */ '../../pages/system/child/editSystemNotice.vue'),
                meta : {
                    _name : 'system',
                    menuName : 'editSystemNotice',
                    lightMenu : 'system',
                    showInMenu : false,
                    subMenuType : 'notice'
                },
            },
            //新增/编辑账号
            addAccount : {
                path : '/system/account/edit',
                name : 'addAccount',
                component : () => import(/* webpackChunkName: "system" */ '../../pages/system/child/addAccount.vue'),
                meta : {
                    _name : 'system',
                    menuName : 'addAccount',
                    lightMenu : 'system',
                    subMenuType : 'account'
                },
            },
            //设置
            setting : {
                path : '/system/setting',
                component : () => import(/* webpackChunkName: "system" */ '../../pages/system/child/setting.vue'),
                meta : {
                    _name : 'system',
                    menuName : 'setting',
                    lightMenu : 'system',
                    showInMenu : true,
                    subMenuType : 'setting',
                    isMenu : true
                },
                children : {
                    //通用设置
                    customeSetting : {
                        path : '/system/setting/customeSetting',
                        name : 'customeSetting',
                        component : () => import(/* webpackChunkName: "system" */ '../../pages/system/child/settingChild/customSetting.vue'),
                        meta : {
                            _name : 'system',
                            menuName : 'setting',
                            lightMenu : 'system',
                            subMenuType : 'setting'
                        },
                    },
                    //计量单位
                    measureUnit : {
                        path : '/system/setting/measureUnit',
                        name : 'measureUnit',
                        component : () => import(/* webpackChunkName: "system" */ '../../pages/system/child/settingChild/measureUnit.vue'),
                        meta : {
                            _name : 'system',
                            menuName : 'setting',
                            lightMenu : 'system',
                            subMenuType : 'setting'
                        },
                    },
                    //节假日信息
                    holiday : {
                        path : '/system/setting/holiday',
                        name : 'holiday',
                        component : () => import(/* webpackChunkName: "system" */ '../../pages/system/child/settingChild/holiday.vue'),
                        meta : {
                            _name : 'system',
                            menuName : 'setting',
                            lightMenu : 'system',
                            subMenuType : 'setting'
                        },
                    },
                    //渠道信息
                    channel : {
                        path : '/system/setting/channel',
                        name : 'channel',
                        component : () => import(/* webpackChunkName: "system" */ '../../pages/system/child/settingChild/channel.vue'),
                        meta : {
                            _name : 'system',
                            menuName : 'setting',
                            lightMenu : 'system',
                            subMenuType : 'setting'
                        },
                    },
                    //地区信息
                    region : {
                        path : '/system/setting/region',
                        name : 'region',
                        component : () => import(/* webpackChunkName: "system" */ '../../pages/system/child/settingChild/region.vue'),
                        meta : {
                            _name : 'system',
                            menuName : 'setting',
                            lightMenu : 'system',
                            subMenuType : 'setting'
                        },
                    }
                }
            },
            //新增/编辑计量单位
            editMeasureUnit : {
                path : '/setting/measureUnit/edit',
                name : 'editMeasureUnit',
                component : () => import(/* webpackChunkName: "system" */ '../../pages/system/child/settingChild/editMeasureUnit.vue'),
                meta : {
                    _name : 'system',
                    menuName : 'setting',
                    lightMenu : 'system',
                    subMenuType : 'setting'
                },
            },
            //新增/编辑节假日信息
            editHoliday : {
                path : '/setting/holiday/edit',
                name : 'editHoliday',
                component : () => import(/* webpackChunkName: "system" */ '../../pages/system/child/settingChild/editHoliday.vue'),
                meta : {
                    _name : 'system',
                    menuName : 'setting',
                    lightMenu : 'system',
                    subMenuType : 'setting'
                },
            },
            //新增/编辑渠道信息
            editChannel : {
                path : '/setting/channel/edit',
                name : 'editChannel',
                component : () => import(/* webpackChunkName: "system" */ '../../pages/system/child/settingChild/editChannel.vue'),
                meta : {
                    _name : 'system',
                    menuName : 'setting',
                    lightMenu : 'system',
                    subMenuType : 'setting'
                },
            },
            //新增/编辑地区信息
            editRegion : {
                path : '/setting/region/edit',
                name : 'editRegion',
                component : () => import(/* webpackChunkName: "system" */ '../../pages/system/child/settingChild/editRegion.vue'),
                meta : {
                    _name : 'system',
                    menuName : 'setting',
                    lightMenu : 'system',
                    subMenuType : 'setting'
                },
            },
            //帮助中心
            helperCenter : {
                path : '/setting/helperCenter',
                name : 'helperCenter', //todo 权限暂时使用设置-账户的权限
                component : () => import(/* webpackChunkName: "system" */ '../../pages/system/child/helperCenter/index.vue'),
                meta : {
                    _name : 'system',
                    menuName : 'helperCenter',
                    lightMenu : 'system',
                    showInMenu : true,
                    subMenuType : 'helperCenter',
                    isMenu : true
                },
            }
        }
    },
};
