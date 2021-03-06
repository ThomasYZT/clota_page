
//产品明细表格配置
export const productDetailInfo = [
    {
        title : 'check',
        width : 80,
        field : 'check'
    },
    {
        title : 'productDetailNo',
        width : 215,
        field : 'id'
    },
    {
        title : 'playDate',
        width : 150,
        field : 'visitDate',
        type : 'date'
    },
    {
        title : 'takeTicketStatus',
        minWidth : 100,
        field : 'pickStatus'
    },
    {
        title : 'verifyStatus',
        minWidth : 100,
        field : 'verifyStatus'
    },
    {
        title : 'refundStatus',
        minWidth : 150,
        field : 'refundStatus'
    },
    {
        title : 'rescheduleStatus',
        minWidth : 150,
        field : 'rescheduleStatus'
    },
    {
        title : 'SN',
        minWidth : 200,
        field : 'serialNo'
    },
    {
        title : 'syncStatus',
        minWidth : 120,
        field : 'syncStatus'
    },
    {
        title : 'operate',
        minWidth : 120,
        field : 'operate'
    }
];

//退票日志表格配置
export const refundAlterListHead = [
    {
        title : 'ApplyForRefundNum',
        width : 215,
        field : 'reqNum'
    },
    {
        title : 'oparaterAndTime',
        width : 250,
        field : 'oparaterAndTime'
    },
    {
        title : 'TicketRefundsApproved',
        minWidth : 200,
        field : 'passNum'
    },
    {
        title : 'AuoditorAndTime',
        minWidth : 250,
        field : 'AuoditorAndTime'
    },
    {
        title : 'productDetailNo',
        minWidth : 200,
        field : 'passOrderTicketIds'
    }
];

//核销日志表格配置
export const verifyTicketLogListHead = [
    {
        title : 'verificationNum',
        field : 'verifyNum'
    },
    {
        title : 'operatorAndTime',
        field : 'operatorAndTime'
    },
    {
        title : 'productDetailNo',
        field : 'ticketId'
    }
];
