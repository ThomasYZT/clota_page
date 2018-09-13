
// 可游玩园区表头
export const parkColumn = [
    {
        title: 'parkName',      // 园区名称
        width: 160,
        field: 'parkName'
    },
    {
        title: 'verificationType',   // 核销方式
        minWidth: 150,
        field: 'saleType'
    },
    {
        title: 'playTotalNum',   // 项目游玩总次数
        minWidth: 130,
        field: 'itemCheckTimes'
    },
    {
        title: 'operate',       // 操作
        width: 150,
        field: ''
    },
];

//入园检票核销表头
export const distributeColumnHead = [
    {
        title: 'index',      // 序号
        width: 120,
        field: 'id'
    },
    {
        title: 'equipmentName',   // 设备名称
        minWidth: 150,
        field: 'name'
    },
    {
        title: 'status',   // 状态
        minWidth: 110,
        field: 'status'
    },
    {
        title: 'operate',       // 操作
        width: 100,
        field: ''
    },
];

//入园检票核销表头--查看
export const viewDistributeColumnHead = [
    {
        title: 'index',      // 序号
        width: 250,
        field: 'id'
    },
    {
        title: 'equipmentName',   // 设备名称
        minWidth: 250,
        field: 'name'
    },
];

//项目分组表头
export const proGroupColumnHead = [
    {
        title: 'index',      // 序号
        width: 70,
        field: 'id'
    },
    {
        title: 'projectName',   // 项目名称
        minWidth: 120,
        field: 'name'
    },
    {
        title: 'totalPlayTimes',   // 累计可游玩次数
        minWidth: 150,
        field: 'times'
    },
    {
        title: 'dayPlayTimes',   // 每日可游玩次数
        minWidth: 150,
        field: 'day'
    },
    {
        title: 'operate',       // 操作
        width: 100,
        field: ''
    },
];

