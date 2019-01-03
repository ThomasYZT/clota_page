// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ajax from '@/api/index.js';
//es6垫片（包含了es5）
import 'core-js/es6';

//引入多语言配置文件
import i18n from './assets/lang/lang.config';
// 样式文件
import './assets/theme/iviewTheme/index.less';
import 'klwk-ui/src/lib/css/index.scss';
import './assets/theme/elementTheme/index.scss';
import './assets/css/iconfont.css';
import '@/assets/scss/_common.scss';

import eleLocale from 'element-ui/lib/locale';
import eleEnLang from 'element-ui/lib/locale/lang/en';
import eleZhCnLang from 'element-ui/lib/locale/lang/zh-CN';

// 按需引用iview, elment-ui 以及其他自定义组件或指令
import plugin from './assets/js/plugin';
// eleLocale.use(eleEnLang);
import common from './assets/js/common';


Vue.use(plugin);
Vue.config.productionTip = true;

router.beforeEach((to, from, next) => {
    //如果是跳转到登录页面，不做任何权限判断
    if (to.name === 'login' || to.name === 'register') {
        next();
    } else {
        //判断是否已经获取用户信息
        if (Object.keys(store.getters.userInfo).length > 0 ) {
            //判断是否已经保存权限信息，如果permissionInfo不为null表示已经获取过权限
            //这里判断了如果有保存的权限信息，就不再继续判断是否有路由的权限，因为如果没有这个权限会跳转到无权限的页面
            if (store.getters.permissionInfo !== null) {
                next();
            } else {
                //查询本地存储的用户信息是否还有，如果没有则直接跳转到登录页面
                let manageOrgs = common.getUserInfo().manageOrgs;
                if (manageOrgs && Object.keys(manageOrgs).length > 0) {
                    let orgIndex = localStorage.getItem('orgId');
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
                    store.dispatch('getUserRight', to).then((toRouter) => {
                        if (toRouter) {
                            next({ ...to, replace : true });
                        } else {
                            next({
                                name : 'login'
                            });
                        }
                    }).catch(() => {
                        next({
                            name : 'login'
                        });
                    });
                } else {
                    next({
                        name : 'login'
                    });
                }
            }
        } else {
            //判断是否本地有存储token，有的话，直接重新获取用户信息
            if (ajax.getToken()) {
                let userInfo = common.getUserInfo().userInfo;
                store.dispatch('getUserInfo',{
                    userInfo : userInfo,
                    route : to
                }).then(route => {
                    if ((!route || !route.path ) || route.path === to.path) {
                        if (to.query && Object.keys(to.query).length > 0) {
                            next({
                                path : to.path,
                                query : to.query
                            });
                        } else {
                            next({
                                path : to.path
                            });
                        }
                    } else {
                        next({
                            path : route.path
                        });
                    }
                });
            } else {
                next({
                    name : 'login'
                });
            }
        }
    }
});


/* eslint-disable no-new */
new Vue({
    el : '#app',
    render : (h) => h(App),
    router,
    i18n,
    store,
    components : { App },
    computed : {
        langCode () {
            return store.state.lang;
        }
    },
    watch : {
        langCode (val) {
            if (val === 'en') {
                eleLocale.use(eleEnLang);
            } else if (val === 'zh-CN') {
                eleLocale.use(eleZhCnLang);
            }
            Vue.config.lang = val;
        }
    },
    mounted () {
        if (this.langCode === 'en') {
            eleLocale.use(eleEnLang);
        } else if (this.langCode === 'zh-CN') {
            eleLocale.use(eleZhCnLang);
        }
    }
});

function formatComponentName (vm) {
    if (vm.$root === vm) return 'root';

    let name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
    return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');

}
//使用fundeBug实时监测代码运行错误，测试时开启,生成环境开启
if (DEBUGGER) {

    let fundebug = require("fundebug-javascript");
    fundebug.apikey = "7a0ef57656b2a4b59207cf9410c7edc5d9c40db437c42b5d3c825999d2cebf30";

    Vue.config.errorHandler = function (err, vm, info) {
        let componentName = formatComponentName(vm);
        let propsData = vm.$options && vm.$options.propsData;

        fundebug.notifyError(err,
            {
                metaData :
                    {
                        componentName : componentName,
                        propsData : propsData,
                        info : info
                    }
            });
    };
}
