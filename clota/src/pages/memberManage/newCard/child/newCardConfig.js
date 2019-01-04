// 新开业主卡 - 副卡列表表头
export const secondaryCardHead = [
    {
        title : 'index', // 序号
        width : 130,
        field : 'index'
    },
    {
        title : 'name',
        minWidth : 200,
        field : 'custName'
    },
    {
        title : 'mobilePhone',
        minWidth : 150,
        field : 'phoneNum',
    },
    {
        title : 'gender',
        minWidth : 120,
        enWidth : 130,
        field : 'gender'
    },
    {
        title : 'credentialsType', // 证件类型
        minWidth : 180,
        field : 'certificationType'
    },
    {
        title : 'identificationNum', // 证件编号
        minWidth : 180,
        field : 'idCardNumber'
    },
    {
        title : 'birthday',
        minWidth : 200,
        enWidth : 200,
        field : 'birthDay',
        type : 'date'
    },
    {
        title : 'payPass', // 支付密码
        minWidth : 150,
        field : 'tradePassword',
    },
    {
        title : 'operate',
        width : 80,
        enWidth : 110,
    }
];

// 新开业主卡 - 实体卡列表表头
export const entityCardHead = [
    {
        title : 'cardHolderName', // 持卡人姓名
        width : 140,
        field : 'custName'
    },
    {
        title : 'cardHolderIdNum', // 持卡人证件号
        minWidth : 180,
        field : 'idCardNumber'
    },
    {
        title : 'cardFaceNum', // 卡面号
        minWidth : 180,
        field : 'tpNo'
    },
    {
        title : 'physicalCardNo', // 物理卡号
        minWidth : 180,
        field : 'tpCardNo'
    },
    {
        title : 'operate',
        width : 120,
    }
];
