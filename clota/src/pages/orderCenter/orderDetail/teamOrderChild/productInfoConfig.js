//下单企业产品信息表头
export const columnData1 = [
    {
        title: '产品名称',
        width: 215,
        field: 'productName'
    },
    {
        title: '下单企业产品单价',
        width: 200,
        field: 'channelInPrice',
        type : 'money'
    },
    {
        title: '预定数量',
        minWidth: 120,
        field: 'quantity'
    },
    {
        title: '取票数量',
        minWidth: 120,
        field: 'quantityPicked'
    },
    {
        title: '核销数量',
        minWidth: 120,
        field: 'quantityVerified'
    }
];
//景区产品信息表头
export const columnData2 = [
    {
        title: '产品名称',
        width: 215,
        field: 'productName'
    },
    {
        title: '销售政策',
        width: 200,
        field: 'policyName'
    },
    {
        title: '景区分配价',
        minWidth: 120,
        field: 'scenicPrice',
        type : 'money'
    },
    {
        title: '一级分销价格分销商',
        minWidth: 170,
        field: 'firstAllocationPrice'
    },
    {
        title: '二级分销价格分销商',
        minWidth: 170,
        field: 'secondAllocationPrice'
    },
    {
        title: '三级分销价格分销商',
        minWidth: 170,
        field: 'thirdAllocationPrice'
    },
    {
        title: '下单企业产品单价',
        width: 200,
        field: 'channelInPrice',
        type : 'money'
    },
    {
        title: '预定数量',
        minWidth: 120,
        field: 'quantity'
    },
    {
        title: '取票数量',
        minWidth: 120,
        field: 'quantityPicked'
    },
    {
        title: '核销数量',
        minWidth: 120,
        field: 'quantityVerified'
    }
];

//中间分销商产品信息表头
export const columnData3 = [
    {
        title: '产品名称',
        width: 215,
        field: 'productName'
    },
    {
        title: '销售政策',
        width: 200,
        field: 'policyName'
    },
    {
        title: '进货单价',
        width: 200,
        field: 'inPrice',
        type : 'money'
    },
    {
        title: '分销单价',
        width: 200,
        field: 'settlePrice',
        type : 'money'
    },
    {
        title: '预定数量',
        minWidth: 120,
        field: 'quantity'
    },
    {
        title: '取票数量',
        minWidth: 120,
        field: 'quantityPicked'
    },
    {
        title: '核销数量',
        minWidth: 120,
        field: 'quantityVerified'
    }
];
