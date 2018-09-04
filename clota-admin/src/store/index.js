import Vue from 'vue';
import Vuex from 'vuex';
import i18n from '../assets/lang/lang.config';
import defaultsDeep from 'lodash/defaultsDeep';
import router,{resetRouter} from '../router/index';
import routerClect from '../router/activeRoutes';
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
    },
    getters: {
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
    },
    mutations: {
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
    },
    actions: {
        //获取用户权限信息
        getUserRight(store, route) {
            ajax.get('getPrivileges').then(res => {
                if(res.status === 200){

                }else{

                }
            }).catch(err => {
                this.$Message.error(this.$t('interfaceError'));
            });
            return new Promise((resolve, reject) => {
                let data = {
                    'index': 'allow',
                    'lessee': 'allow',
                    'server': 'allow',
                    'order': 'allow',
                    'system': 'allow',
                    'package': 'allow',
                    'log': 'allow',
                };
                let routers = childDeepClone(routerClect, data);
                routers.push(getFourRoute({menuName: 'notFound', lightMenu: '', _name: ''}));
                //重新设置路由信息
                resetRouter(routers);
                store.commit('updatePermissionInfo',data);
                store.commit('updateRouteInfo',routers);
                // 如果有权限，则跳转到有权限的第一个页面
                if (routers.length > 0) {
                    resolve(routers[0]);
                }
            });

            // ajax.get('getPrivileges').then(res => {
            //
            // }).catch(err => {
            //     router.replace({
            //         name : 'login'
            //     });
            // });
            // commit('updatePermissionInfo',{
            //   'index' : 'allow',
            //   'lessee' : 'allow',
            //   'ISPinternet' : 'allow',
            //   'server' : 'allow',
            // },1);
            // return ajaxList.getUserRight(param).then(res => {
            //   if(res.success) {
            //     commit('updateUserRight',res.data);
            //   }else{
            //     console.error('getUserRight：获取用户信息失败')
            //   }
            // });
        },
        //获取用户信息
        getUserInfo (store) {
            return new Promise((resolve,reject) => {
                if(ajax.getToken()){
                    let data = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
                    store.commit('updateUserInfo',data);
                    resolve(data);
                }else{
                    reject();
                }
            }).then((data) => {
                return store.dispatch('getUserRight');
            }).catch(err => {
                router.replace({
                    name : 'login'
                });
            });
        }
    }
});
