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
        if ((router.meta && router.meta._name && router.meta._name in data) || (router.meta && router.meta.isStaticMenu)) {
            if (router.children) {
                let children = childDeepClone(router.children, data);
                //配置没有匹配到路由的重定向页面
                children.push(getFourRoute({menuName: '404', lightMenu: router.meta._name, _name: router.meta._name}));
                if (children.length > 1) {
                    //静态路由当中没有保存path为空的重定向路由，所以需要给父路由添加重定向路由
                    children.push({
                        path: '',
                        redirect: {
                            // name : children[0].name ? children[0].name : children[0].meta._name
                            path : children[0].path ? children[0].path : ''
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
        userInfo : {},
        //页面是否显示加载中
        isLoading : false,
        //当前正在加载中的接口个数
        promisings : 0,
        //右侧操作栏是否显示
        operateLine : false,
        //组织信息
        manageOrgs : {},
        //当前的皮肤
        skinType : 'blue-theame',
        //随机数，用于更新组件
        hashKey : '',
        //当前账号拥有的所有组织结构信息,
        manageOrgList : []
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
        },
        //是否显示页面加载中
        isLoading : state => {
            return state.isLoading;
        },
        //右侧操作栏是否显示
        operateLine : state => {
            return state.operateLine;
        },
        //当前选择的组织信息
        manageOrgs : state => {
            return state.manageOrgs;
        },
        //当前账号拥有的所有组织结构信息
        manageOrgList : state => {
           return state.manageOrgList;
        },
        // 获取当前的皮肤信息
        skinType : state => {
            let skinType = localStorage.getItem('skinType');
            if (skinType) {
                state.skinType = skinType;
            }
            return state.skinType;
        },
        hashKey : state => {
            return state.hashKey;
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
            window.location.reload();
        },
        //改变操作栏状态
        changeOperateLine (state,status) {
            state.operateLine = status;
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
        },
        //改变是否加载中的状态
        changeLoadingStatus (state,loading){
            state.isLoading = loading;
        },
        //更改请求中接口的个数
        changePromisings (state,type){
            if(type === 'add'){
                state.promisings++;
            }else if(type === 'del'){
                state.promisings--;
            }
            if(state.promisings > 0){
                state.isLoading = true;
            }else{
                setTimeout(() => {
                    state.isLoading = false;
                },200);
            }
        },
        //更改组织机构
        updateManageOrgs(state,org) {
            state.manageOrgs = org;
        },
        //更改皮肤
        updateSkin (state,skin) {
            localStorage.setItem('skinType',skin);
            state.skinType = skin;
        },
        //更新随机数
        updateHashKey (state) {
            state.hashKey = Math.random();
        },
        //更新节点信息
        updatemanageOrgList (state ,manageOrgList) {
            state.manageOrgList = manageOrgList;
        }
    },
    actions: {
        //获取用户权限信息
        getUserRight(store, route) {
            return ajax.post('getPrivilege',{
                orgId : store.state.manageOrgs.id
            }).then(res =>{
                if(res.success){
                    sessionStorage.setItem('token',res.data ? res.data.token : '');
                    return new Promise((resolve, reject) => {
                        let privCode = {};
                        let privateData = res.data.privileges;
                        //获取账号的菜单权限
                        for(let i = 0,j = privateData.length;i < j;i++){
                            privCode[privateData[i]['privCode']] = 'allow';
                        }
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
                    Vue.prototype.$Message.error(i18n.messages[i18n.locale]['rightGetError']);
                    return new Promise().reject();
                }
            }).catch(() => {
                Vue.prototype.$Message.error(i18n.messages[i18n.locale]['rightGetError']);
            });
        },
        //获取用户信息
        getUserInfo (store,userInfo) {
            return new Promise((resolve,reject) => {
                if(userInfo.token){
                    store.commit('updateUserInfo',userInfo);
                    let manageOrgs = userInfo.manageOrgs ? userInfo.manageOrgs : [];
                    let orgIndex = localStorage.getItem('orgId');
                    if(orgIndex === '' || orgIndex === null){
                        orgIndex = manageOrgs[0].id;
                        localStorage.setItem('orgIndex',orgIndex);
                    }
                    for(let i = 0,j = manageOrgs.length;i < j;i++){
                        if(orgIndex === manageOrgs[i].id){
                            store.commit('updateManageOrgs',manageOrgs[i]);
                            break;
                        }
                    }
                    resolve(userInfo);
                }else{
                    reject();
                }
            }).then(() => {
                return store.dispatch('getUserRight');
            }).catch(err => {
                console.log(err)
            });
        },
        //重新选择登录的机构
        resetNodeChosed (store,orgInfo ) {
            store.state.manageOrgs = orgInfo;
            return this.dispatch('getUserRight').then(res =>{
                store.commit('updateHashKey');
                return res;
            });
        },
        /**
         * 更新当前账号下的组织结构信息
         */
        freshOrgs (store) {
            ajax.post('getManageOrgs').then(res => {
                if(res.success){
                    let manageOrgs = res.data ? res.data : [];
                    let userInfo = Object.assign({
                        manageOrgs : manageOrgs
                    },store.userInfo);
                    sessionStorage.setItem('userInfo',JSON.stringify(userInfo));
                    store.commit('updatemanageOrgList',);
                }else{
                    store.commit('updatemanageOrgList',{});
                }
            });
        }
    }
});
