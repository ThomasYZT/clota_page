// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入多语言配置文件
import i18n from './assets/js/lang.config';
// 样式文件
import './assets/theme/iviewTheme/index.less';

// 按需引用iview, elment-ui 以及其他自定义组件或指令
import plugin from './assets/js/plugin'
Vue.use(plugin);
// Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
  i18n,
  components: { App },
})
