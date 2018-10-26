// 团队订单审核列表表头
export const groupOrderHead = [
    {
        title: 'orderId',   // 订单号
        width: 200,
        field: 'orderNo'
    },
    {
        title: 'playDate',  // 游玩日期
        minWidth: 200,
        field: 'originVisitDate'
    },
    {
        title: 'orderTime',  // 下单时间
        minWidth: 200,
        field: 'orderTime'
    },
    {
        title: 'orderOrg',      // 下单企业
        width: 150,
        enWidth : 180,
        field: 'orderOrgName'
    },
    {
        title: 'orderChannel',      // 下单渠道
        width: 130,
        enWidth : 150,
        field: 'orderChannel'
    },
    {
        title: 'productName',      // 产品名称
        width: 150,
        enWidth : 180,
        field: 'productName'
    },
    {
        title: 'visitorNum',      // 游客人数
        width: 100,
        enWidth : 180,
        field: 'quantity'
    },
    {
        title: 'orderOrgAmount',  // 下单企业订单金额
        width: 160,
        enWidth : 180,
        field: 'orderAmount'
    },
    {
        title: 'paymentStatus',      // 支付状态
        width: 110,
        enWidth : 130,
        field: 'paymentStatus'
    },
    {
        title: 'operate',
        width: 180,
        enWidth : 180,
    }
];

// 团队订单--单个审核--订单下的产品列表表头
export const orderProductHead = [
    {
        title: 'productName',      // 产品名称
        minWidth: 150,
        enWidth : 180,
        field: 'productName'
    },
    {
        title: 'reserveNum',       // 预订数量
        width: 100,
        field: 'quantity'
    },
    {
        title: 'settlePrice',       // 产品单价
        width: 100,
        field: 'price'
    },
    {
        title: 'productActPrice',       // 产品小计
        width: 100,
        field: 'actPrice'
    },
];

// 团队订单--批量审核--订单列表表头
export const batchAuditHead = [
    {
        title: 'orderId',
        minWidth: 150,
        // enWidth : 180,
        field: 'orderNo'
    },
    {
        title: 'orderOrg',
        miWidth: 150,
        enWidth : 160,
        field: 'orderOrgName'
    },
    {
        title: 'playDate',
        width: 130,
        field: 'originVisitDate'
    },
    {
        title: 'orderAmount',       // 订单金额
        width: 120,
        field: 'orderAmount'
    },
];

// 散客退票审核列表表头
export const bulkRefundHead = [
    {
        title: 'orderId',
        width: 200,
        field: 'orderNo'
    },
    {
        title: 'orderDetailNo',     // 订单明细编号
        width: 200,
        field: 'orderDetailNo'
    },
    {
        title: 'playDate',
        minWidth: 200,
        field: 'visitDate'
    },
    {
        title: 'orderTime',
        minWidth: 200,
        field: 'orderTime'
    },
    {
        title: 'orderOrg',
        width: 150,
        enWidth : 180,
        field: 'channel'
    },
    {
        title: 'orderChannel',
        width: 130,
        enWidth : 150,
        field: 'orderChannel'
    },
    {
        title: 'thirdOrderNo',      // 第三方订单号
        width: 200,
        field: 'thirdOrderNo'
    },
    {
        title: '产品名称|预定数量',     // 产品名称|预定数量
        width: 180,
        enWidth : 200,
        field: 'productName|quantity'
    },
    {
        title: '产品单价|小计金额',
        width: 230,
        enWidth : 200,
        field: 'price|amount'
    },
    {
        title: '游客|手机号',
        width: 200,
        field: 'visitorName|phoneNumber'
    },
    {
        title: '申请数量',
        width: 100,
        enWidth : 130,
        field: 'reqNum'
    },
    {
        title: '申请改签后游玩日期',
        minWidth: 200,
        field: 'rescheduleAfterVisitDate'
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
        width: 190,
        field: 'orderDetailNo'
    },
    {
        title: '下单企业',
        minWidth: 130,
        enWidth : 180,
        field: 'channel'
    },
    {
        title: '产品名称',
        minWidth: 130,
        enWidth : 180,
        field: 'productName'
    },
    {
        title: '申请数量',
        width: 100,
        enWidth : 130,
        field: 'reqNum'
    },
    {
        title: '申请改签后游玩日期',
        minWidth: 200,
        field: 'rescheduleAfterVisitDate'
    },
];

// 散客订单--审核详情--产品列表表头
export const productListHead = [
    {
        title: '',
        minWidth: 50,
        field: ''
    },
    {
        title: '产品明细编号',
        minWidth: 200,
        field: 'id'
    },
    {
        title: '游玩日期',
        minWidth: 200,
        field: 'visitDate'
    },
    {
        title: '取票状态',
        minWidth: 100,
        enWidth : 130,
        field: 'pickStatus'
    },
    {
        title: '核销状态',
        minWidth: 100,
        enWidth : 130,
        field: 'verifyStatus'
    },
    {
        title: '退票状态',
        minWidth: 120,
        enWidth : 130,
        field: 'refundStatus'
    },
    {
        title: '改签状态',
        minWidth: 150,
        enWidth : 150,
        field: 'rescheduleStatus'
    },
    {
        title: '申请改签后游玩日期',
        minWidth: 200,
        field: 'rescheduleAfterVisitDate'
    },
    {
        title: '串码',
        minWidth: 150,
        field: 'serialNo'
    },
    {
        title: '同步状态',
        minWidth: 100,
        enWidth : 130,
        field: 'syncStatus'
    },
    {
        title: 'operate',
        width: 80,
    }
];

// 散客订单--审核详情--退票/改签日志列表表头
export const refundAlterLogHead = [
    {
        title: '申请退票数量',
        width: 150,
        enWidth : 180,
        field: 'reqNum'
    },
    {
        title: '申请人/时间',
        width: 300,
        field: 'reqAccOrg/reqAccName/reqTime'
    },
    {
        title: '退票审核通过',
        width: 150,
        enWidth : 180,
        field: 'passNum'
    },
    {
        title: '操作员/时间',
        width: 300,
        field: 'auditAccOrg/auditAccName/auditTime'
    },
    {
        title: '产品明细编号',
        minWidth: 150,
        enWidth : 180,
        field: 'passOrderTicketIds'
    },
];

// 散客订单--审核详情--核销日志列表表头
export const verifyLogHead = [
    {
        title: '核销数量',
        minWidth: 150,
        enWidth : 180,
        field: 'verifyNum'
    },
    {
        title: '操作员/时间',
        minWidth: 280,
        field: 'orgName/operator/operatedTime'
    },
    {
        title: '产品明细编号',
        minWidth: 150,
        enWidth : 180,
        field: 'ticketIds'
    },
];

// 散客改签审核列表表头
export const bulkChangeHead = [

];


// 批量审核
export const batchAudit = [
    {label: '通过', value: 'success'},
    {label: '驳回', value: 'reject'},
];

//订单同步状态
export const orderSyncStatus = [
    {
        label : '-',    //无状态
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
