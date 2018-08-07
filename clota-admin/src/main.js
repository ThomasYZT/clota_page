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
import i18n from './assets/js/lang.config';
// 样式文件
import './assets/theme/iviewTheme/index.less';
import 'klwk-ui/src/lib/css/index.scss';
import './assets/theme/elementTheme/index.less';
import './assets/css/iconfont.css';

// 按需引用iview, elment-ui 以及其他自定义组件或指令
import plugin from './assets/js/plugin'

Vue.use(plugin);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    //如果是跳转到登录页面，不做任何权限判断
    if (to.name === 'login') {
        next();
    } else {
        //判断是否有token，如果有进行权限判断，没有token则进入登录页面
        if (ajax.getToken() !== '') {
            //判断是否已经保存权限信息，如果permissionInfo不为null表示已经获取过权限
            if (store.getters.permissionInfo !== null) {
                next();
            } else {
                store.dispatch('getUserRight', to).then((router) => {
                    // next(router);
                    next({ ...to, replace: true })
                }).catch(() => {
                    next({
                        name: 'login'
                    });
                });
            }
        } else {
            next({
                name: 'login'
            });
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
