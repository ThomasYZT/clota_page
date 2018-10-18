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

// 团队订单--批量审核--订单列表表头
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
    {
        title: '订单号',
        width: 200,
        field: 'orderNo'
    },
    {
        title: '订单明细编号',
        width: 200,
        field: 'orderDetailNo'
    },
    {
        title: '游玩日期',
        minWidth: 200,
        field: 'visitDate'
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
        field: 'channel'
    },
    {
        title: '下单渠道',
        width: 130,
        enWidth : 150,
        field: 'orderChannel'
    },
    {
        title: '第三方订单号',
        width: 200,
        field: 'thirdOrderNo'
    },
    {
        title: '产品名称/预定数量',
        width: 180,
        enWidth : 200,
        field: 'productName/quantity'
    },
    {
        title: '产品单价/小计金额',
        width: 180,
        enWidth : 200,
        field: 'price/amount'
    },
    {
        title: '游客/手机号',
        width: 130,
        enWidth : 150,
        field: 'visitorName / phoneNumber'
    },
    {
        title: '申请数量',
        width: 100,
        enWidth : 130,
        field: 'reqNum'
    },
    {
        title: '申请时间',
        width: 200,
        field: 'reqTime'
    },
    {
        title: '同步状态',
        width: 100,
        enWidth : 130,
        field: 'syncStatus'
    },
    {
        title: '操作',
        width: 180,
        enWidth : 180,
    }
];

// 散客订单--批量审核--订单列表表头
export const bulkBatchAuditHead = [
    {
        title: '订单明细编号',
        width: 200,
        field: 'orderDetailNo'
    },
    {
        title: '下单企业',
        minWidth: 150,
        enWidth : 180,
        field: 'channel'
    },
    {
        title: '产品名称',
        minWidth: 150,
        enWidth : 180,
        field: 'productName'
    },
    {
        title: '申请数量',
        width: 100,
        enWidth : 130,
        field: 'reqNum'
    },
];

// 散客订单--审核详情--产品列表表头
export const productListHead = [
    {
        title: '产品明细编号',
        width: 200,
        field: 'id'
    },
    {
        title: '游玩日期',
        minWidth: 200,
        field: 'visitDate'
    },
    {
        title: '取票状态',
        width: 100,
        enWidth : 130,
        field: 'pickStatus'
    },
    {
        title: '核销状态',
        width: 100,
        enWidth : 130,
        field: 'verifyStatus'
    },
    {
        title: '退票状态',
        width: 100,
        enWidth : 130,
        field: 'refundStatus'
    },
    {
        title: '改签状态',
        width: 100,
        enWidth : 130,
        field: 'rescheduleStatus'
    },
    {
        title: '串码',
        width: 150,
        field: 'serialNo'
    },
    {
        title: '同步状态',
        width: 100,
        enWidth : 130,
        field: 'syncStatus'
    },
    {
        title: 'operate',
        width: 80,
    }
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

//订单同步状态
export const orderSyncStatus = [
    {
        label : '-',//团队
        value : 'wait'
    },
    {
        label : 'synchronized',  //已同步
        value : 'success'
    },
    {
        label : 'syncFailed', //同步失败
        value : 'failure'
    },
];
