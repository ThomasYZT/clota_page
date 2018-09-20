import Vue from 'vue';
import VueI18n from 'vue-i18n';
import zhCN from './modules/zhCN';
import en from './modules/en';

Vue.use(VueI18n);
const lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'zh-CN';
export default new VueI18n({
    locale: lang,
    messages: {
        'zh-CN': zhCN,
        'en': en
    }
})
