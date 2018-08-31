
//表头配置
export const columnData = [
    {
        title: 'transactionNum',  // 交易编号
        width: 220,
        field: 'id'
    },
    {
        title: 'transToAccAmount',      // 转账金额
        width: 120,
        field: 'amount'
    },
    {
        title: 'type',        // 类型
        width: 80,
        field: 'operType'
    },
    {
        title: 'fee',       // 手续费
        width: 100,
        field: 'fee'
    },
    {
        title: 'transferAccount',      // 转出账户
        minWidth: 200,
        field: 'orgName'
    },   {
        title: 'transferToAccount',      // 转入账户
        minWidth: 200,
        field: 'otherOrgName'
    },
    {
        title: 'transferTime',      // 转账时间
        width: 200,
        field: 'createdTime'
    },
    {
        title: 'operator',       // 操作人
        width: 100,
        field: 'operName'
    },
    {
        title: 'remark',
        minWidth: 200,
        field: 'remark'
    },
];
