// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
//移动端html font-size适配方案
import 'lib-flexible';
import Vue from 'vue';
import App from './App';
import router from './router/index';
import store from './store/index';
//es6垫片（包含了es5）
import 'core-js/es6';

//引入多语言配置文件
import i18n from './assets/lang/lang.config';
// 样式文件
import './assets/css/mobilePublic.css';
import './assets/css/iconfont.css';
import './assets/theme/theme.scss';
import '@/assets/scss/_common.scss';
import './assets/css/quill.snow.css';
import './assets/css/quill.core.css';
import './assets/css/quill.bubble.css';

// 按需引用iview, elment-ui 以及其他自定义组件或指令
import plugin from './assets/js/plugin';

Vue.use(plugin);
Vue.config.productionTip = true;
//开启手机调试模式
const VConsole = require('vconsole');
/* eslint-disable no-new */
new VConsole();

/* eslint-disable no-new */
new Vue({
    el : '#app',
    render : (h) => h(App),
    router,
    i18n,
    store,
    components : { App },
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
