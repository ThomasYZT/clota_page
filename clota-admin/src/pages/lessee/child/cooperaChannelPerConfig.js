//合作渠道（机构）表头配置
export const columns = {
    audit : [
        {
            title : '姓名',
            minWidth : 150,
            field : 'orgName'
        },
        {
            title : '性别',
            minWidth : 70,
            field : 'sex'
        },
        {
            title : '电话',
            minWidth : 140,
            field : 'telephone'
        },
        {
            title : '身份证号',
            minWidth : 200,
            field : 'certificateNumber'
        },
        {
            title : '主账号',
            minWidth : 100,
            field : 'managerAccount'
        },
        // {
        //     title : '身份证',
        //     minWidth : 150,
        //     field : 'attach'
        // },
        {
            title : '注册时间',
            width : 200,
            field : 'createdTime',
            type : 'dateTime'
        },
        {
            title : '操作',
            width : 100,
            field : 'operate'
        }
    ],
    'success' : [
        {
            title : 'ID',
            minWidth : 220,
            field : 'id',
        },
        {
            title : '姓名',
            minWidth : 150,
            field : 'orgName',
        },
        {
            title : '性别',
            minWidth : 80,
            field : 'sex'
        },
        {
            title : '电话',
            minWidth : 140,
            field : 'telephone'
        },
        {
            title : '身份证号',
            minWidth : 200,
            field : 'certificateNumber'
        },
        {
            title : '主账号',
            minWidth : 100,
            field : 'managerAccount'
        },
        // {
        //     title : '身份证',
        //     minWidth : 150,
        //     field : 'attach'
        // },
        {
            title : '注册时间',
            width : 200,
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
    ],
    'reject' : [
        {
            title : '姓名',
            minWidth : 150,
            field : 'orgName',
        },
        {
            title : '性别',
            minWidth : 70,
            field : 'sex'
        },
        {
            title : '电话',
            minWidth : 140,
            field : 'telephone'
        },
        {
            title : '身份证号',
            minWidth : 200,
            field : 'certificateNumber'
        },
        {
            title : '主账号',
            minWidth : 100,
            field : 'loginName'
        },
        // {
        //     title : '身份证',
        //     minWidth : 220,
        //     field : 'attach'
        // },
        {
            title : '注册时间',
            width : 200,
            field : 'createdTime',
            type : 'dateTime'
        },
        {
            title : '受理客服',
            minWidth : 150,
            field : 'businessAccount'
        },
        {
            title : '驳回原因',
            minWidth : 200,
            field : 'reason'
        },
        {
            title : '驳回时间',
            width : 200,
            field : 'auditTime'
        },
        {
            title : '操作',
            width : 100,
            field : 'operate'
        }
    ]
};
