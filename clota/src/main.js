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
import './assets/theme/elementTheme/index.scss';
import './assets/css/iconfont.css';
import eleLocale from 'element-ui/lib/locale';
import eleEnLang from 'element-ui/lib/locale/lang/en';
import eleZhCnLang from 'element-ui/lib/locale/lang/zh-CN';

// 按需引用iview, elment-ui 以及其他自定义组件或指令
import plugin from './assets/js/plugin'
// eleLocale.use(eleEnLang);

Vue.use(plugin);
Vue.config.productionTip = true;

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
                console.log('getUserRight')
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
                let userInfo  = JSON.parse(sessionStorage.getItem('userInfo'));
                store.dispatch('getUserInfo',userInfo).then(route => {
                    next({
                        path: to.path
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
    computed: {
        langCode(){
            return store.state.lang;
        }
    },
    watch: {
        langCode(val){
            if(val === 'en'){
                eleLocale.use(eleEnLang);
            }else if(val === 'zh-Cn'){
                eleLocale.use(eleZhCnLang);
            }
            Vue.config.lang = val;
            // document.title = val === 'zh-CN' ? 'BIM数字化平台' : 'BIM Digital Platform';
        }
    },
    mounted () {
        if(this.langCode === 'en'){
            eleLocale.use(eleEnLang);
        }else if(this.langCode === 'zh-Cn'){
            eleLocale.use(eleZhCnLang);
        }
    }
});
