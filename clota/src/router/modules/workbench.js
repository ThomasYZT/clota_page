/**
 * 工作台菜单路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * iconClass 图标类名
 * rightPath 菜单点亮路径,格式为 menuName.menuName 第一个menuName表示一级点亮的菜单，第二个menuName表示当前点亮的左侧菜单（不管层级有多深）
 * isMenu 是否是菜单
 * isStaticMenu 表示不需要权限的菜单，如果配置了这个属性，可以不用再配置是_name
 */

//一级菜单的menuname
let topMenuName = 'workbench';

export default {
    workbench : {
        path : '/workbench',
        name : 'workbench',
        component : () => import(/* webpackChunkName: "universalMarketing" */ '../../pages/workbench/index.vue'),
        meta : {
            _name : 'workbench', //todo 暂时用数据报表一级菜单权限
            menuName : 'workbench',
            rightPath : topMenuName + '.' + 'workbench',
            isMenu : true,
            hasSideBar : false,
        },
        /*children : {
            //景区服务工作台
            scenicService : {
                path : '/workbench/scenicService',
                component : () => import(/!* webpackChunkName: "universalMarketing" *!/ '../../pages/workbench/scenicService/scenicService.vue'),
                name : 'scenicService',
                meta : {
                    menuName : 'scenicWorkbench', //lang.config.js 里面的语言键值
                    _name : 'workbench',
                    rightPath : topMenuName + '.' + 'scenicService',
                    isMenu : true,
                    hasSideBar : false,
                },
            },
            //合作伙伴工作台
            cooperPartner : {
                path : '/workbench/cooperPartner',
                component : () => import(/!* webpackChunkName: "universalMarketing" *!/ '../../pages/workbench/cooperPartner/cooperPartner.vue'),
                name : 'cooperPartner',
                meta : {
                    menuName : 'partnerWorkbench', //lang.config.js 里面的语言键值
                    _name : 'workbench',
                    rightPath : topMenuName + '.' + 'cooperPartner',
                    isMenu : true,
                    hasSideBar : false,
                },
            },

            //公司/单位工作台
            company : {
                path : '/workbench/scenicService',
                component : () => import(/!* webpackChunkName: "universalMarketing" *!/ '../../pages/workbench/scenicService/scenicService.vue'),
                name : 'company',
                meta : {
                    menuName : 'companyWorkbench', //lang.config.js 里面的语言键值
                    _name : 'workbench', //todo 暂时用数据报表二级菜单权限
                    rightPath : topMenuName + '.' + 'company',
                    isMenu : true,
                    hasSideBar : false,
                },
            },
        }*/
    }
};
