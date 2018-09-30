//非部门查看员工账号表头
export const employee = [
    {
        title: 'department',//部门
        minWidth: 120,
        field: 'deptName',
        filters : true
    },
    {
        title: 'name',//姓名
        minWidth: 150,
        field: 'nickName',
        filters : true
    },
    {
        title: 'loginAccount',//登录账号
        minWidth: 130,
        field: 'loginName'
    },
];
//部门查看员工账号表头
export const depEmployee = [
    {
        title: 'empNo',//员工编号
        minWidth: 220,
        field: 'id',
    },
    {
        title: 'name',//姓名
        minWidth: 150,
        field: 'nickName',
    },
    {
        title: 'telephone',//电话
        minWidth: 150,
        field: 'phone'
    },
    {
        title: 'loginAccount',//登录账号
        minWidth: 130,
        field: 'loginName'
    },
];
