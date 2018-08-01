import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
const lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'zh-CN';
export default new VueI18n({
  locale : lang,
  messages : {
    'zh-CN' : {
      'project-title':'银科环企Clota云平台',
      'userName':'账户',
      'password':'密码',
      'login':'登 录',
      'uesrNameText':'请输入你的账号',
      'passwordText':'请输入你的密码',
      'loginSuccess':'登录成功',
      'loginError':'登录失败',
      'formValidate':'表单验证失败',
      'autoLogin':'自动登录',
      'copyright':'Copyright 2009-2020 © Galasys Global (SuZhou) Co.,Ltd All rights reserved.',
      'menuList' : {
          'org' : '组织架构',
          'employee' : '员工',
          'rolePermission' : '角色权限',
          'partner' : '合作伙伴',
          'channels' : '自营渠道',
          'saleChannelsGroup' : '销售渠道分组',
          'verificateGroup' : '核销设备分组',
          'memberManage' : '会员管理',
          'test' : '测试菜单',
      },
    },
    'en' : {
      'project-title':'银科环企Clota云平台',
      'userName':'账户',
      'password':'密码',
      'login':'登 录',
      'uesrNameText':'请输入你的账号',
      'passwordText':'请输入你的密码',
      'loginSuccess':'登录成功',
      'loginError':'登录失败',
      'formValidate':'表单验证失败',
      'autoLogin':'自动登录',
      'copyright':'Copyright 2009-2020 © Galasys Global (SuZhou) Co.,Ltd All rights reserved.',
      'menuList' : {
        'org' : 'organsition',
        'employee' : '员工',
        'rolePermission' : '角色权限',
        'partner' : '合作伙伴',
        'channels' : '自营渠道',
        'saleChannelsGroup' : '销售渠道分组',
        'verificateGroup' : '核销设备分组',
        'memberManage' : '会员管理',
        'test' : '测试菜单',
      },
    }
  }
})
