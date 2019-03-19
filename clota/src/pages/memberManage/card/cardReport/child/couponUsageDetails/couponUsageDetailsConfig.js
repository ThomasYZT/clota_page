//已兑换表头
export const redeemedTableHead = [
    {
        title : 'changer',
        minWidth : 150,
        field : 'custName',
    },
    {
        title : 'chargerPhoneNum',
        minWidth : 150,
        field : 'phoneNum',
    },
    {
        title : 'changeTime', //兑换时间
        minWidth : 150,
        field : '',
    },
    {
        title : 'useTime',
        minWidth : 150,
        field : 'useTime',
    },
];

//已领取表头
export const receivedTableHead = [
    {
        title : 'recipient',
        minWidth : 150,
        field : 'custName',
    },
    {
        title : 'recipientPhoneNum',
        minWidth : 150,
        field : 'phoneNum',
    },
    {
        title : 'recieveTime',
        minWidth : 150,
        field : 'gainTime',
    },
    {
        title : 'useTime',
        minWidth : 150,
        field : 'useTime',
    },
];

//已使用表头
export const usedTableHead = [
    {
        title : 'recipient&charger',
        minWidth : 150,
        field : 'custName',
    },
    {
        title : 'recipient&chargerPhone',
        minWidth : 150,
        field : 'phoneNum',
    },
    {
        title : 'gain&charge',
        minWidth : 150,
        field : '',
    },
    {
        title : 'charge&gainTime',
        minWidth : 150,
        field : 'gainTime',
    },
    {
        title : 'useTime',
        minWidth : 150,
        field : 'useTime',
    },
];

//未使用表头
export const noUseTableHead = [
    {
        title : 'recipient&charger',
        minWidth : 150,
        field : 'custName',
    },
    {
        title : 'recipient&chargerPhone',
        minWidth : 150,
        field : 'phoneNum',
    },
    {
        title : 'gain&charge',
        minWidth : 150,
        field : '',
    },
    {
        title : 'charge&gainTime',
        minWidth : 150,
        field : 'gainTime',
    },
    {
        title : 'useOrNot',
        minWidth : 150,
        field : 'useTime',
    },
];

//已过期表头
export const expiredTableHead = [
    {
        title : 'recipient&charger',
        minWidth : 150,
        field : '',
    },
    {
        title : 'recipient&chargerPhone',
        minWidth : 150,
        field : '',
    },
    {
        title : 'gain&charge',
        minWidth : 150,
        field : '',
    },
    {
        title : 'charge&gainTime',
        minWidth : 150,
        field : '',
    },
    {
        title : 'useOrNot',
        minWidth : 150,
        field : '',
    },
];
