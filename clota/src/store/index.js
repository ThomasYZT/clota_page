import Vue from 'vue';
import Vuex from 'vuex';
import i18n from '../assets/lang/lang.config';
import defaultsDeep from 'lodash/defaultsDeep';
import router,{ resetRouter } from '../router/index';
import routerClect from '../router/routerClect';
import ajax from '@/api/index.js';
import { getFourRoute, getNoSubMenuRoute } from '../router/constRouter';
import debounce from 'lodash/debounce';

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
                children.push(getFourRoute({ menuName : '404', lightMenu : router.meta._name, _name : router.meta._name }));
                if (children.length > 1) {
                    //静态路由当中没有保存path为空的重定向路由，所以需要给父路由添加重定向路由
                    children.push({
                        path : '',
                        redirect : {
                            // name : children[0].name ? children[0].name : children[0].meta._name
                            path : children[0].path ? children[0].path : ''
                        }
                    });
                    router['children'] = children;
                } else {
                    router['children'] = [getNoSubMenuRoute({
                        menuName : 'noSubMenu',
                        lightMenu : router.meta._name,
                        _name : router.meta._name
                    })];
                }
            } else if (!router.children && !router.name) {
                router['children'] = [getNoSubMenuRoute({
                    menuName : 'noSubMenu',
                    lightMenu : router.meta._name,
                    _name : router.meta._name
                })];
            }
            children.push(router);
        }
    }
    return children;
};

export default new Vuex.Store({
    state : {
        //左侧菜单是否收起
        menuIsPackUp : false,
        //当前选择的语言
        lang : i18n.locale,
        //权限信息
        permissionInfo : null,
        //生成的路由信息
        routerInfo : null,
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
        manageOrgList : [],
        //当前浏览器是否支持读卡器，如果支持，是否启用
        cardReadEnabled : false
    },
    getters : {
        //左侧菜单是否收起
        menuIsPackUp : state => {
            let menuIsPackUp = localStorage.getItem('menuIsPackUp');
            if (menuIsPackUp) {
                state.menuIsPackUp = (menuIsPackUp === 'true');
            }
            return state.menuIsPackUp;
        },
        //当前语言状态
        lang : state => {
            let lang = localStorage.getItem('lang');
            state.lang = lang ? lang : state.lang;
            return state.lang;
        },
        //一级菜单权限信息
        permissionInfo : state => {
            return state.permissionInfo;
        },
        //生成的路由信息
        routerInfo : state => {
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
        },
        cardReadEnabled : state => state.cardReadEnabled
    },
    mutations : {
        //更新左侧菜单是否收起
        updateMenuIsPackUp (state, payload) {
            //保存当前菜单的展开收起状态
            localStorage.setItem('menuIsPackUp', payload);
            state.menuIsPackUp = payload;
        },
        //设置语言
        setLang (state, lang) {
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
        updatePermissionInfo (state, data) {
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
        changeLoadingStatus (state,loading) {
            state.isLoading = loading;
        },
        //更改请求中接口的个数
        changePromisings (state,type) {
            if (type === 'add') {
                state.promisings++;
            } else if (type === 'del') {
                state.promisings--;
            }
            if (state.promisings > 0) {
                state.isLoading = true;
            } else {
                setTimeout(() => {
                    state.isLoading = false;
                },200);
            }
        },
        //更改组织机构
        updateManageOrgs (state,org) {
            let orgInfoStorage = localStorage.getItem('manageOrg');
            if (orgInfoStorage) {
                state.manageOrgs = JSON.parse(orgInfoStorage);
            } else {
                state.manageOrgs = org;
            }
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
        },
        //更新读卡器是否可用的状态
        updateCardReadEnabled (state,isEnabled) {
            state.cardReadEnabled = isEnabled;
        }
    },
    actions : {
        //获取用户权限信息
        getUserRight (store, route) {
            store.dispatch('freshOrgs');
            return ajax.post('getPrivilege',{
                orgId : store.getters.manageOrgs.id
            }).then(res =>{
                if (res.success) {
                    sessionStorage.setItem('token',res.data ? res.data.token : '');
                    return new Promise((resolve, reject) => {
                        let privCode = {};
                        let privateData = res.data.privileges;
                        //获取账号的菜单权限
                        for (let i = 0,j = privateData.length; i < j; i++) {
                            privCode[privateData[i]['privCode']] = 'allow';
                        }
                        let routers = childDeepClone(routerClect, privCode);
                        routers.push(getFourRoute({ menuName : 'notFound', lightMenu : '', _name : '' }));
                        //重新设置路由信息
                        resetRouter(routers);
                        store.commit('updatePermissionInfo',privCode);
                        store.commit('updateRouteInfo',routers);
                        // 如果有权限，则跳转到有权限的第一个页面
                        if (routers.length > 0) {
                            resolve(routers[0]);
                        } else {
                            reject();
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                } else {
                    store.dispatch('showErrToast','rightGetError');
                    // Vue.prototype.$Message.error(i18n.messages[i18n.locale]['rightGetError']);
                    return new Promise().reject();
                }
            }).catch(() => {
                store.dispatch('showErrToast','rightGetError');
                // Vue.prototype.$Message.error(i18n.messages[i18n.locale]['rightGetError']);
            });
        },
        //获取用户信息
        getUserInfo (store,userInfo) {
            return new Promise((resolve,reject) => {
                if (userInfo.token) {
                    store.commit('updateUserInfo',userInfo);
                    let manageOrgs = userInfo.manageOrgs ? userInfo.manageOrgs : [];
                    let orgIndex = localStorage.getItem('orgId');
                    if (orgIndex === '' || orgIndex === null) {
                        orgIndex = manageOrgs[0].id;
                        localStorage.setItem('orgIndex',orgIndex);
                    }
                    for (let i = 0,j = manageOrgs.length; i < j; i++) {
                        if (orgIndex === manageOrgs[i].id) {
                            store.commit('updateManageOrgs',manageOrgs[i]);
                            break;
                        }
                    }
                    resolve(userInfo);
                } else {
                    reject();
                }
            }).then(() => {
                return store.dispatch('getUserRight');
            }).catch(err => {
                console.log(err);
            });
        },
        //重新选择登录的机构
        resetNodeChosed (store,orgInfo ) {
            store.state.manageOrgs = orgInfo;
            localStorage.setItem('manageOrg',JSON.stringify(orgInfo));
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
                if (res.success) {
                    let filterOrgsArr = res.data ? res.data.filterOrg : [];
                    let filterOrgsObj = {};
                    for (let i = 0,j = filterOrgsArr.length; i < j; i++) {
                        filterOrgsObj[filterOrgsArr[i]['id']] = filterOrgsArr[i];
                    }
                    let manageOrgs = res.data ? res.data.allOrg.map(item => {
                        if (item.id in filterOrgsObj) {
                            return {
                                ...item,
                                disabled : false
                            };
                        } else {
                            return {
                                ...item,
                                disabled : true
                            };
                        }
                    }) : [];
                    let userInfo = {
                        ...store.state.userInfo,
                        manageOrgs : manageOrgs
                    };
                    sessionStorage.setItem('userInfo',JSON.stringify(userInfo));
                    for (let i = 0,j = manageOrgs.length; i < j; i++) {
                        if (store.getters.manageOrgs.id === manageOrgs[i].id) {
                            store.commit('updateManageOrgs',manageOrgs[i]);
                            break;
                        }
                    }
                    store.commit('updatemanageOrgList',manageOrgs);
                } else {
                    store.commit('updatemanageOrgList',[]);
                }
            });
        },
        /**
         * 显示错误提示信息
         * @param store
         * @param msg
         */
        showErrToast : debounce((store,msg) => {
            Vue.prototype.$Message.error(i18n.messages[i18n.locale][msg]);
        },500),
        /**
         * 初始化读卡器信息
         */
        initCardRead (store) {
            store.commit('updateCardReadEnabled',true);
            return;
            //如果window下没有rd这个对象，表示当前浏览器不支持activeX插件，或者没有启用activeX插件，
            if (window.rd ) {
                try {
                    window.rd.dc_init(100, 115200);
                    window.rd.dc_exit();
                    store.commit('updateCardReadEnabled',true);
                } catch (err) {
                    store.commit('updateCardReadEnabled',false);
                }
            } else {
                store.commit('updateCardReadEnabled',false);
            }
        },
        /**
         * 获取读卡器读到的数据
         * @param store
         * @return promise对象
         */
        getCardReadData (store) {
            return new Promise((resolve,reject) => {
                store.commit('updateCardReadEnabled',true);
                resolve('111111111');
                let st;
                //如果window下没有rd这个对象，表示当前浏览器不支持activeX插件，或者没有启用activeX插件，
                if (window.rd) {
                    store.commit('updateCardReadEnabled',true);
                    //如果初始化的结果小于等于0，表示初始化读卡器失败，大于0表示初始话成功
                    try {
                        st = window.rd.dc_init(100, 115200);
                        if (st <= 0) {
                            reject('dcInitError');
                        } else {
                            window.rd.dc_config_card(65);
                            st = window.rd.dc_card_double(0);
                            if (st !== 0) {
                                //如果没有放置卡片，连续响3次，表示没有放置卡的错误
                                st = window.rd.dc_beep(25);
                                st = window.rd.dc_beep(25);
                                st = window.rd.dc_beep(25);
                                window.rd.dc_exit();
                                reject('dcCardError');
                            } else {
                                window.rd.put_bstrSBuffer_asc = "FFFFFFFFFFFF";
                                st = window.rd.dc_load_key(0, 0);
                                if (st !== 0) {
                                    window.rd.dc_exit();
                                    reject('dcLoadKeyError');
                                } else {
                                    let result = '';
                                    result = window.rd.get_bstrRBuffer_asc;
                                    st = window.rd.dc_authentication(0, 0);
                                    //读取成功，蜂鸣器响一次
                                    st = window.rd.dc_beep(5);
                                    if (st !== 0) {
                                        window.rd.dc_exit();
                                        reject('dcBeepError');
                                    } else {
                                        window.rd.dc_exit();
                                        resolve(result);
                                    }
                                    // if (st !== 0) {
                                    //     window.rd.dc_exit();
                                    //     reject('dcLoadKeyError');
                                    // } else {
                                    //     window.rd.put_bstrSBuffer_asc = "31323334353637383930313233343536";
                                    //     st = window.rd.dc_write(2);
                                    //     if (st !== 0) {
                                    //         window.rd.dc_exit();
                                    //         reject('dcWriteError');
                                    //     } else {
                                    //         st = window.rd.dc_read(2);
                                    //         if (st !== 0) {
                                    //             window.rd.dc_exit();
                                    //             reject('dcReadError');
                                    //         } else {
                                    //             window.rd.put_bstrSBuffer_asc = "30303030303030303030303030303030";
                                    //             st = window.rd.dc_write(2);
                                    //             if (st !== 0) {
                                    //                 window.rd.dc_exit();
                                    //                 reject('dcWriteError');
                                    //             } else {
                                    //                 st = window.rd.dc_read(2);
                                    //                 if (st !== 0) {
                                    //                     window.rd.dc_exit();
                                    //                     reject('dcReadError');
                                    //                 } else {
                                    //                     //读取成功，蜂鸣器响一次
                                    //                     st = window.rd.dc_beep(5);
                                    //                     if (st !== 0) {
                                    //                         window.rd.dc_exit();
                                    //                         reject('dcBeepError');
                                    //                     } else {
                                    //                         window.rd.dc_exit();
                                    //                         resolve(result);
                                    //                     }
                                    //                 }
                                    //             }
                                    //         }
                                    //     }
                                    // }
                                }
                            }

                        }
                    } catch (err) {
                        reject('dcInitError');
                    }
                } else {
                    store.commit('updateCardReadEnabled',false);
                }
            });
        }
    }
});
