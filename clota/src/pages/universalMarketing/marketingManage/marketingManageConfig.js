// 营销产品管理列表表头
export const marketingProductHead = [
    {
        title : 'productName', // 产品名称
        width : 230,
        enWidth : 280,
        field : 'productName'
    },
    {
        title : 'stock', // 库存
        minWidth : 130,
        field : 'stockType/stockNum'
    },
    {
        title : 'printPrice', // 票面价格
        width : 110,
        enWidth : 150,
        type : 'money',
        field : 'printPrice'
    },
    {
        title : 'salePolicyProductUnitPrice', // 销售政策产品单价
        width : 160,
        enWidth : 250,
        type : 'money',
        field : 'settlePrice'
    },
    {
        title : 'terminalSalePrice', // 终端售价
        minWidth : 130,
        type : 'money',
        field : 'salePrice'
    },
    {
        title : 'commission', // 佣金
        width : 110,
        enWidth : 130,
        type : 'money',
        field : 'commission'
    },
    {
        title : 'offlinePayment', // 线下支付
        width : 130,
        enWidth : 150,
        field : 'supportCollect'
    },
    {
        title : 'operate',
        width : 200,
        enWidth : 230,
    }
];
