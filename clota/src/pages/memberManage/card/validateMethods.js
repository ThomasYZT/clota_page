import i18n from '@/assets/lang/lang.config';
import common from '@/assets/js/common.js';
import { validator } from 'klwk-ui';
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
                callback(i18n.t('errorMaxLength',{ field : i18n.t(rule.customField ? rule.customField : rule.field),length : 10 }));
            } else {
                callback(i18n.t(err,{ field : i18n.t(rule.customField ? rule.customField : rule.field) }));
            }
        });
    } else {
        callback();
    }
};

/**
 * 校验是否为正整数
 * @param rule
 * @param value
 * @param callback
 */
export const validateNum = (rule,value,callback) => {
    common.validateInteger(value).then(() => {
        callback();
    }).catch(err => {
        if (err === 'fieldTypeError') {
            callback(i18n.t(err,{ field : i18n.t(rule.customField ? rule.customField : rule.field) }));
        } else if (err === 'integetError') {
            callback(i18n.t(err, { field : i18n.t(rule.customField ? rule.customField : rule.field) }));
        } else {
            callback();
        }
    });
};

/**
 * 校验折扣率
 * @param rule
 * @param value
 * @param callback
 */
export const validateDiscount = (rule, value, callback) => {
    if (value) {
        if (isNaN(Number(value))) {
            callback(i18n.t('onlyInput', { field : i18n.t('number') }))
        } else {
            if (String(value).length > 4) {
                callback(i18n.t('errorMaxLength', { field : i18n.t(rule.customField ? rule.customField : rule.field),
                    length : 4 }));
            } else {
                if (Number(value) <= 0 || Number(value) > 1 ) {
                    callback(i18n.t('discountError'));
                } else {
                    callback();
                }
            }
        }
    } else {
        callback()
    }
}

/**
 * 校验电话号码
 * @param rule
 * @param value
 * @param callback
 */
export const validateMobile = (rule, value, callback) => {
    if (!validator.isMobile(value)) {
        callback(new Error(i18n.t('errorFormat', { field : i18n.t('phoneNum') })));
    } else {
        callback();
    }
};


/**
 * 校验结束时间大于开始时间
 * @param value
 * @param rule
 * @param callback
 */
export const validateEndTime = (rule, value, callback) => {
    if (rule.startTime && value <= rule.startTime) {
        callback(i18n.t('endTimeNotBiggerThenStartTime'));
    } else {
        callback();
    }
}

/**
 * 校验最高消费金额大于最低消费金额
 * @param rule
 * @param value
 * @param callback
 */
export const validateConditionUpperLimtation = (rule, value, callback) => {
    if (value && rule && rule.conditionLowerLimtation) {
        if (Number(value) < Number(rule.conditionLowerLimtation)) {
            callback(i18n.t('endConsumeBiggerThanStartConsume'));
        } else {
            callback()
        }
    } else {
        callback();
    }
}

