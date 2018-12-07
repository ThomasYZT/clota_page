// 营业状况列表表头
export const businessHead = [
    {
        title : 'ranking', // 排名
        minWidth : 80,
        field : ''
    },
    {
        title : 'productName', // 产品名称
        minWidth : 130,
        field : 'name'
    },
    {
        title : 'tradeVolume', // 交易量
        minWidth : 190,
        field : 'value'
    },
];

// 待处理事项列表表头
export const pendingMattersHead = [
    {
        title : 'index', // 序号
        minWidth : 70,
        field : ''
    },
    {
        title : 'mattersType', // 事项类别
        width : 110,
        field : 'name'
    },
    {
        title : 'quantity', // 数量
        minWidth : 70,
        field : 'value'
    },
];

// 全部待处理事项列表表头
export const allPendingMattersHead = [
    {
        title : 'index', // 序号
        width : 70,
        field : ''
    },
    {
        title : 'mattersExplain', // 事项说明
        minWidth : 110,
        field : 'content'
    },
    {
        title : 'mattersType', // 事项类别
        width : 110,
        field : 'classify'
    },
    {
        title : 'operate',
        width : 200,
        enWidth : 230,
    }
];

// 分业态经营状况列表表头
export const productTypeOperateHead = [
    {
        title : 'ranking', // 排名
        minWidth : 70,
        field : ''
    },
    {
        title : 'industryType', // 业态类型
        width : 110,
        field : 'name'
    },
    {
        title : 'quantity', // 预定金额
        minWidth : 70,
        field : 'value'
    },
];

// 分产品经营状况列表表头
export const productNameOperateHead = [
    {
        title : 'ranking', // 排名
        minWidth : 70,
        field : ''
    },
    {
        title : 'productName', // 产品名称
        minWidth : 130,
        field : 'name'
    },
    {
        title : 'quantity', // 预定金额
        minWidth : 70,
        field : 'value'
    },
];
