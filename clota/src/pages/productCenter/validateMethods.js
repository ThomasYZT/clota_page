import i18n from '@/assets/lang/lang.config';
import common from '@/assets/js/common.js';
//产品中心、销售政策表单校验方法

/**
 * 校验表情符号
 * @param rule
 * @param value
 * @param callback
 */
export const emoji = (rule, value, callback) => {
    if (value && value.isUtf16()) {
        callback(new Error( i18n.t('errorIrregular') )); // 输入内容不合规则
    } else {
        callback();
    }
};

/**
 * 校验钱
 * @param rule
 * @param value
 * @param callback
 */
export const validateMoney = (rule,value,callback) => {
    if (value) {
        common.validateMoney(value).then(() => {
            callback();
        }).catch(err => {
            if (err === 'errorMaxLength') {
                callback(i18n.t('errorMaxLength',{ field : i18n.t(rule.field),length : 10 }));
            } else {
                callback(i18n.t(err,{ field : i18n.t(rule.field) }));
            }
        });
    } else {
        callback();
    }
};
/**
 * 用于购买限制表单校验
 * 校验每订单最小起订数、每订单最大限订数 (指定字段校验)
 * @param rule
 * @param value
 * @param callback
 */
export const validateNumber = (rule,value,callback) => {
    if (value) {
        common.validateInteger(value, null, 0, 50).then(() => {
            callback();
        }).catch(err => {
            if (err === 'errorMaxLength') {
                if (rule.field === 'minNum') {
                    callback(i18n.t(err,{ field : i18n.t('minOrderNum'), length : 50 }));
                } else if (rule.field === 'maxNum') {
                    callback(i18n.t(err,{ field : i18n.t('maxOrderNum'), length : 50 }));
                } else {
                    callback(i18n.t(err,{ field : i18n.t(rule.field), length : 50 }));
                }
            } else {
                if (rule.field === 'minNum') {
                    callback(i18n.t(err,{ field : i18n.t('minOrderNum'), length : 50 }));
                } else if (rule.field === 'maxNum') {
                    callback(i18n.t(err,{ field : i18n.t('maxOrderNum'), length : 50 }));
                } else {
                    callback(i18n.t(err,{ field : i18n.t(rule.field), length : 50 }));
                }
            }
        });
    } else {
        callback();
    }
};

/**
 * 用于购买限制表单校验
 * 校验身份证购票限制
 * @param rule
 * @param value
 * @param callback
 */
export const validateIdBuyTicket = (rule,value,callback) => {
    if (value || rule.limitByIdNum) {
        common.validateInteger(rule.limitByIdNum).then(() => {
            callback();
        }).catch(err => {
            if (err === 'errorMaxLength') {
                callback(i18n.t(err,{ field : i18n.t(rule.field),length : 10 }));
            } else {
                callback(i18n.t(err,{ field : i18n.t(rule.field) }));
            }
        });
    }
};
/**
 * 用于购买限制表单校验
 * 校验手机号码购票限制
 * @param rule
 * @param value
 * @param callback
 */
export const validateMobileBuyTicket = (rule,value,callback) => {
    if (value || rule.limitByMobileNum) {
        common.validateInteger(rule.limitByMobileNum).then(() => {
            callback();
        }).catch(err => {
            if (err === 'errorMaxLength') {
                callback(i18n.t(err,{ field : i18n.t(rule.field), length : 10 }));
            } else {
                callback(i18n.t(err,{ field : i18n.t(rule.field) }));
            }
        });
    }
};
/**
 * 用于票面信息表单校验
 * 校验票面价格(要大于景区成本价)
 * @param rule
 * @param value
 * @param callback
 */
export const validatePrintPrice = (rule,value,callback) => {
    if (value && rule.standardPrice) {
        if ( Number(value) < Number(rule.standardPrice) ) {
            callback(i18n.t('sizeErrorS', {
                filed1 : i18n.t('printPrice'),
                filed2 : i18n.t('standardPrice')
            }));
        } else {
            callback();
        }
    } else {
        callback();
    }
};
/**
 * 用于产品有效性表单校验
 * 校验产品有效性设置
 * @param rule
 * @param value
 * @param callback
 */
export const validateProductEffSet = (rule,value,callback) => {
    if (value) {
        callback();
    } else {
        callback(i18n.t('selectField', { msg : i18n.t('productEffSet') }));
    }
};

/**
 * 只能输入英文和数字
 * @param rule
 * @param value
 * @param callback
 */
export const validateOnlyCE = (rule, value, callback) => {
    let reg = /^[0-9a-zA-Z]*$/g
    if (value && !reg.test(value)) {
        callback(i18n.t('onlyInputLetterNum'));
    } else {
        callback();
    }
}
