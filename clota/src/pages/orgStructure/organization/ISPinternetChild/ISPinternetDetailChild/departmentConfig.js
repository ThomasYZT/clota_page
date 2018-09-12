//非部门查看员工账号表头
export const employee = [
    {
        title: '部门',
        minWidth: 120,
        field: 'orgName',
        filters : true
    },
    {
        title: '姓名',
        minWidth: 150,
        field: 'nickName',
        filters : true
    },
    {
        title: '登录账号',
        minWidth: 130,
        field: 'loginName'
    },
];
//部门查看员工账号表头
export const depEmployee = [
    {
        title: '员工编号',
        minWidth: 200,
        field: 'id',
    },
    {
        title: '姓名',
        minWidth: 150,
        field: 'nickName',
    },
    {
        title: '电话',
        minWidth: 130,
        field: 'phone'
    },
    {
        title: '登录账号',
        minWidth: 130,
        field: 'loginName'
    },
    {
        title: '角色权限',
        minWidth: 130,
        field: 'roleName'
    },
];