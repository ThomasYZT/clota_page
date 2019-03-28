
//积分折扣率表头配置
export const columnData = [
    {
        title : 'memberTypes', // 会员类别
        minWidth : 100,
        enMinWidth : 213,
        field : 'typeName'
    },
    {
        title : 'levelSetting', // 会员级别
        minWidth : 100,
        enMinWidth : 160,
        field : 'levelName'
    },
    {
        title : 'integralScale', // 积分比例（人民币：积分数）
        minWidth : 227,
        enMinWidth : 400,
        field : 'scoreRate'
    },
    {
        title : 'discountRate', // 折扣率
        width : 100,
        enWidth : 160,
        field : 'discountRate'
    },
    {
        title : 'remark',
        minWidth : 100,
        enMinWidth : 300,
        field : 'remark'
    },
    {
        title : 'operate', // 操作
        width : 340,
        enWidth : 520,
    }
];


//活动积分折扣率表头配置
export const specialColumnData = [
    {
        title : 'memberTypes', // 会员类别
        minWidth : 160,
        enMinWidth : 205,
        field : 'typeName'
    },
    {
        title : 'levelSetting', // 会员级别
        minWidth : 120,
        enMinWidth : 160,
        field : 'levelName'
    },
    {
        title : 'integralScale', // 积分比例（人民币：积分数）
        minWidth : 230,
        enMinWidth : 400,
        field : 'scoreRate'
    },
    {
        title : 'discountRate', // 折扣率
        width : 100,
        enWidth : 160,
        field : 'discountRate'
    },
    {
        title : 'validityPeriod', // 有效期
        width : 230,
        enWidth : 230,
        field : ''
    },
    {
        title : 'remark',
        minWidth : 200,
        enMinWidth : 300,
        field : 'remark'
    },
    {
        title : 'operate', // 操作
        width : 340,
        enWidth : 520,
    }
];
