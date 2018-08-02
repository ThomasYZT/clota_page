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
      accountInputError : '请输入账号',
      passwordInputError : '请输入密码',
      verifyCodedInputError : '请输入验证码',
      loginError : {
        accountError : '密码或账号错误',
        verifyCodeError : '验证码错误'
      },
      companyName : '银科环企Clota运营平台',
      autoLogin : '自动登录',
      login : '登录',
      index : '首页',
      todayLogin : '今日登陆',
      travelOrder : '旅游产品订单',
      tenementCount : '租户累计',
      serverCount : '服务器数量',
      circleName : '同比上周'
    },
    'en' : {
    }
  }
})
