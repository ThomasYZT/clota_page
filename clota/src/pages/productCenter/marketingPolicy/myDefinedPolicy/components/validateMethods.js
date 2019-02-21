import i18n from '@/assets/lang/lang.config';
import common from '@/assets/js/common.js';
import { validator } from 'klwk-ui';

export const emoji = (rule, value, callback) => {
    if (value && value.isUtf16()) {
        callback(new Error( i18n.t('errorIrregular') )); // 输入内容不合规则
    } else {
        callback();
    }
};
/**
 * 校验正整数
 * @param rule
 * @param value
 * @param callback
 */
export const validateNumber = (rule,value,callback) => {
    if (value) {
        common.validateInteger(value).then(() => {
            callback();
        }).catch(err => {
            if (err === 'errorMaxLength') {
                callback(i18n.t(err,{ field : i18n.t(rule.field),length : 10 }));
            } else {
                callback(i18n.t(err,{ field : i18n.t(rule.field) }));
            }
        });
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
 * 校验单价
 * @param rule
 * @param value
 * @param callback
 */
export const validateSettlePrice = (rule,value,callback) => {
    if (value && rule.standardPrice) {
        if ( Number(value) < Number(rule.standardPrice) ) {
            callback(i18n.t('sizeErrorS',{ filed1 : i18n.t('settlePrice'),filed2 : rule.standardPrice }));
        } else {
            callback();
        }
    } else {
        callback();
    }
};
/**
 * 校验共享配额数据
 * @param rule
 * @param value
 * @param callback
 */
export const validateSharedQuota = (rule,value,callback) => {
    if (value && rule.totalQuota && rule.marketQuota) {
        if ( Number(value) + Number(rule.marketQuota) + Number(rule.toTalExclusiveQuota) > Number(rule.totalQuota) ) {
            callback(i18n.t('超出产品配额数量'));
        } else {
            callback();
        }
    } else {
        callback();
    }
};
/**
 * 校验全民营销配额数量
 * @param rule
 * @param value
 * @param callback
 */
export const validateMarketQuota = (rule,value,callback) => {
    if (value && rule.totalQuota && rule.sharedQuota) {
        if ( Number(value) + Number(rule.sharedQuota) + Number(rule.toTalExclusiveQuota) > Number(rule.totalQuota) ) {
            callback(i18n.t('超出产品配额数量'));
        } else {
            callback();
        }
    } else {
        callback();
    }
};
/**
 * 校验专享配额
 * @param rule
 * @param value
 * @param callback
 */
export const validateVipQuota = (rule,value,callback) => {
    if (value && rule.quota && Object.keys(rule.quota).length > 0) {
        if ( Number(rule.quota.totalQuota ? rule.quota.totalQuota : 0) -
             Number(rule.quota.sharedQuota ? rule.quota.sharedQuota : 0) -
             Number(rule.quota.marketQuota ? rule.quota.marketQuota : 0) -
             (Number(rule.quota.toTalExclusiveQuota ? rule.quota.toTalExclusiveQuota : 0) -
             Number(rule.quota.vipQuota ? rule.quota.vipQuota : 0) +
             Number(rule.quota.tempVipQuota ? rule.quota.tempVipQuota : 0)) < 0 ) {
            callback(i18n.t('超出可分配配额数量'));
        } else {
            callback();
        }
    } else {
        callback();
    }
};
/**
 * 校验是否为大于等于0的自然数
 * @param rule
 * @param value
 * @param callback
 */
export const validateNaturalNumber = (rule, value, callback) => {
    if (value) {
        if ( validator.isNumber(value)) {
            if (Number(value) < 0) {
                callback(i18n.t(rule.field + '必须大于等于0'));
            } else {
                callback()
            }
        } else {
            callback(i18n.t('请输入数字'))
        }
    } else {
        callback();
    }
}
/**
 * 校验产品配额数量
 * @param rule
 * @param value
 * @param callback
 */
export const validateTotalQuota = (rule, value, callback) => {
    if (value) {
        if (Number(value) < Number(rule.marketQuota ? rule.marketQuota : 0) +
            Number(rule.sharedQuota ? rule.sharedQuota : 0) +
            Number(rule.toTalExclusiveQuota ? rule.toTalExclusiveQuota : 0)) {
            callback(i18n.t('产品配额数量不足，请重新调整'));
        } else {
            callback();
        }
    } else {
        callback()
    }
}
