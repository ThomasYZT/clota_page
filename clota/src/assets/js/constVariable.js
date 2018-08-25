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
    { name: 'male', desc: '男' },
    { name: 'female', desc: '女' },
];

//会员级别
export const vipLevel = [
    {'id': 'null', 'levelDesc': '全部会员等级'}
];

//会员渠道
export const vipChannel = [
    {'id': 'null', 'channelName': '全部会员渠道'}
];

//会员类型
export const vipStatusEnum = [
    { name: 'null', desc: '全部会员类型' },
    { name: 'active', desc: '正式会员' },
    { name: 'potential', desc: '潜在会员' },
];

//会员状态
export const cardStatusEnum = [
    { name: 'all', desc: '全部会员状态' },
    { name: 'frozen', desc: '已冻结' },
    { name: 'active', desc: '正常使用' },
];

//卡券类别
export const couponTypeList = [
    {
        label : '代金券',
        value : 'cash_coupon',
    },
    {
        label : '兑换券',
        value : 'exchange_coupon',
    },
    {
        label : '折扣券',
        value : 'discount_coupon',
    }
];

//交易类型
export const tradeType = [
    {
        label : '全部交易类型',
        value : 'all',
    },
    {
        label : '支出',
        value : 'transfer_out',
    },
    {
        label : '收入',
        value : 'transfer_in',
    },
];

//交易类型1
export const tradeType1 = [
    {
        label : '全部交易类型',
        value : 'all',
    },
    {
        label : '储值',
        value : 'transfer_out',
    },
    {
        label : '消费',
        value : 'transfer_in',
    },
];
