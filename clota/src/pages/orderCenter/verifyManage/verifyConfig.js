
//以取票串码查询的结果列表表头
export const orderTicketHead = [
    {
        title: '订单号',
        width: 215,
        field: 'orderNo'
    },
    {
        title: '游玩日期',
        minWidth: 120,
        field: 'visitDate'
    },
    {
        title: '下单时间',
        width: 190,
        field: 'orderTime'
    },
    {
        title: '所属景区',
        width: 200,
        field: 'scenic'
    },
    {
        title: '下单企业',
        width: 200,
        field: 'channel'
    },
    {
        title: '下单渠道',
        width: 130,
        enWidth : 180,
        field: 'orderChannel'
    },
    {
        title: '第三方订单号',
        width: 200,
        field: 'thirdOrderNo'
    },
    {
        title: '产品名称|预定数量',
        width: 200,
        field: 'productName|quantity'
    },
    {
        title: '产品单价|小计金额',
        width: 230,
        field: 'price|amount'
    },
    {
        title: '游客|手机号',
        width: 200,
        field: 'visitorName|phoneNumber'
    },
    /*{
        title: '审核状态',
        width: 130,
        enWidth : 180,
        field: 'verifyStatus'
    },*/
    {
        title: '取票串码',
        minWidth: 200,
        field: 'serialNo'
    },
    {
        title: '取票数量',
        width: 200,
        field: 'quantityPicked'
    },
    {
        title: '核销数量',
        width: 200,
        field: 'quantityVerified'
    },
    {
        title: '退票数量',
        width: 200,
        field: 'quantityRefunded'
    },
    {
        title: '改签数量',
        width: 200,
        field: 'quantityRescheduled'
    },
    {
        title: '短信发送状态',
        width: 130,
        enWidth : 180,
        field: 'smsStatus'
    },
    {
        title: '同步状态',
        width: 130,
        enWidth : 180,
        field: 'syncStatus'
    },
    {
        title: '操作',
        width: 100,
    }
];

//以核销串码查询的结果列表表头
export const orderVerifyHead = [
    {
        title: '订单号',
        width: 215,
        field: 'orderNo'
    },
    {
        title: '产品明细编号',
        width: 200,
        field: 'orderDetailNo'
    },
    {
        title: '游玩日期',
        minWidth: 190,
        field: 'visitDate'
    },
    {
        title: '下单时间',
        width: 190,
        field: 'orderTime'
    },
    {
        title: '所属景区',
        width: 200,
        field: 'scenic'
    },
    {
        title: '下单企业',
        width: 200,
        field: 'channel'
    },
    {
        title: '下单渠道',
        width: 130,
        enWidth : 180,
        field: 'orderChannel'
    },
    {
        title: '第三方订单号',
        width: 200,
        field: 'thirdOrderNo'
    },
    {
        title: '产品名称|预定数量',
        width: 200,
        field: 'productName|quantity'
    },
    {
        title: '产品单价|小计金额',
        width: 230,
        field: 'price|amount'
    },
    {
        title: '游客|手机号',
        width: 200,
        field: 'visitorName|phoneNumber'
    },
    {
        title: '串码',
        minWidth: 150,
        field: 'serialNo'
    },
    {
        title: '取票状态',
        width: 130,
        field: 'pickStatus'
    },
    {
        title: '核销状态',
        width: 130,
        field: 'verifyStatus'
    },
    {
        title: '退票状态',
        width: 130,
        field: 'refundStatus'
    },
    {
        title: '改签状态',
        width: 130,
        field: 'rescheduleStatus'
    },
    {
        title: '同步状态',
        width: 130,
        enWidth : 180,
        field: 'syncStatus'
    },
    {
        title: '操作',
        width: 100,
    }
];
