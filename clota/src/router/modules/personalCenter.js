/**
 * 个人中心菜单路由，及组织架构子路由，这里是静态路由，不直接添加到$router中，
 * meta信息解释
 *  _name用来判断路由的权限
 * menuName 对应的语言配置文件当中的键值
 * iconClass 图标类名
 * rightPath 菜单点亮路径,格式为 menuName.menuName 第一个menuName表示一级点亮的菜单，第二个menuName表示当前点亮的左侧菜单（不管层级有多深）
 * isMenu 是否是菜单
 * isStaticMenu 表示不需要权限的菜单，如果配置了这个属性，可以不用再配置是_name
 */
//一级菜单的menuname
let topMenuName = 'personalCenter';
export default {
    personalCenter : {
        path : '/personalCenter',
        component : () => import(/* webpackChunkName: "systemSetting" */ '../../pages/personalCenter/index.vue'),
        meta : {
            menuName : 'personalCenter',
            rightPath : topMenuName + '.' + 'personalCenter',
            isStaticMenu : true
        },
        children : {
            personalInfo : {
                // 个人中心 - 个人信息
                path : '/personalCenter/info',
                name : 'personalInfo',
                component : () => import(/* webpackChunkName: "personalCenter" */ '../../pages/personalCenter/personalInfo/personalInfo.vue'),
                meta : {
                    menuName : 'personalInfo', //lang.config.js 里面的语言键值
                    rightPath : topMenuName + '.' + 'personalInfo',
                    iconClass : 'icon-person',
                    isStaticMenu : true
                },
            },

            pwdModifying : {
                // 个人中心 - 修改密码
                path : '/personalCenter/pwdModifying',
                name : 'pwdModifying',
                component : () => import(/* webpackChunkName: "personalCenter" */ '../../pages/personalCenter/pwdModifying/pwdModifying.vue'),
                meta : {
                    menuName : 'pwdModifying', //lang.config.js 里面的语言键值
                    rightPath : topMenuName + '.' + 'pwdModifying',
                    iconClass : 'icon-change-password',
                    isStaticMenu : true
                },
            },

        }
    }
};
