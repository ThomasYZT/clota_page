import { validator } from 'klwk-ui';
import i18n from '../../assets/lang/lang.config';
export const validateMethods = {
    //校验手机号码
    mobile : (rule, value, callback) => {
        if (!validator.isMobile(value)) {
            callback(new Error(i18n.t('errorFormat', { field : i18n.t('phoneNum') })));
        } else {
            callback();
        }
    },
    //校验邮箱
    email : (rule, value, callback) => {
        if (value) {
            if (validator.isEmail(value)) {
                callback();
            } else {
                callback(new Error(i18n.t('errorFormat', { field : i18n.t('mail') })));
            }
        } else {
            callback();
        }
    },
    //身份证校验
    identificationNum : (rule, value, callback) => {
        let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if (!reg.test(value)) {
            callback(new Error(i18n.t('errorFormat', { field : i18n.t('identityNo') })));
        } else {
            callback();
        }
    },
    //社会信用代码简单校验
    socialCode : (rule, value, callback) => {
        let reg = /[0-9A-Z]{18}/;
        if (!reg.test(value)) {
            callback(new Error(i18n.t('errorFormat', { field : i18n.t('SocialCreditCode') })));
        } else {
            callback();
        }
    }
};
