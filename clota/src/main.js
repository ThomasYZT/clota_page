// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iview from 'iview';
Vue.use(iview);

//引入多语言配置文件
// import VueI18n from 'vue-i18n';
// Vue.use(VueI18n);
import i18n from './assets/js/lang.config';
// 样式文件
import './assets/theme/iviewTheme/index.less'

// Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
  i18n,
  components: { App },
})
