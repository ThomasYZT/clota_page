
//表头配置
export const integraDetailHead = [
    {
        title: 'transactionIntegralThisTime',      // 本次交易积分
        minWidth: 150,
        field: 'amount'
    },
    {
        title: 'transactionType',      // 交易类型
        width: 150,
        field: 'operationType'
    },
    {
        title: 'transactionInfo',      // 交易信息
        minWidth: 200,
        field: 'remark'
    },
    {
        title: 'transactionCode',      // 交易编码
        width: 190,
        field: 'id'
    },
    {
        title: 'accIntegralAfterTransaction',      // 交易后账户积分
        minWidth: 200,
        field: 'endingBalance'
    },
    {
        title: 'transactionTime',      // 交易时间
        width: 180,
        field: 'createdTime'
    }
];

// 按交易类型筛选的条件选项
export const integraType = [
    {
        name: 'transactionTypeAll',     // 全部交易类型
        value: 'null',
    },
    {
        name: 'gainByConsuming',   // 消费所得
        value: 'consume',
    },
    {
        name: 'adjustScore',    // 手动改积分账户
        value: 'adjust_score',
    },
];
