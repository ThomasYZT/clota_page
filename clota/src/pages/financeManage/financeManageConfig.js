
// 充值记录表头
export const rechargeHead = [
    {
        title: 'payer',   // 付款方
        minWidth: 150,
        field: 'orgName'
    },
    {
        title: 'payee',      // 收款方
        width: 160,
        field: 'peerOrgName'
    },
    {
        title: 'rechargeAmount',   // 充值金额
        minWidth: 100,
        field: 'amount'
    },
    {
        title: 'rechargeType',      // 充值方式
        minWidth: 120,
        field: 'paymentType'
    },
    {
        title: 'transactionSerialNumber',      // 交易流水号
        minWidth: 210,
        field: 'tpOrderNo'
    },
    {
        title: 'remark',      // 备注
        minWidth: 200,
        field: 'remark'
    },
    {
        title: 'status',        // 状态
        minWidth: 120,
        field: 'status'
    },
    /*{
        title: 'operate',       // 操作
        minWidth: 120,
        field: ''
    },*/
];

// 付款账户管理表头
export const paymentHead = [
    {
        title: 'status',        // 状态
        minWidth: 110,
        field: 'status'
    },
    {
        title: 'code',        // 编码
        minWidth: 200,
        field: 'accountCode'
    },
    {
        title: 'partner',        // 合作伙伴
        minWidth: 220,
        field: 'orgName'
    },
    {
        title: 'availableCredit',        // 可用额度
        minWidth: 180,
        field: 'availableBalance'
    },
    {
        title: 'moneyBalance',        // 账户余额
        minWidth: 180,
        field: 'accountBalance'
    },
    {
        title: 'creditBalance',        // 信用额度
        minWidth: 180,
        field: 'creditBalance'
    },
    {
        title: 'operate',       // 操作
        minWidth: 80,
        field: ''
    },
];
