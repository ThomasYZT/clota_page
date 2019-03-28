
// 产品列表表头
export const productColumn = [
    {
        title : 'productName', // 产品名称
        minWidth : 200,
        enWidth : 200,
        field : 'productName'
    },
    // {
    //     title : 'standardPrice', // 景区成本价
    //     minWidth : 150,
    //     field : 'standardPrice'
    // },
    {
        title : 'settlePrice', // 产品单价
        minWidth : 130,
        enWidth : 160,
        field : 'settlePrice',
        type : 'money'
    },
    {
        title : 'quotaOfProduct', // 产品配额数量
        enWidth : 190,
        minWidth : 130,
        field : ''
    },
    {
        title : 'sharedQuota', // 共享配额数量
        enWidth : 210,
        minWidth : 130,
        field : ''
    },
    {
        title : 'marketQuota', // 全民营销配额数量
        enWidth : 290,
        minWidth : 180,
        field : ''
    },
    {
        title : 'operate', // 操作
        enWidth : 120,
        width : 100,
        field : ''
    },
];

//上级分销单价表头
export const parentDistributePriceConfig = [
    {
        title : 'productName', // 产品名称
        width : 350,
        field : 'productName'
    },
    {
        title : 'stock', // 库存
        minWidth : 200,
        field : 'stockNum'
    },
    {
        title : 'printPrice', // 票面价格
        minWidth : 200,
        field : 'printPrice'
    },
    {
        title : 'stockType', // 限制库存
        width : 200,
        field : 'stockType'
    }
];

//分销详情分销单价表头
export const detailParentDistributePriceConfig = [
    {
        title : 'productName', // 产品名称
        width : 200,
        field : 'productName'
    },
    {
        title : 'quotaQuatity', // 配额数量
        minWidth : 130,
        enMinWidth : 200,
        field : 'stockType'
    },
    {
        title : 'printPrice', // 票面价格
        width : 150,
        minWidth : 200,
        field : 'stockNum'
    },
    {
        title : 'parentDistributePrice', // 上级分销单价
        width : 200,
        field : 'settlePrice',
        type : 'money'
    }
];

//我的分销表头配置
export const myDistributeConfig = [
    {
        title : 'productNameAndSaleGroup', // 产品名称/销售渠道组
        width : 240,
        field : 'productName'
    },
];


//销售渠道表头
export const saleChannelColumn = [
    {
        title : 'chooseSaleChannelGroup', // 选择销售渠道分组
        enWidth : 200,
        minWidth : 100,
        field : 'groupName'
    },
    {
        title : 'selectedSaleChannel', // 已选中的销售渠道
        enWidth : 300,
        minWidth : 500,
        field : 'groupchannels'
    },
    {
        title : 'operate', // 操作
        enWidth : 100,
        minWidth : 100,
        field : ''
    }
];

//设置销售渠道表头
export const setSaleChannelColumn = [
    {
        title : 'chooseSaleChannelGroup', // 选择销售渠道分组
        minWidth : 200,
        field : 'groupName'
    },
    {
        title : 'selectedSaleChannel', // 已选中的销售渠道
        minWidth : 300,
        field : 'channelNames'
    }
];

//全民营销表头--暂不使用
export const marketingColumn = [
    {
        title : 'type', // 类型
        width : 250,
        field : 'typeName'
    },
    {
        title : 'level', // 等级
        minWidth : 250,
        field : 'levelName'
    }
];


//退票表头
export const refundColumn = [
    {
        title : 'returnDeadline', // 退票申请期限
        width : 300,
        field : 'befPlayStart'
    },
    {
        title : 'procedureRates', // 退票手续费率
        minWidth : 100,
        field : 'procedureRates'
    }
];

