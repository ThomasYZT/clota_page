import Vue from 'vue';
import Vuex from 'vuex';
import i18n from '../assets/lang/lang.config';
import defaultsDeep from 'lodash/defaultsDeep';
import router,{resetRouter} from '../router/index';
import routerClect from '../router/routerClect';
import ajax from '@/api/index.js';
import {getFourRoute, getNoSubMenuRoute} from '../router/constRouter';

Vue.use(Vuex);

//子路由深度复制
const childDeepClone = (childrenList, data) => {
    let children = [];
    for (let child in childrenList) {
        let router = defaultsDeep({}, childrenList[child]);
        //判断路由的名称是否存在于权限接口当中，部分父路由没有直接指定名称，所以需要判断meta信息里面的_name对应的权限是否存在
        if ((router.meta && router.meta._name && router.meta._name in data)) {
            if (router.children) {
                let children = childDeepClone(router.children, data);
                //配置没有匹配到路由的重定向页面
                children.push(getFourRoute({menuName: '404', lightMenu: router.meta._name, _name: router.meta._name}));
                if (children.length > 1) {
                    //静态路由当中没有保存path为空的重定向路由，所以需要给父路由添加重定向路由
                    children.push({
                        path: '',
                        redirect: {
                            name : children[0].name ? children[0].name : children[0].meat._name
                        }
                    });
                    router['children'] = children;
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
        permissionInfo: null,
        //生成的路由信息
        routerInfo: null,
        //用户信息
        userInfo : {}
    },
    getters: {
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
        },
        //生成的路由信息
        routerInfo: state => {
            return state.routerInfo;
        },
        //用户信息
        userInfo : state => {
            return state.userInfo;
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
            state.permissionInfo = data;
        },
        //设置用户信息
        updateUserInfo (state,data) {
            state.userInfo = data;
        },
        //更新路由信息
        updateRouteInfo (state,routerInfo) {
            state.routerInfo = routerInfo;
        }
    },
    actions: {
        //获取用户权限信息
        getUserRight(store, route) {
            let index = sessionStorage.getItem('orgIndex') ? sessionStorage.getItem('orgIndex') : 0;
            return ajax.post('getPrivilege',{
                orgId : store.getters.userInfo.manageOrgs[index].id
            }).then(res =>{
                if(res.success){
                    return new Promise((resolve, reject) => {
                        // let privCode = {};
                        // for(let i = 0,j = res.data.length;i < j;i++){
                        //     privCode[res.data[i]['privCode']] = 'allow';
                        // }
                        let privCode = {
                            // 'orgManage': 'allow',
                            // 'organization': 'allow',
                            // 'employee': 'allow',
                            // 'rolePermission': 'allow',
                            // 'roleDetail': 'allow',
                            // 'partner': 'allow',
                            // 'channels': 'allow',
                            // 'saleChannelsGroup': 'allow',
                            // 'verificateGroup': 'allow',
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
                        };
                        let routers = childDeepClone(routerClect, privCode);
                        routers.push(getFourRoute({menuName: 'notFound', lightMenu: '', _name: ''}));
                        //重新设置路由信息
                        resetRouter(routers);
                        store.commit('updatePermissionInfo',privCode);
                        store.commit('updateRouteInfo',routers);
                        // 如果有权限，则跳转到有权限的第一个页面
                        if (routers.length > 0) {
                            resolve(routers[0]);
                        }
                    }).catch(err => {
                        console.log(err)
                    });
                }else{
                    Vue.prototype.$Message.error(this.$t('rightGetError'));
                    return new Promise().reject();
                }
            }).catch(() => {
                Vue.prototype.$Message.error(this.$t('rightGetError'));
            });
        },
        //获取用户信息
        getUserInfo (store,userInfo) {
            return new Promise((resolve,reject) => {
                if(userInfo.token){
                    store.commit('updateUserInfo',userInfo);
                    resolve(userInfo);
                }else{
                    reject();
                }
            }).then(() => {
                return store.dispatch('getUserRight');
            }).catch(err => {
                console.log(err)
            });
        }
    }
});
