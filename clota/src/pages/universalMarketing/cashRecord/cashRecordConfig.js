// 提现记录列表表头
export const cashRecordHead = [
    {
        title : 'orderId', // 订单号
        minWidth : 220,
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
        title : '销售用户手机号', // 用户手机号
        width : 150,
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
        title : '终端售价', // 终端售价
        width : 160,
        enWidth : 180,
        type : 'money',
        field : 'itemSalePrice'
    },
    {
        title : '销售政策产品单价', // 销售政策产品单价
        width : 160,
        enWidth : 180,
        type : 'money',
        field : 'settlePrice'
    },
    {
        title : '已核销数量', // 已核销数量
        width : 130,
        field : 'withdrawQuantity'
    },
    {
        title : '订单核销金额', // 订单核销金额
        width : 130,
        enWidth : 150,
        type : 'money',
        field : 'checkAmount'
    },
    {
        title : '佣金总额', // 佣金
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
        width : 130,
        enWidth : 160,
    }
];

// 审核状态列表
export const auditStatusList = [
    { label : '全部', value : 'reject_no_req,reject,success,auditing,pass' },
    { label : '已提现', value : 'success' },
    { label : '待审核', value : 'auditing' },
    { label : '已通过', value : 'pass' },
    { label : '已驳回', value : 'reject_no_req,reject' },
];
