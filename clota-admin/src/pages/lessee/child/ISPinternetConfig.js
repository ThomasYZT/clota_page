//租户表头配置
export const columns = [
    {
        title : 'ID',
        minWidth : 215,
        field : 'id'
    },
    {
        title : '编码',
        minWidth : 140,
        field : 'nodeCode'
    },
    {
        title : '租户名称',
        minWidth : 170,
        field : 'orgName'
    },
    {
        title : '节点类型',
        minWidth : 100,
        field : 'nodeType'
    },
    {
        title : '所属集团/公司',
        minWidth : 150,
        field : 'parentOrgName'
    },
    {
        title : '最近到期服务',
        minWidth : 170,
        field : 'dueService'
    },
    {
        title : '是否启用',
        minWidth : 100,
        field : 'status'
    },
    // {
    //     title : '受理客服',
    //     minWidth : 100,
    //     field : 'businessAccount'
    // },
    {
        title : '企业秘钥',
        minWidth : 310,
        field : 'secretCode'
    },
    {
        title : '操作',
        width : 130,
        field : 'operate'
    }
];
