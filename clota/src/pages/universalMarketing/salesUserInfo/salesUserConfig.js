// 销售用户信息列表表头
export const salesUserHead = [
    {
        title : 'userCode', // 用户编码
        minWidth : 130,
        field : 'id'
    },
    {
        title : 'userName', // 用户姓名
        minWidth : 130,
        field : 'name'
    },
    {
        title : 'userPhoneNumber', // 用户手机号
        width : 150,
        enWidth : 180,
        field : 'mobile'
    },
    {
        title : 'userInviteCode', // 用户邀请码
        minWidth : 130,
        field : 'inviteCode'
    },
    /*{
        title : '佣金总额', // 佣金总额
        width : 110,
        type : 'money',
        field : 'salary'
    },*/
    {
        title : 'totalMoney', // 累计销售额
        width : 130,
        type : 'money',
        field : 'saleAmount'
    },
    {
        title : 'marketType', // 营销类别
        minWidth : 130,
        field : 'typeName'
    },
    {
        title : 'marketingLevelName', // 营销等级名称
        minWidth : 130,
        field : 'levelName'
    },
    {
        title : 'signTime', // 注册时间
        width : 190,
        field : 'createdTime'
    },
    {
        title : 'operate',
        width : 80,
    }
];
