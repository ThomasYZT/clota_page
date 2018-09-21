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
import 'klwk-ui/src/lib/css/index.scss';
import './assets/css/iconfont.css';

// 按需引用iview, elment-ui 以及其他自定义组件或指令
import plugin from './assets/js/plugin'
import common from './assets/js/common';


Vue.use(plugin);
Vue.config.productionTip = true;

router.beforeEach((to, from, next) => {
    //todo
    next()
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
