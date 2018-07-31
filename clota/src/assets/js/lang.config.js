import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

export default new VueI18n({
  locale : 'zh-CN',
  messages : {
    'zh-CN' : {
      hello : "hello world",
      'project-title':'银科环企Clota云平台',
    }
  }
})
