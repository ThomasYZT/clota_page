// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
//移动端html font-size适配方案
import 'lib-flexible'
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
import './assets/css/mobilePublic.css';
import './assets/css/iconfont.css';
import './assets/theme/theme.scss';
import '@/assets/scss/_common.scss';

// 按需引用iview, elment-ui 以及其他自定义组件或指令
import plugin from './assets/js/plugin'


Vue.use(plugin);
Vue.config.productionTip = true;

router.beforeEach((to, from, next) => {
    //判断是否保存了用户信息和token，如果没有保存需要重新登录
    if(to.name === 'mobileLogin' || to.name === 'mobileRegister'){
        next();
    }else{
        //获取保存到本地的用户信息
        let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
        let token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        if(token && userInfo && Object.keys(userInfo).length > 0){
            store.commit('updateUserInfo');
            next();
        }else{
            next({
                name: 'mobileLogin'
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
    computed: {
        langCode(){
            return store.state.lang;
        }
    },
});


//使用fundeBug实时监测代码运行错误，测试时开启,生成环境开启
if(process.NODE_ENV === 'production'){

    let fundebug = require("fundebug-javascript");
    fundebug.apikey = "7a0ef57656b2a4b59207cf9410c7edc5d9c40db437c42b5d3c825999d2cebf30";

    function formatComponentName(vm)
    {
        if (vm.$root === vm) return 'root';

        var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
        return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');

    }

    Vue.config.errorHandler = function(err, vm, info)
    {
        var componentName = formatComponentName(vm);
        var propsData = vm.$options && vm.$options.propsData;

        fundebug.notifyError(err,
            {
                metaData:
                    {
                        componentName: componentName,
                        propsData: propsData,
                        info: info
                    }
            });
    };
}
