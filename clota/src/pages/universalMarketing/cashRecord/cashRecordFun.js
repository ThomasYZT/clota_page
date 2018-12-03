/**
 * 提现记录中的一些公用功能方法
 */
import { bankList, proxyBankList } from '@/assets/js/constVariable.js';

/**
 * 收付款方式的code转换
 * @param value 收付款方式code
 * @returns {string}
 */
export const transAccountType = (value) => {
    let accountType = [...bankList, ...proxyBankList].find((item, i) => {
        return value === item.value;
    });

    return accountType ? accountType.label : value;
};
