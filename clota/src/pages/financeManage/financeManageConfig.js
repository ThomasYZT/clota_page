
// 充值记录表头
export const rechargeHead = [
    {
        title : 'payer', // 付款方
        minWidth : 150,
        field : 'orgName'
    },
    {
        title : 'payee', // 收款方
        width : 160,
        field : 'peerOrgName'
    },
    {
        title : 'rechargeAmount', // 充值金额
        minWidth : 100,
        enMinWidth : 170,
        field : 'amount'
    },
    {
        title : 'rechargeType', // 充值方式
        minWidth : 120,
        enMinWidth : 170,
        field : 'paymentType'
    },
    {
        title : 'transactionSerialNumber', // 交易流水号
        minWidth : 210,
        field : 'merchantTxnNo'
    },
    {
        title : 'remark', // 备注
        minWidth : 200,
        field : 'remark'
    },
    {
        title : 'paymentStatus', // 支付状态
        minWidth : 120,
        enMinWidth : 150,
        field : 'txnStatus'
    },
    {
        title : 'systemStatus', // 系统状态
        minWidth : 120,
        enMinWidth : 150,
        field : 'status'
    },
    {
        title : 'operate', // 操作
        minWidth : 120,
        enMinWidth : 150,
        field : ''
    },
];

// 付款账户管理表头
export const paymentHead = [
    {
        title : 'status', // 状态
        minWidth : 110,
        enMinWidth : 170,
        field : 'status'
    },
    {
        title : 'code', // 编码
        minWidth : 200,
        field : 'accountCode'
    },
    {
        title : 'partner', // 合作伙伴
        minWidth : 220,
        field : 'orgName'
    },
    {
        title : 'availableCredit', // 可用额度
        minWidth : 180,
        field : 'availableBalance',
        type : 'money'
    },
    {
        title : 'moneyBalance', // 账户余额
        minWidth : 180,
        field : 'accountBalance',
        type : 'money'
    },
    {
        title : 'creditBalance', // 信用额度
        minWidth : 180,
        field : 'creditBalance',
        type : 'money'
    },
    {
        title : 'operate', // 操作
        minWidth : 120,
        enWidth : 120,
        field : ''
    },
];
