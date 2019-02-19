
//以取票串码查询的结果列表表头
export const orderTicketHead = [
    {
        title : 'orderId', // 订单号
        width : 215,
        field : 'orderNo'
    },
    {
        title : 'playDate', // 游玩日期
        minWidth : 120,
        field : 'visitDate'
    },
    {
        title : 'orderTime', // 下单时间
        width : 190,
        field : 'orderTime'
    },
    {
        title : 'scenePlace', // 所属景区
        width : 200,
        field : 'scenic'
    },
    {
        title : 'orderOrg', // 下单企业
        width : 200,
        field : 'channel'
    },
    {
        title : 'orderChannel', // 下单渠道
        width : 130,
        enWidth : 180,
        field : 'orderChannel'
    },
    {
        title : 'thirdOrderNo', // 第三方订单号
        width : 200,
        enWidth : 220,
        field : 'thirdOrderNo'
    },
    {
        title : 'pNameAndReverseNum', // 产品名称|预定数量
        width : 200,
        enWidth : 270,
        field : 'productName|quantity'
    },
    {
        title : 'unitPriceAndSubtotal', // 产品单价|小计金额
        width : 230,
        enWidth : 280,
        field : 'price|amount'
    },
    {
        title : 'visitorAndMobilePhone', // 游客|手机号
        width : 200,
        enWidth : 270,
        field : 'visitorName|phoneNumber'
    },
    /*{
        title: '审核状态',
        width: 130,
        enWidth : 180,
        field: 'verifyStatus'
    },*/
    {
        title : 'ticketGetterSN', // 取票串码
        minWidth : 200,
        enWidth : 225,
        field : 'serialNo'
    },
    {
        title : 'ticketPickNum', // 取票数量
        width : 200,
        enWidth : 290,
        field : 'quantityPicked'
    },
    {
        title : 'verificationNum', // 核销数量
        width : 200,
        enWidth : 340,
        field : 'quantityVerified'
    },
    {
        title : 'quantityRefunded', // 退票数量
        width : 200,
        enWidth : 224,
        field : 'quantityRefunded'
    },
    {
        title : 'quantityRescheduled', // 改签数量
        width : 200,
        enWidth : 250,
        field : 'quantityRescheduled'
    },
    {
        title : 'smsStatus', // 短信发送状态
        width : 130,
        enWidth : 180,
        field : 'smsStatus'
    },
    {
        title : 'syncStatus', // 同步状态
        width : 130,
        enWidth : 200,
        field : 'syncStatus'
    },
    {
        title : 'operate',
        width : 100,
        enWidth : 120,
    }
];

//以核销串码查询的结果列表表头
export const orderVerifyHead = [
    {
        title : 'orderId',
        width : 215,
        field : 'orderNo'
    },
    {
        title : 'productDetailNo', // 产品明细编号
        width : 200,
        field : 'id'
    },
    {
        title : 'playDate',
        minWidth : 190,
        field : 'visitDate'
    },
    {
        title : 'orderTime',
        width : 190,
        field : 'orderTime'
    },
    {
        title : 'scenePlace', // 所属景区
        width : 200,
        field : 'scenic'
    },
    {
        title : 'orderOrg',
        width : 200,
        field : 'channel'
    },
    {
        title : 'orderChannel',
        width : 130,
        enWidth : 180,
        field : 'orderChannel'
    },
    {
        title : 'thirdOrderNo',
        width : 200,
        enWidth : 210,
        field : 'thirdOrderNo'
    },
    {
        title : 'pNameAndReverseNum',
        width : 200,
        enWidth : 260,
        field : 'productName|quantity'
    },
    {
        title : 'unitPriceAndSubtotal',
        width : 230,
        enWidth : 280,
        field : 'price|amount'
    },
    {
        title : 'visitorAndMobilePhone',
        width : 200,
        enWidth : 280,
        field : 'visitorName|phoneNumber'
    },
    {
        title : 'SN',
        minWidth : 150,
        enWidth : 250,
        field : 'serialNo'
    },
    {
        title : 'takeTicketStatus', // 取票状态
        width : 130,
        enWidth : 310,
        field : 'pickStatus'
    },
    {
        title : 'verifyStatus', // 核销状态
        width : 130,
        enWidth : 220,
        field : 'verifyStatus'
    },
    {
        title : 'refundStatus', // 退票状态
        width : 130,
        enWidth : 230,
        field : 'refundStatus'
    },
    {
        title : 'rescheduleStatus', // 改签状态
        width : 130,
        enWidth : 135,
        field : 'rescheduleStatus'
    },
    {
        title : 'syncStatus', // 同步状态
        width : 130,
        enWidth : 195,
        field : 'syncStatus'
    },
    {
        title : 'operate',
        width : 100,
        enWidth : 120,
    }
];

//取票状态列表
export const pickTicketStatusList = [
    {
        label : 'haveTickets', //已取票
        value : 'true'
    },
    {
        label : 'noHaveTickets', //未取票
        value : 'false'
    },
];

//核销状态列表
export const verifyStatus = [
    {
        label : 'consumed', //已核销
        value : 'true'
    },
    {
        label : 'noConsumed', //未核销
        value : 'false'
    },
];
