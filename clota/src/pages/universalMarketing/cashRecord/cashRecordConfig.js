// 提现记录列表表头
export const cashRecordHead = [
    {
        title : 'orderId', // 订单号
        width : 200,
        field : 'orderId'
    },
    {
        title : '用户编码', // 用户编码
        minWidth : 130,
        field : 'userId'
    },
    {
        title : '销售用户姓名', // 销售用户姓名
        minWidth : 130,
        field : 'userName'
    },
    {
        title : '用户手机号', // 用户手机号
        width : 200,
        enWidth : 180,
        field : 'mobile'
    },
    {
        title : '用户邀请码', // 用户邀请码
        minWidth : 130,
        field : 'inviteCode'
    },
    {
        title : 'productName', // 产品名称
        width : 230,
        enWidth : 280,
        field : 'productName'
    },
    {
        title : 'settlePrice', // 产品单价
        width : 160,
        enWidth : 180,
        type : 'money',
        field : 'itemSalePrice'
    },
    {
        title : 'quantity', // 数量
        width : 100,
        field : 'withdrawQuantity'
    },
    {
        title : 'orderAmount', // 订单金额
        width : 110,
        enWidth : 130,
        type : 'money',
        field : 'saleAmount'
    },
    {
        title : '佣金', // 佣金
        width : 110,
        type : 'money',
        field : 'orderSalary'
    },
    {
        title : 'auditStatus', // 审核状态
        width : 130,
        field : 'withdrawStatus'
    },
    {
        title : '操作时间', // 操作时间
        width : 190,
        field : 'updatedTime'
    },
    {
        title : 'operate',
        width : 180,
        enWidth : 230,
    }
];

// 审核状态列表
export const auditStatusList = [
    { label : '全部', value : 'reject_no_req,reject,success,auditing' },
    { label : '已提现', value : 'success' },
    { label : '待审核', value : 'auditing' },
    { label : '已驳回', value : 'reject_no_req,reject' },
];
