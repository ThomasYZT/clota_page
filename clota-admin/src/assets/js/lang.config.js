import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
const lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'zh-CN';
export default new VueI18n({
  locale : lang,
  messages : {
    'zh-CN' : {
      account : '账户',
      password : '密码',
      verifyCode : '验证码',
    },
    'en' : {
    }
  }
})
