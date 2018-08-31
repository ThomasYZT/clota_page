
//表头配置
export const columnData = [
    {
        title: 'memberNum',  // 会员编号
        width: 220,
        field: 'id'
    },
    {
        title: 'memberName',  // 会员姓名
        minWidth: 100,
        enMinWidth: 200,
        field: 'custName'
    },
    {
        title: 'mobilePhone',   // 手机号
        width: 140,
        field: 'phoneNum'
    },
    {
        title: 'gender',    // 性别
        width: 80,
        enWidth: 100,
        field: 'serverName'
    },
    {
        title: 'transactionType',  // 交易类型
        minWidth: 130,
        enMinWidth: 200,
        field: 'operationType'
    },
    {
        title: 'accountType',  // 账户类型
        width: 140,
        field: 'accountTypeName'
    },
    {
        title: 'transactionAmountThisTime',    // 本次交易金额
        minWidth: 170,
        enMinWidth: 280,
        field: 'serverName'
    },
    {
        title: 'accBalanceAfterTransaction',   // 交易后账户余额
        minWidth: 150,
        enMinWidth: 280,
        field: 'endingBalance'
    },
    {
        title: 'transactionTime',  // 交易时间
        width: 200,
        field: 'createdTime'
    },
    {
        title: 'operatorRecord',    // 操作人员记录
        width: 140,
        enWidth: 160,
        field: 'operName'
    }
];
