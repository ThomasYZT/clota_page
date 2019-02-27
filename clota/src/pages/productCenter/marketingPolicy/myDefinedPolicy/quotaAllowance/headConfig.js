//配额余量表头配置
export const quotaAllowanceHead = [
    {
        title : 'date', // 日期
        minWidth : 150,
        field : 'quotaDate'
    },
    {
        title : 'consumptionQuota', // 消耗配额
        minWidth : 150,
        field : ''
    },
    {
        title : 'vipQuotaRest', // 专享配额余量
        minWidth : 150,
        field : 'restQuota'
    },
];

export const quotaManageHead = [
    {
        title : 'productName', // 产品名称
        minWidth : 150,
        field : 'productName'
    },
    {
        title : 'sharedQuota', // 共享配额数量
        minWidth : 200,
        field : 'sharedQuota'
    },
    {
        title : 'assignableQuantity', // 可分配配额数量
        minWidth : 150,
        field : 'date'
    },
    {
        title : 'vipQuota', // 渠道专享配额
        minWidth : 150,
        field : 'date'
    },
    {
        title : 'operate', // 操作
        minWidth : 130,
        field : ''
    },
];
