/**
 * Created by Sasha on 2018/6/1.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import defaultsDeep from 'lodash/defaultsDeep';
import {Message} from 'iview';
import ajaxList from '@/api/ajaxList'
import i18n from '../assets/js/lang.config';
import routerClect from '../router/routerClect';
import router from '../router/index';
import {getFourRoute, getNoSubMenuRoute} from '../router/constRouter';

Vue.use(Vuex);


//子路由深度复制
const childDeepClone = (childrenList, data ) => {
    let children = [];
    for (let child in childrenList) {
        let router = defaultsDeep({}, childrenList[child]);
        //判断路由的名称是否存在于权限接口当中，部分父路由没有直接指定名称，所以需要判断meta信息里面的_name对应的权限是否存在
        if (router.meta && router.meta._name && router.meta._name in data) {
            if (router.children) {
                let childrenRouter = childDeepClone(router.children,data);
                //配置没有匹配到路由的重定向页面
                childrenRouter.push(getFourRoute({menuName: '404', lightMenu: router.meta._name, _name: router.meta._name}));
                if (childrenRouter.length > 1) {
                    //静态路由当中没有保存path为空的重定向路由，所以需要给父路由添加重定向路由
                    childrenRouter.push({
                        path: '',
                        redirect: childrenRouter[0].name ? childrenRouter[0].name : childrenRouter[0].meat._name
                    });
                    router['children'] = childrenRouter;
                } else {
                    router['children'] = [getNoSubMenuRoute({
                        menuName: 'noSubMenu',
                        lightMenu: router.meta._name,
                        _name: router.meta._name
                    })];
                }
            } else if (!router.children && !router.name) {
                router['children'] = [getNoSubMenuRoute({
                    menuName: 'noSubMenu',
                    lightMenu: router.meta._name,
                    _name: router.meta._name
                })];
            }
            children.push(router);
        }
    }
    return children;
};

export default new Vuex.Store({
    state: {
        //左侧菜单是否收起
        menuIsPackUp: false,
        //当前选择的语言
        lang: i18n.locale,
        //权限信息
        permissionInfo: [],

        userInfo: null,
        // 组织架构树
        orgTree: {},
        // 员工列表
        employeeList: [],
        // 职位列表
        postList: [],
        // 通知列表
        bootList: [],
        // 未读消息数目
        noticeUnreadNum: 0,
        // 系统消息列表
        systemNoticeList: [],
    },
    getters: {
        // 用户信息（包含账号信息 + 公司信息）
        userInfo: state => {
            return defaultsDeep({}, state.userInfo);
        },
        //左侧菜单是否收起
        menuIsPackUp: state => {
            let menuIsPackUp = localStorage.getItem('menuIsPackUp');
            if (menuIsPackUp) {
                state.menuIsPackUp = (menuIsPackUp === 'true');
            }
            return state.menuIsPackUp;
        },
        //当前语言状态
        lang: state => {
            let lang = localStorage.getItem('lang');
            state.lang = lang ? lang : state.lang;
            return state.lang;
        },
        //一级菜单权限信息
        permissionInfo: state => {
            return state.permissionInfo;
        }

    },
    mutations: {
        //更新左侧菜单是否收起
        updateMenuIsPackUp(state, payload) {
            //保存当前菜单的展开收起状态
            localStorage.setItem('menuIsPackUp', payload);
            state.menuIsPackUp = payload;
        },
        //设置语言
        setLang(state, lang) {
            //保存当前的语言状态
            localStorage.setItem('lang', lang);
            i18n.locale = state.lang = lang;
        },
        //设置用户权限
        updatePermissionInfo(state, data) {
            let routers = childDeepClone(routerClect, data);
            router.addRoutes(routers);
            state.permissionInfo = JSON.parse(JSON.stringify(routers));
        },
    },
    actions: {
        // // 更新用户信息
        // getCurUsrInfo( {commit} ) {
        //     return ajaxList.getCurUsrInfo( param ).then( res => {
        //         if( res.success ){
        //             commit( 'updateUserInfo', res.data );
        //         }else{
        //             console.error('getCurUsrInfo: 获取用户信息失败 ', res);
        //         }
        //         return res
        //     });
        // },
        //获取用户权限信息
        getUserRight({commit}) {
            commit('updatePermissionInfo', {
                'orgManage': 'allow',
                'organization': 'allow',
                'employee': 'allow',
                'rolePermission': 'allow',
                'roleDetail': 'allow',
                'partner': 'allow',
                'channels': 'allow',
                'saleChannelsGroup': 'allow',
                'verificateGroup': 'allow',
                'memberManage': 'allow',
                'memberHome': 'allow',
                'memberInfo': 'allow',
                'memberCount': 'allow',
                'integration': 'allow',
                'specialMember': 'allow',
                'card': 'allow',
                'fund': 'allow',
                'fundDetail': 'allow',
                'financialManagement': 'allow',
                'memberSetting': 'allow',
                'channelSetting': 'allow',
                'levelSetting': 'allow',
                'growthSetting': 'allow',
                'fundSetting': 'allow',
                'consumeSetting': 'allow',
            });
            // return ajaxList.getUserRight(param).then(res => {
            //   if(res.success) {
            //     commit('updateUserRight',res.data);
            //   }else{
            //     console.error('getUserRight：获取用户信息失败')
            //   }
            // });
        }

    },
    modules: {}
});
