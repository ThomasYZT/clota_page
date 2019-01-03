
//证件信息表头
export const idColumns = [
    {
        title : 'credentialsType',
        minwidth : 130,
        field : 'type'
    },{
        title : 'credentialsNumber', // 证件号
        minwidth : 130,
        field : 'data'
    },{
        title : 'operate',
        width : 130,
    },
];

//取票信息表头
export const ticketColumnData = [
    {
        title : 'productName',
        minwidth : 130,
        field : 'productName'
    },{
        title : 'playDate',
        minwidth : 130,
        field : 'playDate'
    },{
        title : 'settlePrice',
        width : 130,
        field : 'settlePrice'
    },{
        title : 'ticketGetterCredentials', // 取票证件
        width : 180,
        field : 'scenicOrgName'
    },{
        title : 'quantity',
        width : 130,
        field : 'takeNum'
    },
];
