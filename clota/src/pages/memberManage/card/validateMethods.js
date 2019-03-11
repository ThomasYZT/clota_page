import i18n from '@/assets/lang/lang.config';
import common from '@/assets/js/common.js';
/**
 * 输入内容不合规则
 * @param rule
 * @param value
 * @param callback
 */
export const emoji = (rule, value, callback) => {
    if (value && value.isUtf16()) {
        callback(new Error(i18n.t('errorIrregular')));
    } else {
        callback();
    }
}

/**
 * 只能输入中文和英文
 */
export const validateCN = (rule, value, callback) => {
    let reg = /^[0-9a-zA-Z]*$/g;
    if (reg.test(value)) {
        callback ()
    } else {
        callback(new Error(i18n.t('onlyInput', { field : i18n.t('letter') + i18n.t('number') })));
    }
}

