
//导游表头
export const tourColumnData = [
    {},
    {
        title : 'tourGuideName', // 导游姓名
        minwidth : 200,
        field : 'staffName'
    },
    {
        title : 'identityNo', // 身份证号
        minwidth : 200,
        field : 'documentNo'
    },
    {
        title : 'mobilePhone',
        width : 160,
        field : 'phoneNumber'
    },
    {
        title : 'operate',
        width : 130,
    },
];

//司机表头
export const driverColumnData = [
    {},
    {
        title : 'name',
        minwidth : 200,
        field : 'staffName'
    },
    {
        title : 'licence', // 车牌号
        minwidth : 200,
        field : 'documentNo'
    },
    {
        title : 'operate',
        width : 130,
    },
];
