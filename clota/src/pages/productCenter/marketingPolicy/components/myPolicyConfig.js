//我的分销单价

export const myPolicyConfig = [
    {
        title : 'productName', // 产品名称
        minWidth : 150,
        field : 'productName'
    },
    {
        title : 'stock', //库存
        minWidth : 150,
        field : 'stockNum'
    },
    {
        title : 'printPrice', //票面价格
        minWidth : 150,
        field : 'printPrice'
    },
    {
        title : 'parentDistributePrice', //上级分销单价
        minWidth : 150,
        field : 'settlePrice'
    }
];

export const auditConfirmHeadConfig = [
    {
        title : 'productName', //产品名称
        minWidth : 150,
        field : 'productName'
    },
    {
        title : 'currentStatus', //当前状态
        minWidth : 150,
        field : 'auditStatus'
    }
]
