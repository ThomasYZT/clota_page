
// 产品列表表头
export const productColumn = [
    {
        title: 'productName',      // 产品名称
        width: 200,
        field: 'productName'
    },
    {
        title: 'standardPrice',   // 景区成本价
        minWidth: 90,
        field: 'standardPrice'
    },
    {
        title: 'settlePrice',   // 产品单价
        minWidth: 90,
        field: 'settlePrice'
    },
    {
        title: 'stockType',       // 限制库存
        width: 180,
        field: 'stockType'
    }
];

//销售渠道表头
export const saleChannelColumn = [
    {
        title: 'chooseSaleChannelGroup',      // 选择销售渠道分组
        width: 200,
        field: 'groupName'
    },
    {
        title: 'selectedSaleChannel',   // 已选中的销售渠道
        minWidth: 300,
        field: 'groupchannels'
    }
];

//全民营销表头--暂不使用
export const marketingColumn = [
    {
        title: '类型',      // 类型
        width: 250,
        field: 'id'
    },
    {
        title: '等级',   // 等级
        minWidth: 250,
        field: 'name'
    }
];


//退票表头
export const refundColumn = [
    {
        title: 'returnDeadline',      // 退票申请期限
        width: 300,
        field: 'befPlayStart'
    },
    {
        title: 'procedureRates',   // 退票手续费率
        minWidth: 100,
        field: 'procedureRates'
    }
];

