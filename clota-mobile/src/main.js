// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
//移动端html font-size适配方案
import 'lib-flexible';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import defaultsDeep from 'lodash/defaultsDeep';
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
import plugin from './assets/js/plugin';

//require('./assets/util/vconsole');

Vue.use(plugin);
Vue.config.productionTip = true;

router.beforeEach((to, from, next) => {
    //无操作的路由
    if (
        to.name === 'mobileLogin' //会员登陆
        || to.name === 'activateCard' //激活会员卡
        || to.name === 'activateInfo' //填写激活会员卡信息
        || to.name === 'h5Pay' //c端支付
        || to.name === 'payStatus' //c端支付结果
        /* || to.name === 'mobileRegister'*/
    ) {
        next();

    //判断是否保存了用户信息和token，如果没有保存需要重新登录
    } else {
        //获取保存到本地的用户信息、当前选择的卡信息
        let token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
        let cardInfo = localStorage.getItem('cardInfo') ? JSON.parse(localStorage.getItem('cardInfo')) : {};

        if (token && userInfo && Object.keys(userInfo).length > 0 && cardInfo && Object.keys(cardInfo).length > 0) {
            //若本地数据存在、更新vuex数据，防止刷新页面数据丢失
            // store.commit('updateUserInfo');
            //接口更新卡列表信息，更新vuex数据
            store.dispatch('getCardListInfo').then(res => {
                next();
            }).catch(() => {
                next({
                    name : 'mobileLogin'
                });
            });
        } else {
            //若本地数据不存在，跳至登陆页
            next({
                name : 'mobileLogin'
            });
        }
    }
    //跟新登陆状态
    store.commit('updateLoginStatus');
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
});


//使用fundeBug实时监测代码运行错误，测试时开启,生成环境开启
if (process.NODE_ENV === 'production') {

    let fundebug = require("fundebug-javascript");
    fundebug.apikey = "7a0ef57656b2a4b59207cf9410c7edc5d9c40db437c42b5d3c825999d2cebf30";

    function formatComponentName (vm) {
        if (vm.$root === vm) return 'root';

        let name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
        return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');

    }

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
