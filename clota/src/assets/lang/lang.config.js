import Vue from 'vue';
import VueI18n from 'vue-i18n';
import zhCN from './modules/zhCN';
import en from './modules/en';

Vue.use(VueI18n);
const lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'zh-CN';

class CustomFormatter {
    constructor (options) {
    }
    interpolate (message,values) {
        //对于{field} format error 格式的模板，将field对应的单词全部小写
        if (values && Object.keys(values).length > 0) {
            for (let item in values) {
                values[item] = String(values[item]).toLowerCase();
            }
        }
        return new VueI18n().formatter.interpolate(message,values);
    }
}
export default new VueI18n({
    locale : lang,
    formatter : new CustomFormatter(),
    messages : {
        'zh-CN' : zhCN,
        'en' : en
    }
});
