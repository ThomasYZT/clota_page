import i18n from '@/assets/lang/lang.config';
import common from '@/assets/js/common.js';

export const emoji = (rule, value, callback) => {
    if (value && value.isUtf16()) {
        callback(new Error( i18n.t('errorIrregular') )); // 输入内容不合规则
    } else {
        callback();
    }
}
/**
 * 校验售票规则的指定日期
 * @param rule
 * @param value
 * @param callback
 */
export const validateSaleData = (rule,value,callback) => {

    if (rule.params.type === 'playBeforeSold' && !(common.isNotEmpty(String(rule.params.beforeDay)) && common.isNotEmpty(String(rule.params.afterDay)))) {
        // 方案类型为 游玩日期前N天可售，最少提前天数\最多提前天数不能为空
        callback(i18n.t('inputField',{ field : i18n.t('aheadDays') }));
    } else if (rule.params.type === 'specifiedPeriodSold') {
        // 方案类型为 指定期间可售，最少提前天数\最多提前天数不能为空
        if (!(rule.params.startTime && rule.params.endTime)) {
            callback(i18n.t('selectField',{ msg : i18n.t('specifiedTime') }));
        } else if (rule.params.weekSold.length < 1) {
            callback(i18n.t('selectField',{ msg : i18n.t('weekSold') }));
        } else {
            callback();
        }
    } else if (rule.params.type === 'specifiedDateSold' && rule.params.specifiedTime.length < 1) {
        callback(i18n.t('selectField',{ msg : i18n.t('specifiedDateSold') }));
    } else {
        callback();
    }
};
/**
 * 校验游玩规则的指定日期
 * @param rule
 * @param value
 * @param callback
 */
export const validatePlayData = (rule,value,callback) => {
    if (rule.params.type === 'specifiedPeriodSold') {
        if (!(rule.params.startTime && rule.params.endTime)) {
            callback(i18n.t('selectField',{ msg : i18n.t('specifiedTime') }));
        } else if (rule.params.weekSold.length < 1) {
            callback(i18n.t('selectField',{ msg : i18n.t('weekPlay') }));
        } else {
            callback();
        }
    } else if (rule.params.type === 'specifiedDateSold' && rule.params.specifiedTime.length < 1) {
        callback(i18n.t('selectField',{ msg : i18n.t('specifiedDateSold') }));
    } else {
        callback();
    }
};

/**
 * 校验退票规则
 * @param rule
 * @param value
 * @param callback
 */
export const validateAlterRule = (rule, value, callback) => {
    if (rule.params.type === 'notAllow') {
        callback();
    } else {
        if (common.isNotEmpty(rule.params.befPlayLatestDays) && common.isNotEmpty(rule.params.alterNum)) {
            callback();
        } else {
            callback(i18n.t('inputField', { field : i18n.t('lastAlterDate') }))
        }
    }
}

/**
 * 校验产品表单
 * @param rule
 * @param value
 * @param callback
 */
export const validateProductInfo = (rule, value, callback) => {
    if (rule.params.quotaData && rule.params.quotaData.length < 1) {
        callback(i18n.t('please', { msg : i18n.t('addProduct') }));

    } else {
        callback();

    }
}

/**
 * 校验全民营销表单
 * @param rule
 * @param value
 * @param callback
 */
export const validateMarketingData = (rule, value, callback) => {
    if (rule.params.marketingData && rule.params.marketingData.length > 0) {
        //检查全民营销数据是否保存
        let valid = true;
        for (let i = 0, len = rule.params.marketingData.length; i < len; i++) {
            if (rule.params.marketingData[i].editable) {
                valid = false;
                break;
            }
        }
        if (valid) {
            callback();
        } else {
            callback(i18n.t('pleaseSave', { field : i18n.t('allPeopleMarketSetting') }));
        }
    } else {
        callback();
    }
}
/**
 * 校验退票规则
 * @param rule
 * @param value
 * @param callback
 */
export const validateReturnRule = (rule, value, callback) => {
    if (rule.params.type !== 'notAllow' && rule.params.returnRule.length < 1) {
        callback(i18n.t('please', { msg : i18n.t('addReturnRateRule') }));
    } else {
        callback();
    }
}
