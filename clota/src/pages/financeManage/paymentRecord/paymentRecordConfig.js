
//在线支付记录表头配置
export const columns = [
    {
        title : 'transactionTime', // 交易时间
        width : 220,
        field : 'txnReqTime',
        type : 'time'
    },
    {
        title : 'payType', // 支付方式
        width : 120,
        field : 'channelId'
    },
    {
        title : 'orderId', // 订单号
        minWidth : 229,
        field : 'merchantOrderNo'
    },
    {
        title : 'transactionType', // 交易类型
        width : 140,
        field : 'txnType'
    },
    {
        title : 'tradeMoney', // 交易金额
        width : 120,
        field : 'txnAmt'
    },

    {
        title : 'payer', // 付款方
        minWidth : 280,
        field : 'payerRealId'
    },
    {
        title : 'operate', //操作
        width : 100
    }
];
