// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ajax from '@/api/index.js';
//es6垫片（包含了es5）
import 'core-js/es6';

//引入多语言配置文件
import i18n from './assets/lang/lang.config';
// 样式文件
import './assets/theme/iviewTheme/index.less';
import 'klwk-ui/src/lib/css/index.scss';
import './assets/theme/elementTheme/index.less';
import './assets/scss/_iconfont.scss';

// 按需引用iview, elment-ui 以及其他自定义组件或指令
import plugin from './assets/js/plugin'

Vue.use(plugin);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    //如果是跳转到登录页面，不做任何权限判断
    if (to.name === 'login') {
        next();
    } else {
        //判断是否已经获取用户信息
        if (Object.keys(store.getters.userInfo).length > 0 ) {
            //判断是否已经保存权限信息，如果permissionInfo不为null表示已经获取过权限
            //这里判断了如果有保存的权限信息，就不再继续判断是否有路由的权限，因为如果没有这个权限会跳转到无权限的页面
            if (store.getters.permissionInfo !== null) {
                next();
            } else {
                store.dispatch('getUserRight', to).then((router) => {
                    next({ ...to, replace: true })
                }).catch(() => {
                    next({
                        name: 'login'
                    });
                });
            }
        } else {
            //判断是否本地有存储token，有的话，直接重新获取用户信息
            if(ajax.getToken()){
                store.dispatch('getUserInfo').then(route => {
                    next({
                        name: route.name
                    });
                });
            }else{
                next({
                    name: 'login'
                });
            }
        }
    }
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: (h) => h(App),
    router,
    i18n,
    store,
    components: {App},
});
