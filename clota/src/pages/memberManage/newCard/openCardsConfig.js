// 批量开卡列表表头
export const batchEntityCardHead = [
    {
        title : 'index',    // 序号
        width : 100,
        field : 'index'
    },
    {
        title : 'cardFaceNum', // 卡面号
        minWidth : 180,
        field : 'cardFaceNum'
    },
    {
        title : 'physicalCardNo', // 物理卡号
        minWidth : 180,
        field : 'physicalCardNo'
    }
];

// 退卡、挂失、补卡、关联实体、会员卡续期 的列表表头
export const cardInfoHead = [
    {
        title : '',    // radio
        width : 100,
        field : ''
    },
    {
        title : 'memberNum', // 会员编号
        minWidth : 180,
        field : ''
    },
    {
        title : 'memberName', // 会员姓名
        minWidth : 150,
        field : ''
    },
    {
        title : 'IdentificationNumber', // 证件号码
        minWidth : 180,
        field : ''
    },
    {
        title : 'mobilePhone',
        minWidth : 150,
        field : 'phoneNum',
    },
    {
        title : '会员卡类型', // 会员卡类型
        minWidth : 150,
        field : ''
    },
];