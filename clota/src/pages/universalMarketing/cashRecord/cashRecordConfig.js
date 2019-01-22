// 提现记录列表表头
export const cashRecordHead = [
    {
        title : 'orderId', // 订单号
        minWidth : 220,
        field : 'orderId'
    },
    {
        title : 'userCode', // 用户编码
        minWidth : 195,
        field : 'userId'
    },
    {
        title : 'saleUserName', // 销售用户姓名
        minWidth : 130,
        enMinWidth : 150,
        field : 'userName'
    },
    {
        title : 'saleUserPhoneNumber', // 用户手机号
        minWidth : 160,
        enMinWidth : 200,
        field : 'mobile'
    },
    /*{
        title : '用户邀请码', // 用户邀请码
        minWidth : 180,
        field : 'inviteCode'
    },*/
    {
        title : 'productName', // 产品名称
        width : 200,
        field : 'productName'
    },
    {
        title : 'terminalSalePrice', // 终端售价
        width : 160,
        enWidth : 250,
        type : 'money',
        field : 'itemSalePrice'
    },
    {
        title : 'salePolicyProductUnitPrice', // 销售政策产品单价
        width : 160,
        enWidth : 240,
        type : 'money',
        field : 'settlePrice'
    },
    {
        title : 'varyfiedNum', // 已核销数量
        width : 130,
        enWidth : 160,
        field : 'withdrawQuantity'
    },
    {
        title : 'orderVaryfiedMoney', // 订单核销金额
        width : 130,
        enWidth : 200,
        type : 'money',
        field : 'checkAmount'
    },
    {
        title : 'totalCommission', // 佣金
        width : 110,
        enWidth : 165,
        type : 'money',
        field : 'orderSalary'
    },
    {
        title : 'auditStatus', // 审核状态
        width : 130,
        field : 'withdrawStatus'
    },
    {
        title : 'operateTime', // 操作时间
        width : 190,
        field : 'updatedTime'
    },
    {
        title : 'operate',
        width : 130,
        enWidth : 190,
    }
];

// 审核状态列表
export const auditStatusList = [
    { label : 'all', value : 'reject_no_req,reject,success,auditing,pass' },
    { label : 'withdrawals', value : 'success' },
    { label : 'waitChecking', value : 'auditing' },
    { label : 'hasPassed', value : 'pass' },
    { label : 'rejected', value : 'reject_no_req,reject' },
];
