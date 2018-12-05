
// 产品表头
export const productColumn = [
    {
        title : 'productName', // 产品名称
        width : 160,
        field : 'productName'
    },
    {
        title : 'standardPrice', // 景区成本价
        minWidth : 150,
        field : 'standardPrice'
    },
    {
        title : 'settlePrice', // 产品单价
        minWidth : 130,
        field : 'settlePrice'
    }, {
        title : 'stockType', // 限制库存
        minWidth : 130,
        field : 'stockType'
    },
    {
        title : 'operate', // 操作
        width : 150,
        field : ''
    },
];

// 销售渠道表头
export const selectSaleChannelColumn = [
    {
        title : 'saleChannelGroup', // 销售渠道分组
        minWidth : 120,
        field : 'groupName'
    },
    {
        title : 'saleChannels', // 销售渠道
        minWidth : 120,
        field : 'channelNames'
    },
];

// 销售渠道表头-查看
export const saleChannelColumn = [
    {
        title : 'saleChannelGroup', // 销售渠道分组
        width : 260,
        field : 'groupName'
    },
    {
        title : 'saleChannels', // 销售渠道
        minWidth : 400,
        field : 'groupchannels'
    },
];

// 全民营销表头
export const marketingColumn = [
    {
        title : 'marketType', // 营销类别
        width : 300,
        field : 'typeName'
    },
    {
        title : 'gradeName', // 等级名称
        minWidth : 300,
        field : 'levelName'
    },
    {
        title : 'operate', // 操作
        width : 180,
        field : ''
    },
];

//日期清单视图表头
export const dateListColumn = [
    {
        title : 'Year', // 年
        width : 75,
        field : 'year'
    },
    {
        title : 'Month', // 月
        width : 85,
        field : 'month'
    },
    {
        title : 'Day', // 日
        minWidth : 240,
        field : 'day'
    },
];

//退票表头
export const refundColumn = [
    {
        title : 'returnDeadline', // 退票申请期限
        width : 500,
        field : 'befPlayStart'
    },
    {
        title : 'procedureRates', // 退票手续费率
        minWidth : 100,
        field : 'procedureRates'
    },
    {
        title : 'operate', // 操作
        width : 220,
        field : ''
    },
];

//分账表头
export const subAccountColumn = [
    {
        title : 'park', // 园区
        width : 340,
        field : 'parkName'
    },
    {
        title : 'moneyUnit', // 金额（元）
        minWidth : 300,
        field : 'subPrice'
    },
];
