// 散客退票审核列表表头
export const bulkRefundHead = [
    {
        title : 'orderId',
        width : 200,
        field : 'orderNo'
    },
    {
        title : 'orderDetailNo', // 订单明细编号
        width : 200,
        field : 'orderDetailNo'
    },
    {
        title : 'scenePlace',
        width : 150,
        field : 'orgName'
    },
    {
        title : 'playDate',
        minWidth : 150,
        field : 'originVisitDate',
        type : 'date'
    },
    {
        title : 'orderTime',
        minWidth : 200,
        field : 'createdTime'
    },
    {
        title : 'orderChannel',
        width : 130,
        enWidth : 150,
        field : 'orderChannel'
    },
    {
        title : 'orderOrg',
        width : 150,
        enWidth : 180,
        field : 'placeOrderOrgName'
    },
    {
        title : 'thirdOrderNo', // 第三方订单号
        width : 200,
        field : 'thirdOrderNo'
    },
    {
        title : 'pNameAndReverseNum', // 产品名称|预定数量
        width : 200,
        field : 'pNameAndReverseNum'
    },
    {
        title : 'unitPriceAndSubtotal', // 产品单价|小计金额
        width : 230,
        enWidth : 200,
        field : 'unitPriceAndSubtotal'
    },
    {
        title : 'visitorAndMobilePhone', // 游客|手机号
        width : 200,
        field : 'visitorAndMobilePhone'
    },
    {
        title : 'requestNum', // 申请数量
        width : 100,
        enWidth : 130,
        field : 'reqNum'
    },
    {
        title : 'requestTime', // 申请时间
        width : 200,
        field : 'reqTime',
        type : 'dateTime'
    },
    {
        title : 'syncStatus', // 同步状态
        width : 100,
        enWidth : 130,
        field : 'syncStatus'
    },
    {
        title : 'operate',
        width : 180,
        enWidth : 230,
        field : 'operate'
    }
];
// 散客改签审核列表表头
export const bulkAlterHead = [
    {
        title : 'orderId',
        width : 200,
        field : 'orderNo'
    },
    {
        title : 'orderDetailNo', // 订单明细编号
        width : 200,
        field : 'orderDetailNo'
    },
    {
        title : 'scenePlace',
        width : 150,
        field : 'orgName'
    },
    {
        title : 'playDate',
        minWidth : 150,
        field : 'originVisitDate',
        type : 'date'
    },
    {
        title : 'orderTime',
        minWidth : 200,
        field : 'createdTime'
    },
    {
        title : 'orderChannel',
        width : 130,
        enWidth : 150,
        field : 'orderChannel'
    },
    {
        title : 'orderOrg',
        width : 150,
        enWidth : 180,
        field : 'placeOrderOrgName'
    },
    {
        title : 'thirdOrderNo', // 第三方订单号
        width : 200,
        field : 'thirdOrderNo'
    },
    {
        title : 'pNameAndReverseNum', // 产品名称|预定数量
        width : 200,
        field : 'pNameAndReverseNum'
    },
    {
        title : 'unitPriceAndSubtotal', // 产品单价|小计金额
        width : 230,
        enWidth : 200,
        field : 'unitPriceAndSubtotal'
    },
    {
        title : 'visitorAndMobilePhone', // 游客|手机号
        width : 200,
        field : 'visitorAndMobilePhone'
    },
    {
        title : 'requestNum', // 申请数量
        width : 100,
        enWidth : 130,
        field : 'reqNum'
    },
    {
        title : 'visitDateAfterAlter', // 申请改签后游玩日期
        minWidth : 200,
        field : 'afterAlterDate',
        type : 'date'
    },
    {
        title : 'requestTime', // 申请时间
        width : 200,
        field : 'reqTime',
        type : 'dateTime'
    },
    {
        title : 'syncStatus', // 同步状态
        width : 100,
        enWidth : 130,
        field : 'syncStatus'
    },
    {
        title : 'operate',
        width : 180,
        enWidth : 230,
        field : 'operate'
    }
];

// 批量审核
export const batchAudit = [
    { label : 'passed', value : 'success' }, // 通过
    { label : 'reject', value : 'reject' }, // 驳回
];

// 散客订单--批量审核--订单列表表头
export const bulkBatchAuditHead = [
    {
        title : 'orderDetailNo', // 订单明细编号
        width : 210,
        field : 'orderDetailNo'
    },
    {
        title : 'orderOrg', // 下单企业
        minWidth : 130,
        enWidth : 180,
        field : 'placeOrderOrgName'
    },
    {
        title : 'productName',
        minWidth : 130,
        enWidth : 180,
        field : 'productName'
    },
    {
        title : 'requestNum', // 申请数量
        width : 100,
        enWidth : 130,
        field : 'reqNum'
    },
];
