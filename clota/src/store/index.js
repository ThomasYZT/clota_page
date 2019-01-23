
import Vue from 'vue';
import Vuex from 'vuex';
import i18n from '../assets/lang/lang.config';
import defaultsDeep from 'lodash/defaultsDeep';
import router,{ resetRouter } from '../router/index';
import routerClect from '../router/routerClect';
import ajax from '@/api/index.js';
import { getFourRoute, getNoSubMenuRoute } from '../router/constRouter';
import debounce from 'lodash/debounce';
import qqMap from 'qqMap';

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
                    //子路由中的菜单路由
                    let childMenu = children.filter(item => item.meta && (item.meta.isMenu || item.meta.isStaticMenu));
                    children.push({
                        path : '',
                        redirect : {
                            path : childMenu.length > 0 ? childMenu[0].path : ''
                        }
                    });
                    router['children'] = children;
                } else {
                    router['children'] = [getNoSubMenuRoute({
                        menuName : 'noSubMenu',
                        lightMenu : router.meta._name,
                        _name : router.meta._name,
                        rightPath : router.meta.rightPath,
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

/**
 * 获取会员配置下不存在的权限
 * @param{Object} memberConfigInfo 会员配置信息
 * @return {{}}
 */
const getMemberConfigPermissionNot = (memberConfigInfo) => {
    //排除的权限
    let result = {};
    if (memberConfigInfo) {
        //如果没有配置会员卡属性，那么不可显示会员主页信息
        if (!memberConfigInfo.cardType) {
            Object.assign(result,{
                'members' : 'not-allow',//会员主页
            });
        }
        //如果不包含成长型的会员卡
        if (memberConfigInfo.cardType && memberConfigInfo.cardType === 'sale') {
            Object.assign(result,{
                'growth-setting' : 'not-allow',//成长值
            });
        }
        //如果不包含售卖型的会员卡
        if (memberConfigInfo.cardType && memberConfigInfo.cardType === 'growth') {
            Object.assign(result,{
                'batchNewCard' : 'not-allow',//批量开卡
                'backCard' : 'not-allow',//退卡
            });
        }
    }
    return result;
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
        cardReadEnabled : false,
        //全部支付方式
        payAccountList : [],
        //在线支付方式
        onlineAccountList : [],
        //固定支付方式
        staticPayAccount : [{
            value : 'cash',
            label : 'cash'
        }],
        //会员配置信息
        memberConfigInfo : {}
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
            if (state.userInfo) {
                return state.userInfo;
            } else {
                try {
                    let userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {};
                    return userInfo;
                } catch (e) {
                    return {};
                }
            }
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
            if (!state.manageOrgs || Object.keys(state.manageOrgs).length < 1) {
                //判断是否有本地存储，如果有则拿本地存储记录
                let orgInfoStorage = localStorage.getItem('manageOrg') ? JSON.parse(localStorage.getItem('manageOrg')) : {};
                if (orgInfoStorage && Object.keys(orgInfoStorage).length > 0) {
                    state.manageOrgs = orgInfoStorage;
                }
            }
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
        cardReadEnabled : state => state.cardReadEnabled,
        //全部支付方式
        payAccountList : state => {
            return [].concat(state.onlineAccountList,state.staticPayAccount);
        },
        //在线支付方式
        onlineAccountList : state => {
            return state.onlineAccountList;
        },
        //固定支付方式
        staticPayAccount : state => {
            return state.staticPayAccount;
        },
        //会员配置信息
        memberConfigInfo : (state) => {
            return state.memberConfigInfo;
        },
        //会员配置信息中不需要的权限
        memberConfigNotPermission : (state) => {
            return getMemberConfigPermissionNot(state.memberConfigInfo);
        }
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
            setTimeout(() => {
                this.commit('changeOperateLine',false);
            },600);
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
            sessionStorage.setItem('userInfo',JSON.stringify(data));
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
            if (org) {
                localStorage.setItem('manageOrg',JSON.stringify(org));
                state.manageOrgs = org;
            } else {
                let orgInfoStorage = localStorage.getItem('manageOrg');
                state.manageOrgs = orgInfoStorage ? JSON.parse(orgInfoStorage) : {};
            }
            this.dispatch('getOnlineAccountList');
            localStorage.setItem('orgIndex',state.manageOrgs ? state.manageOrgs['id'] : '');
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
        },
        //修改在线支付方式
        updateOnlineAccountList (state,onlineAccountList) {
            state.onlineAccountList = onlineAccountList;
        },
        //更新会员配置信息
        updateMemberConfigInfo (state,memberConfigInfo) {
            state.memberConfigInfo = memberConfigInfo;
        }
    },
    actions : {
        //获取用户权限信息
        getUserRight (store, route) {
            return store.dispatch('freshOrgs').then((replaceRoute) => {
                return ajax.post('getPrivilege',{
                    orgId : store.getters.manageOrgs.id
                }).then(res =>{
                    if (res.success) {
                        sessionStorage.setItem('token',res.data ? res.data.token : '');
                        return new Promise((resolve, reject) => {
                            let privCode = {};
                            let privateData = res.data ? (res.data.privileges ? res.data.privileges : []) : [];
                            //获取账号的菜单权限
                            for (let i = 0,j = privateData.length; i < j; i++) {
                                privCode[privateData[i]['privCode']] = 'allow';
                            }
                            return store.dispatch('getServiceSetting',privCode).then(routers => {
                                if (replaceRoute === 'replaceRoute' || !route) {
                                    resolve(routers[0]);
                                } else {
                                    resolve(route);
                                }
                            }).catch(err => {
                                reject(err);
                            });
                        }).catch(err => {
                            console.log(err);
                        });
                    } else {
                        store.dispatch('showErrToast','rightGetError');
                        return new Promise().reject();
                    }
                }).catch(() => {
                    store.dispatch('showErrToast','rightGetError');
                });
            });
        },
        //获取用户信息
        getUserInfo (store,{ userInfo,route }) {
            return new Promise((resolve,reject) => {
                if (userInfo.token) {
                    store.commit('updateUserInfo',userInfo);
                    let manageOrgs = userInfo.manageOrgs ? userInfo.manageOrgs : [];
                    let orgIndex = localStorage.getItem('orgIndex');
                    if (orgIndex === '' || orgIndex === null) {
                        store.commit('updateManageOrgs',manageOrgs[0]);
                    } else {
                        for (let i = 0,j = manageOrgs.length; i < j; i++) {
                            if (orgIndex === manageOrgs[i].id) {
                                store.commit('updateManageOrgs',manageOrgs[i]);
                                break;
                            }
                        }
                    }
                    resolve(userInfo);
                } else {
                    reject();
                }
            }).then(() => {
                return store.dispatch('getUserRight',route);
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
            return ajax.post('getManageOrgs').then(res => {
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
                    //如果账户下没有机构信息，则退出登录
                    if (manageOrgs.length < 1) {
                        return Promise.reject();
                    }
                    let userInfo = {
                        ...store.state.userInfo,
                        manageOrgs : manageOrgs
                    };
                    store.commit('updateUserInfo',userInfo);
                    for (let i = 0,j = manageOrgs.length; i < j; i++) {
                        //如果当前保存的机构id还在，则使用保存机构的id去获取信息
                        if (store.getters.manageOrgs.id === manageOrgs[i].id) {
                            store.commit('updateManageOrgs',manageOrgs[i]);
                            store.commit('updatemanageOrgList',manageOrgs);
                            return;
                        }
                    }
                    store.commit('updateManageOrgs',manageOrgs[0]);
                    store.commit('updatemanageOrgList',manageOrgs);
                    //这里表示不登录保存的机构，而是登录有权限的第一个机构
                    return 'replaceRoute';
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
        },
        /**
         * 获取在线支付方式
         * @param{Object} store
         */
        getOnlineAccountList : debounce(function (store) {
            let onlineAccountList = [];
            ajax.post('queryOnlineAccount',{
                isPlatformAcc : false,
                orgId : store.getters.manageOrgs.id
            }).then(res => {
                if (res.success) {
                    onlineAccountList = res.data ? res.data.filter(item => item.useStatus === 'enabled').map(item => {
                        return {
                            ...item,
                            value : item.accountType,
                            label : item.accountType,
                        };
                    }) : [];
                } else {
                    onlineAccountList = [];
                }
                this.commit('updateOnlineAccountList',onlineAccountList);
            });
        },200),
        /**
         * 获取位置信息
         * @return {Promise<any>}
         */
        getLocation () {
            return new Promise((resolve,reject) => {
                //第一个参数是在腾讯地图申请的key（申请地址:https://lbs.qq.com/console/mykey.html）
                let geolocation = new qqMap.maps.Geolocation('RX7BZ-4ZBKR-XGHWI-WOFNG-CTENJ-ZIFNQ', 'mapqq');
                geolocation.getLocation((locationInfo) => {
                    resolve(locationInfo);
                },(err) => {
                    reject(err);
                },{
                    //是否在定位失败时给出提示引导用户打开授权或打开定位开关。（即将支持）
                    failTipFlag : true
                });
            });
        },
        /**
         * 获取会员配置信息
         * @param{Object} store
         * @param{Object} privCode 权限信息
         */
        getServiceSetting (store,privCode) {
            return ajax.post('getServiceSetting',{
                serviceCode : 'member',
                orgId : store.getters.manageOrgs.id,
                companyId : store.getters.manageOrgs.manageCompanyId,
            }).then(res => {
                if (res.success) {
                    let routers = [];
                    store.commit('updateMemberConfigInfo',{
                        accountPattern : res.data ? res.data.accountPattern : '',
                        cardType : res.data ? res.data.cardType : '',
                        memberPoint : res.data ? res.data.memberPoint : '',
                        memberRecharge : res.data ? res.data.memberRecharge : '',
                    });
                    //删除会员配置中的权限
                    let memberConfigNotPermission = store.getters.memberConfigNotPermission;
                    for (let item in memberConfigNotPermission) {
                        if (item in privCode) {
                            delete privCode[item];
                        }
                    }
                    routers = childDeepClone(routerClect, privCode);
                    routers.push(getFourRoute({ menuName : 'notFound', lightMenu : '', _name : '' }));
                    //重新设置路由信息
                    resetRouter(routers);
                    store.commit('updatePermissionInfo',privCode);
                    store.commit('updateRouteInfo',routers);
                    // 如果有权限，则跳转到有权限的第一个页面
                    if (routers.length > 0) {
                        return routers;
                    } else {
                        return Promise.reject();
                    }
                } else {
                    return Promise.reject();
                }
            });
        },
        //获取会员配置信息
        getMemberConfigPermissionNot (state,memberConfigInfo) {
            return getMemberConfigPermissionNot(memberConfigInfo);
        },
    }
});
