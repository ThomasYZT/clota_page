// 业主卡/主副卡列表信息
export const columnData = [
    {
        title : 'name', // 姓名
        width : 177,
        field : 'custName'
    },
    {
        title : '电话',//电话
        minWidth : 177,
        field : 'phoneNum',
    },
    {
        title : '性别',//性别
        minWidth : 150,
        field : 'gender'
    },
    {
        title : 'credentialsType', // 证件类型
        minWidth : 150,
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
        title : '会员编号',//会员编号
        minWidth : 180,
        field : 'cardCode'
    },
    {
        title : '实体卡卡面号',//实体卡卡面号
        minWidth : 180,
        field : 'tpCardNo'
    },
    {
        title : 'physicalCardNo',//物理卡号
        minWidth : 180,
        field : 'tpNo'
    },
    {
        title : 'operate',
        width : 170,
    }
];
