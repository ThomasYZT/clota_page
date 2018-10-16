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
        minWidth: 200,
        field: 'orderTime'
    },
    {
        title: '下单企业',
        width: 150,
        enWidth : 180,
        field: 'orderOrgName'
    },
    {
        title: '下单渠道',
        width: 130,
        enWidth : 150,
        field: 'orderChannel'
    },
    {
        title: '产品名称',
        width: 150,
        enWidth : 180,
        field: 'productName'
    },
    {
        title: '游客人数',
        width: 100,
        enWidth : 180,
        field: 'quantity'
    },
    {
        title: '下单企业订单金额',
        width: 160,
        enWidth : 180,
        field: 'orderAmount'
    },
    {
        title: '支付状态',
        width: 110,
        enWidth : 130,
        field: 'paymentStatus'
    },
    {
        title: '操作',
        width: 180,
        enWidth : 180,
    }
];

// 团队订单--单个审核--订单下的产品列表表头
export const orderProductHead = [
    {
        title: '产品名称',
        minWidth: 150,
        enWidth : 180,
        field: 'productName'
    },
    {
        title: '预订数量',
        width: 100,
        field: 'quantity'
    },
    {
        title: '产品单价',
        width: 100,
        field: 'price'
    },
    {
        title: '产品小计',
        width: 100,
        field: 'actPrice'
    },
];

// 团队订单--批量审核--订单下列表表头
export const batchAuditHead = [
    {
        title: '订单号',
        minWidth: 150,
        enWidth : 180,
        field: 'orderNo'
    },
    {
        title: '下单企业',
        width: 150,
        enWidth : 180,
        field: 'orderOrgName'
    },
    {
        title: '游玩日期',
        minWidth: 200,
        field: 'originVisitDate'
    },
    {
        title: '订单金额',
        width: 100,
        field: 'orderAmount'
    },
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
    {label: '旅行社', value: 'travel'},
];

// 支付状态，枚举
export const paymentStatusEnum = [
    {label: '全部', value: 'all'},
    {label: '已支付', value: 'true'},
    {label: '未支付', value: 'false'},
];

// 批量审核
export const batchAudit = [
    {label: '通过', value: 'success'},
    {label: '驳回', value: 'reject'},
];
