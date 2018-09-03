/**
 * 常量定义
 * @type {{}}
 */

export const configVariable = {
    //每页大小配置
    pageSizeConfig: [10, 20, 50],
    //默认每页大小
    pageDefaultSize: 10,
    //分页功能配置
    pageLayout : 'total, sizes, prev, pager, next, jumper'
};

//性别
export const genderEnum = [
    { name: 'male', desc: 'male' },
    { name: 'female', desc: 'female' },
];

//会员级别
export const vipLevel = [
    {'id': 'null', 'levelDesc': 'memberLevelAll'}
];

//会员渠道
export const vipChannel = [
    {'id': 'null', 'channelName': 'memberChannelAll'}
];

//会员类型
export const vipStatusEnum = [
    { name: 'null', desc: 'memberTypeAll' },
    { name: 'active', desc: 'memberTypeOfficial' },
    { name: 'potential', desc: 'memberTypePotential' },
];

//会员状态
export const cardStatusEnum = [
    { name: 'null', desc: 'memberStatusAll' },
    { name: 'frozen', desc: 'memberStatusFrozen' },
    { name: 'active', desc: 'memberStatusActive' },
];

//卡券类别
export const couponTypeList = [
    {
        label : 'cash_coupon',  // 代金券
        value : 'cash_coupon',
    },
    {
        label : 'exchange_coupon',  // 兑换券
        value : 'exchange_coupon',
    },
    {
        label : 'discount_coupon', // 折扣券
        value : 'discount_coupon',
    }
];

//交易类型
export const tradeType = [
    {
        label : 'transactionTypeAll',     // 全部交易类型
        value : 'all',
    },
    {
        label : 'transfer_out',     // 支出
        value : 'transfer_out',
    },
    {
        label : 'transfer_in',     // 收入
        value : 'transfer_in',
    },
];

//交易类型1
export const tradeType1 = [
    {
        label : 'transactionTypeAll',     // 全部交易类型
        value : 'all',
    },
    {
        label : 'recharge',     // 储值
        value : 'recharge',
    },
    {
        label : 'consume',     // 消费
        value : 'adjust_money',
    },
    {
        label : 'adjustMoney',     // 消费
        value : 'adjust_score',
    },
];
