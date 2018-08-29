
//表头配置
export const columnData = [
    {
        title: '交易编号',
        width: 220,
        field: 'id'
    },
    {
        title: '转账金额',
        width: 120,
        field: 'amount'
    },
    {
        title: '类型',
        width: 80,
        field: 'operType'
    },
    {
        title: '手续费',
        width: 100,
        field: 'fee'
    },
    {
        title: '转出账户',
        minWidth: 200,
        field: 'orgName'
    },   {
        title: '转入账户',
        minWidth: 200,
        field: 'otherOrgName'
    },
    {
        title: '转账时间',
        width: 180,
        field: 'createdTime'
    },
    {
        title: '操作人',
        width: 100,
        field: 'operName'
    },
    {
        title: '备注',
        minWidth: 200,
        field: 'remark'
    },
];
