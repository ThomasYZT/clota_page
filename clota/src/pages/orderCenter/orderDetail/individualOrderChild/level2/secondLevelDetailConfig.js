
//产品明细表格配置
export const productDetailInfo = [
    {
        title: '产品明细编号',
        width: 215,
        field: 'id'
    },
    {
        title: '游玩日期',
        width: 200,
        field: 'visitDate'
    },
    {
        title: '取票状态',
        minWidth: 200,
        field: 'pickStatus'
    },
    {
        title: '核销状态',
        minWidth: 200,
        field: 'verifyStatus'
    },
    {
        title: '退票状态',
        minWidth: 150,
        field: 'refundStatus'
    },
    {
        title: '改签状态',
        minWidth: 150,
        field: 'rescheduleStatus'
    },
    {
        title: '串码',
        minWidth: 150,
        field: 'serialNo'
    },
    {
        title: '操作',
        minWidth: 120,
        field: ''
    }
]

//退票日志表格配置
export const refundAlterListHead = [
    {
        title: '申请退票数量',
        width: 215,
        field: 'reqNum'
    },
    {
        title: '操作员/时间',
        width: 250,
        field: ''
    },
    {
        title: '核定退票数量',
        minWidth: 200,
        field: 'passNum'
    },
    {
        title: '操作员/时间',
        minWidth: 250,
        field: ''
    },
    {
        title: '产品明细编号',
        minWidth: 150,
        field: 'passOrderTicketIds'
    }
];

//核销日志表格配置
export const verifyTicketLogListHead = [
    {
        title: '核销数量',
        field: 'reqNum'
    },
    {
        title: '操作员/时间',
        field: ''
    },
    {
        title: '产品明细编号',
        field: 'passOrderTicketIds'
    }
];
