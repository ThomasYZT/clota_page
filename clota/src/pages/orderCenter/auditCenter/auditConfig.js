// 团队订单审核列表表头
export const groupOrderHead = [
    {
        title: '订单号',
        width: 200,
        field: 'orderNo'
    },
    {
        title: '游玩日期',
        minWidth: 200,
        field: 'originVisitDate'
    },
    {
        title: '下单时间',
        width: 200,
        field: 'orderTime'
    },
    {
        title: '下单企业',
        width: 130,
        enWidth : 180,
        field: 'orderOrgName'
    },
    {
        title: '下单渠道',
        width: 130,
        enWidth : 180,
        field: 'orderChannel'
    },
    {
        title: '产品名称',
        width: 130,
        enWidth : 180,
        field: 'productName'
    },
    {
        title: '游客人数',
        width: 130,
        enWidth : 180,
        field: 'quantity'
    },
    {
        title: '下单企业订单金额',
        width: 130,
        enWidth : 180,
        field: 'orderAmount'
    },
    {
        title: '支付状态',
        width: 130,
        enWidth : 180,
        field: 'paymentStatus'
    },
    {
        title: '操作',
        width: 180,
        enWidth : 180,
    }
];

// 散客退票审核列表表头
export const bulkRefundHead = [

];

// 散客改签审核列表表头
export const bulkChangeHead = [

];


// 下单渠道，枚举
export const orderChannelEnum = [
    {label: '景点', value: 'scenic'},
    {label: 'OTA', value: 'ota'},
    {label: '旅行社', value: 'tour'},
];
