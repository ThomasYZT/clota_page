

//运维操作日志表头
export const operationLogHead = [
    {
        title : '操作时间',
        minWidth : 130,
        field : 'sysCreatedTime'
    },
    {
        title : '账号',
        minWidth : 100,
        field : 'loginName'
    },
    {
        title : '操作类型',
        minWidth : 100,
        field : 'sysOperationScene'
    },
    {
        title : '操作对象',
        minWidth : 100,
        field : 'sysTargetName'
    },
    {
        title : '操作内容',
        minWidth : 300,
        field : 'sysContents'
    },
];
//saas操作日志表头
export const saasLogHead = [
    {
        title : '操作时间',
        minWidth : 130,
        field : 'createdTime'
    },
    {
        title : '账号',
        minWidth : 100,
        field : 'loginName'
    },
    {
        title : '操作类型',
        minWidth : 100,
        field : 'operationStatus'
    },
    {
        title : '操作对象',
        minWidth : 100,
        field : 'targetName'
    },
    {
        title : '操作内容',
        minWidth : 300,
        field : 'contents'
    },
];
