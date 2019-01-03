//下单企业产品信息表头
export const columnData1 = [
    {
        title : 'productName',
        width : 215,
        field : 'productName'
    },
    {
        title : 'channelProductUnitPice',
        width : 200,
        field : 'channelInPrice',
        type : 'money'
    },
    {
        title : 'reserveNum',
        minWidth : 120,
        field : 'quantity'
    },
    {
        title : 'ticketPickNum',
        minWidth : 120,
        field : 'quantityPicked'
    },
    {
        title : 'verificationNum',
        minWidth : 120,
        field : 'quantityVerified'
    }
];
//景区产品信息表头
export const columnData2 = [
    {
        title : 'productName',
        width : 215,
        field : 'productName'
    },
    {
        title : 'marketingPolicy',
        width : 200,
        field : 'policyName'
    },
    {
        title : 'scenicDistrbutePrice',
        minWidth : 120,
        field : 'scenicPrice',
        type : 'money'
    },
    {
        title : '1levelAllowcation',
        minWidth : 170,
        field : 'firstAllocationPrice'
    },
    {
        title : '2levelAllowcation',
        minWidth : 170,
        field : 'secondAllocationPrice'
    },
    {
        title : '3levelAllowcation',
        minWidth : 170,
        field : 'thirdAllocationPrice'
    },
    {
        title : 'channelProductUnitPice',
        width : 200,
        field : 'channelInPrice',
        type : 'money'
    },
    {
        title : 'reserveNum',
        minWidth : 120,
        field : 'quantity'
    },
    {
        title : 'ticketPickNum',
        minWidth : 120,
        field : 'quantityPicked'
    },
    {
        title : 'verificationNum',
        minWidth : 120,
        field : 'quantityVerified'
    }
];

//中间分销商产品信息表头
export const columnData3 = [
    {
        title : 'productName',
        width : 215,
        field : 'productName'
    },
    {
        title : 'marketingPolicy',
        width : 200,
        field : 'policyName'
    },
    {
        title : 'stockPrice', // 进货单价
        width : 200,
        field : 'inPrice',
        type : 'money'
    },
    {
        title : 'allowcationPrice', // 分销单价
        width : 200,
        field : 'settlePrice',
        type : 'money'
    },
    {
        title : 'reserveNum', // 预定数量
        minWidth : 120,
        field : 'quantity'
    },
    {
        title : 'ticketPickNum',
        minWidth : 120,
        field : 'quantityPicked'
    },
    {
        title : 'verificationNum',
        minWidth : 120,
        field : 'quantityVerified'
    }
];
