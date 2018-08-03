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
      lessee : '租户',
      server : '服务器',
      todayLogin : '今日登陆',
      travelOrder : '旅游产品订单',
      tenementCount : '租户累计',
      serverCount : '服务器数量',
      circleName : '同比上周',
      ISPinternet : '服务提供商',
      cooperaChannelOrg : '合作渠道(机构)',
      cooperaChannelPer : '合作渠道（个人）',
      readyDeal : '待处理',
      auditTrue : '审核通过',
      auditFalse : '审核不通过',
      lessPlaceholder : '输入任意信息进行查询',
      auditStatus : {
        waitAudit : '待审核',
        audited : '已审核',
        rejected : '已驳回'
      },
      validateError : {
        lesseeCompanyErr : '请输入租户公司名称',
        personError : '请输入联系人',
        phoneError1 : '请输入联系电话',
        phoneError2 : '联系电话格式错误',
        emailError1 : '请输入电子邮箱',
        emailError2 : '邮箱格式错误!',
        serverNameError : '请输入服务器名称',
        IPnameError : '请输入ip地址',
      }
    },
  }
})
