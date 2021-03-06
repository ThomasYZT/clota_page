
// 交易列表表头
export const fundDetailHead = [
    {
        title : 'transactionAmountThisTime', // 本次交易金额
        minWidth : 190,
        enMinWidth : 290,
        field : 'amount'
    },
    {
        title : 'transactionType', // 交易类型
        width : 170,
        enWidth : 250,
        field : 'evaluateType'
    },
    {
        title : 'transactionInfo', // 交易信息
        minWidth : 190,
        enMinWidth : 208,
        field : 'remark'
    },
    {
        title : 'transactionCode', // 交易编码
        width : 200,
        field : 'id'
    },
    {
        title : 'accBalanceAfterTransaction', // 交易后账户余额
        minWidth : 200,
        enMinWidth : 278,
        field : 'endingBalance'
    },
    {
        title : 'transactionTime', // 交易时间
        width : 220,
        field : 'createdTime'
    }
];

// 按交易类型筛选的条件选项
export const dealType = [
    {
        name : 'transactionTypeAll', // 全部交易类型
        value : 'all',
    },
    {
        name : 'consume', // 消费
        value : 'consume',
    },
    {
        name : 'recharge', // 储值
        value : 'recharge',
    },
    {
        name : 'adjustMoney', // 手动改资金账户
        value : 'adjust_money',
    },
];
