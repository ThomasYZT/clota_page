/**
 * 预定中心的一些公用功能方法
 */
import {orderSyncStatus, batchAudit} from './auditCenter/auditConfig';
import {notDistributorChannelList, payStatusList, takeTicketStatusList, refundStatusList, rescheduleStatus, verifyStatusList, smsStatusList} from '@/assets/js/constVariable';

/**
 * 下单渠道的code转换
 * @param value 下单渠道code
 * @returns {string}
 */
export const transOrderOrg = (value) => {
    let orderChannel = notDistributorChannelList.find((channel, i) => {
        return value === channel.value;
    });

    return orderChannel ? orderChannel.label : '-';
};

/**
 * 支付状态的code转换
 * @param status  支付状态code
 * @returns {string}
 */
export const transPaymentStatus = (status) => {
    let paymentStatus = payStatusList.find((payment, i) => {
        return status === payment.value;
    });

    return paymentStatus ? paymentStatus.label : '-';
};

/**
 * 同步状态的code转换
 * @param status  同步状态code: wait|success|failure
 * @returns {string}
 */
export const transSyncStatus = (status) => {
    let syncStatus = orderSyncStatus.find((item, i) => {
        return status === item.value;
    });

    return syncStatus ? syncStatus.label : '-';
};

/**
 * 取票状态的code转换
 * @param status
 * @returns {string}
 */
export const transPickStatus = (status) => {
    let currentStatus = takeTicketStatusList.find((item, i) => {
        return status === item.value;
    });

    return currentStatus ? currentStatus.label : '-';
};

/**
 * 退票状态的code转换
 * @param status
 * @returns {string}
 */
export const transRefundStatus = (status) => {
    let currentStatus = refundStatusList.find((item, i) => {
        return status === item.value;
    });

    return currentStatus ? currentStatus.label : '-';
};

/**
 * 改签状态的code转换
 * @param status
 * @returns {string}
 */
export const transRescheduleStatus = (status) => {
    let currentStatus = rescheduleStatus.find((item, i) => {
        return status === item.value;
    });

    return currentStatus ? currentStatus.label : '-';
};

/**
 * 核销状态的code转换
 * @param status
 * @returns {string}
 */
export const transVerifyStatus = (status) => {
    let currentStatus = verifyStatusList.find((item, i) => {
        return status === item.value;
    });

    return currentStatus ? currentStatus.label : '-';
};

/**
 * 审核状态的code转换
 * @param status
 * @returns {string}
 */
export const transAudit = (status) => {
    let currentStatus = batchAudit.find((item, i) => {
        return status === item.value;
    });

    return currentStatus ? currentStatus.label : '-';
};

/**
 * 短信发送状态的code转换
 * @param status
 * @returns {string}
 */
export const transSMSStatus = (status) => {
    let currentStatus = smsStatusList.find((item, i) => {
        return status === item.value;
    });

    return currentStatus ? currentStatus.label : '-';
};

// /**
//  * 枚举值的code转换 --- 以上所有转换的方法都可以统一用transEnumCode
//  * @param code   待转换为中/英的code
//  * @param enumList   枚举值的数组
//  * @returns {string}
//  */
// export const transEnumCode = (code, enumList=[]) => {
//
//     let currentEnum = enumList.find((item, i) => {
//         return code === item.value;
//     });
//
//     return currentEnum ? currentEnum.label : '-';
// };

// var transfers = ['transOrderOrg', 'transPaymentStatus', 'transSyncStatus', 'transPickStatus', 'transRefundStatus', 'transRescheduleStatus', 'transVerifyStatus'];
