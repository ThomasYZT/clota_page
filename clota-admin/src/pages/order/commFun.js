/**
 * 预定中心的一些公用功能方法
 */
import { notDistributorChannelList, payStatusList, takeTicketStatusList, refundStatusList, rescheduleStatus, verifyStatusList, smsStatusList } from '@/assets/js/constVariable';

// 批量审核
const batchAudit = [
    { label : 'passed', value : 'success' }, // 通过
    { label : 'reject', value : 'reject' }, // 驳回
];

//订单同步状态
const orderSyncStatus = [
    {
        label : 'waitToSync', //待同步
        value : 'wait'
    },
    {
        label : 'synchronized', //已同步
        value : 'success'
    },
    {
        label : 'syncFailed', //同步失败
        value : 'failure'
    },
];


//取票状态列表
export const pickTicketStatusList = [
    {
        label : 'haveTickets', //已取票
        value : 'true'
    },
    {
        label : 'noHaveTickets', //未取票
        value : 'false'
    },
];

//核销状态列表
export const verifyStatus = [
    {
        label : 'consumed', //已核销
        value : 'true'
    },
    {
        label : 'noConsumed', //未核销
        value : 'false'
    },
];

/**
 * 下单渠道的code转换
 * @param value 下单渠道code
 * @returns {string}
 */
export const transOrderOrg = (value) => {
    let orderChannel = notDistributorChannelList.find((channel, i) => {
        return value === channel.value;
    });

    return orderChannel ? 'order.' + orderChannel.label : '-';
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
 * 订单中所有票的状态的code转换
 * @param status
 * @returns {string}
 */
export const transPickStatus = (status) => {
    let currentStatus = [...takeTicketStatusList, ...pickTicketStatusList].find((item, i) => {
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
    let currentStatus = [...verifyStatusList, ...verifyStatus].find((item, i) => {
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


/**
 * 判断一个产品是否可以退票
 * @param orderOrgType 订单角色
 * @param rowData 产品数据
 * @returns {boolean}
 */
export const canRefundTicket = (orderOrgType,rowData) => {
    //景区下，已退票、退票待审核，改签待审核，同步失败的不可退票
    if (orderOrgType === 'scenic') {
        return rowData.rescheduleStatus !== 'alter_audit' &&
            rowData.refundStatus === 'no_refund' &&
            rowData.syncStatus !== 'failure';
    } else if (orderOrgType === 'channel') {
        //下单企业下，已核销，已退票/退票待审核、改签待审核，同步失败不可退票
        return rowData.rescheduleStatus !== 'alter_audit' &&
            rowData.refundStatus === 'no_refund' &&
            rowData.verifyStatus === 'false' &&
            rowData.syncStatus !== 'failure';
    }
    return true;
};

/**
 * 判断一个产品是否可以改签
 * @param orderOrgType 订单角色
 * @param rowData 产品数据
 * @returns {boolean}
 */
export const canAlterTicket = (orderOrgType,rowData) => {
    //景区下,已退票、退票待审核，改签待审核的不可改签
    //已改签的要判断可改签的次数
    if (orderOrgType === 'scenic') {
        return rowData.rescheduleStatus !== 'alter_audit' &&
            rowData.refundStatus === 'no_refund' &&
            rowData.syncStatus !== 'failure';
    } else if (orderOrgType === 'channel') {
        //下单企业下，已核销，已退票/退票待审核、已改签/改签待审核、同步失败的不可改签
        return rowData.rescheduleStatus !== 'alter_audit' &&
            rowData.refundStatus === 'no_refund' &&
            rowData.verifyStatus === 'false' &&
            rowData.syncStatus !== 'failure';
    }
    return true;
};

export const auditCenter = (orderOrgType,rowData) => {

};
