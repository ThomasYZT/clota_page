

export const levelListHead = [
    {
        title : 'levelCode', // 等级编码
        minWidth : 215,
        field : 'id'
    },
    // {
    //     title : 'memberGrade', // 会员等级
    //     minWidth : 110,
    //     field : 'levelNum'
    // },
    {
        title : 'levelSetting', // 会员级别
        minWidth : 140,
        field : 'levelNum'
    },
    {
        title : 'memberCardName', // 会员卡名称
        minWidth : 140,
        enMinWidth : 190,
        field : 'levelDesc'
    },
    //会员4期暂时去掉
    // {
    //     title : '功能', // 功能
    //     minWidth : 150,
    //     field : 'channelName'
    // },
    {
        title : 'growthRange', // 成长值范围
        minWidth : 150,
        field : 'growThScope'
    },
    {
        title : 'cardSaleMoneyWithUnit', // 售卡金额（元）
        minWidth : 150,
        enMinWidth : 210,
        field : 'salePrice',
        type : 'money'
    },
    {
        title : 'cardBalanceWithUnit', // 卡内余额（元）
        minWidth : 150,
        enMinWidth : 210,
        field : 'amountInCard',
        type : 'money'
    },
    {
        title : 'validityPeriod', // validityPeriod
        minWidth : 150,
        field : 'salePrice',
        type : 'money'
    },
    {
        title : 'remark', // 备注
        minWidth : 280,
        field : 'remark'
    },
    {
        title : 'operate', // 操作
        minWidth : 140,
        enMinWidth : 160,
        field : ''
    },
];
