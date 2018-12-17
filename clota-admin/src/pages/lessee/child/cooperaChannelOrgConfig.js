//合作渠道（机构）表头配置
export const columns = [
    {
        title : '公司ID',
        minWidth : 220,
        field : 'id',
    },
    {
        title : '合作渠道名称',
        minWidth : 130,
        field : 'orgName'
    },
    {
        title : '联系人',
        minWidth : 100,
        field : 'linkName'
    },
    {
        title : '电话',
        minWidth : 150,
        field : 'telephone'
    },
    {
        title : '社会信用代码',
        minWidth : 200,
        field : 'certificateNumber'
    },
    {
        title : '管理账号',
        minWidth : 100,
        field : 'managerAccount'
    },
    {
        title : '注册时间',
        minWidth : 200,
        field : 'createdTime',
        type : 'dateTime'
    },
    {
        title : '受理客服',
        minWidth : 150,
        field : 'businessAccount'
    },
    {
        title : '操作',
        width : 100,
        field : 'operate'
    }
];
