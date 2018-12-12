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
        enWidth : 130,
        type : 'money',
        field : 'printPrice'
    },
    {
        title : '销售政策产品单价', // 销售政策产品单价
        width : 160,
        enWidth : 180,
        type : 'money',
        field : 'settlePrice'
    },
    {
        title : '终端售价', // 终端售价
        minWidth : 130,
        type : 'money',
        field : 'salePrice'
    },
    {
        title : '佣金', // 佣金
        width : 110,
        type : 'money',
        field : 'commission'
    },
    {
        title : 'operate',
        width : 200,
        enWidth : 200,
    }
];
