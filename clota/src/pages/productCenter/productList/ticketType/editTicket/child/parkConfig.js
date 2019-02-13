
// 可游玩园区表头
export const parkColumn = [
    {
        title : 'parkName', // 园区名称
        width : 200,
        field : 'parkName'
    },
    {
        title : 'verificationType', // 核销方式
        Width : 200,
        field : 'saleType'
    },
    {
        title : 'operate', // 操作
        width : 150,
        field : ''
    },
];

//入园检票核销表头
export const distributeColumnHead = [
    {
        title : 'index', // 序号
        width : 120,
        enWidth : 150,
        field : 'id'
    },
    {
        title : 'equipmentName', // 设备名称
        minWidth : 150,
        field : 'channelName'
    },
    {
        title : 'status', // 状态
        minWidth : 110,
        field : 'status'
    },
    {
        title : 'operate', // 操作
        width : 100,
        enWidth : 130,
        field : ''
    },
];

//入园检票核销表头--查看
export const viewDistributeColumnHead = [
    {
        title : 'index', // 序号
        width : 250,
        field : 'id'
    },
    {
        title : 'equipmentName', // 设备名称
        minWidth : 250,
        field : 'channelName'
    },
];

//项目分组表头
export const proGroupColumnHead = [
    {
        title : 'index', // 序号
        width : 100,
        field : 'id'
    },
    {
        title : 'projectName', // 项目名称
        minWidth : 120,
        field : 'channelName'
    },
    {
        title : 'totalPlayTimes', // 累计可游玩次数
        minWidth : 150,
        field : 'sumTimes'
    },
    {
        title : 'dayPlayTimes', // 每日可游玩次数
        minWidth : 150,
        field : 'dayTimes'
    },
    {
        title : 'operate', // 操作
        width : 100,
        field : ''
    },
];

