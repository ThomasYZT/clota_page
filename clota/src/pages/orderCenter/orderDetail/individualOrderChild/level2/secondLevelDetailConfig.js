
//产品明细表格配置
export const productDetailInfo = [
    {
        title : 'productDetailNo',
        width : 215,
        field : 'id'
    },
    {
        title : 'playDate',
        width : 150,
        field : 'visitDate',
        type : 'time'
    },
    {
        title : 'takeTicketStatus',
        minWidth : 100,
        enMinWidth : 130,
        field : 'pickStatus'
    },
    {
        title : 'verifyStatus',
        minWidth : 100,
        enMinWidth : 150,
        field : 'verifyStatus'
    },
    {
        title : 'refundStatus',
        minWidth : 150,
        enMinWidth : 160,
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
        title : 'operate',
        width : 120,
        field : ''
    }
];

//退票日志表格配置
export const refundAlterListHead = [
    {
        title : 'ApplyForRefundNum',
        minWidth : 215,
        enMinWidth : 265,
        field : 'reqNum'
    },
    {
        title : 'oparaterAndTime',
        width : 250,
        field : ''
    },
    {
        title : 'TicketRefundsApproved',
        minWidth : 200,
        field : 'passNum'
    },
    {
        title : 'AuoditorAndTime',
        minWidth : 250,
        field : ''
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
        field : ''
    },
    {
        title : 'productDetailNo',
        field : 'ticketIds'
    }
];
