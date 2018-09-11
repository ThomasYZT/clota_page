
// 充值记录表头
export const rechargeHead = [
    {
        title: '付款方',      // 付款方
        width: 160,
        field: 'payer'
    },
    {
        title: '收款方',   // 收款方
        minWidth: 150,
        field: 'payee'
    },
    {
        title: '充值金额',   // 充值金额
        minWidth: 100,
        field: 'rechargeAmount'
    },
    {
        title: '充值方式',      // 充值方式
        minWidth: 120,
        field: 'rechargeType'
    },
    {
        title: '交易流水号',      // 交易流水号
        minWidth: 210,
        field: 'transactionNo'
    },
    {
        title: 'remark',      // 备注
        minWidth: 200,
        field: 'remark'
    },
    {
        title: '状态',        // 状态
        minWidth: 120,
        field: 'status'
    },
    {
        title: 'operate',       // 操作
        width: 80,
        field: ''
    },
];

// 付款账户管理表头
export const paymentHead = [
    {
        title: '状态',        // 状态
        minWidth: 110,
        field: 'status'
    },
    {
        title: 'code',        // 编码
        minWidth: 200,
        field: 'code'
    },
    {
        title: 'partner',        // 合作伙伴
        minWidth: 220,
        field: 'partner'
    },
    {
        title: '可用额度',        // 可用额度
        minWidth: 180,
        field: 'availableCredit'
    },
    {
        title: 'moneyBalance',        // 账户余额
        minWidth: 180,
        field: 'balance'
    },
    {
        title: '信用额度',        // 信用额度
        minWidth: 180,
        field: 'creditLimits'
    },
    {
        title: 'operate',       // 操作
        minWidth: 80,
        field: ''
    },
];
