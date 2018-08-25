
//表头配置
export const integraDetailHead = [
    {
        title: '本次交易积分',
        minWidth: 100,
        field: 'amount'
    },
    {
        title: '交易类型',
        width: 100,
        field: 'operationType'
    },
    {
        title: '交易编码',
        width: 200,
        field: 'id'
    },
    {
        title: '交易信息',
        minWidth: 190,
        field: 'remark'
    },
    {
        title: '交易后账户积分',
        minWidth: 100,
        field: 'endingBalance'
    },
    {
        title: '交易时间',
        width: 180,
        field: 'createdTime'
    }
];

// 按交易类型筛选的条件选项
export const integraType = [
    {
        name: '全部交易类型',
        value: 'null',
    },
    {
        name: '积分消耗',
        value: 'useUp',
    },
    {
        name: '消费所得',
        value: 'consume',
    },
    {
        name: '手动改积分账户',
        value: 'manual',
    },
];
