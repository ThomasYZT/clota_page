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
    {
        label : 'to_cash',     // 兑现
        value : 'to_cash',
    },
    {
        label : 'return_order',     // 撤销扣款
        value : 'return_order',
    },
];

// 资金交易类型
export const moneyTradeTypes = [
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
        value : 'consume',
    },
    {
        label : 'adjustMoney',     // 调整
        value : 'adjust_money',
    },
    {
        label : 'to_cash',     // 兑现
        value : 'to_cash',
    },
    {
        label : 'transfer_out_reduce',     // 转出
        value : 'transfer_out',
    },
    {
        label : 'transfer_in_add',     // 转入
        value : 'transfer_in',
    },
    {
        label : 'return_order',     // 撤销扣款
        value : 'return_order',
    },
];
//月份枚举
export const monthEnum = [
    {
        label : 'month',
        value : 1
    },
    {
        label : 'month',
        value : 2
    },
    {
        label : 'month',
        value : 3
    },
    {
        label : 'month',
        value : 4
    },
    {
        label : 'month',
        value : 5
    },
    {
        label : 'month',
        value : 6
    },
    {
        label : 'month',
        value : 7
    },
    {
        label : 'month',
        value : 8
    },
    {
        label : 'month',
        value : 9
    },
    {
        label : 'month',
        value : 10
    },
    {
        label : 'month',
        value : 11
    },
    {
        label : 'month',
        value : 12
    }
];

//款台类型
export const cashierType = [
    {
        label: 'verifyCashierType',//核销款台
        value: 'check'
    },
    {
        label: 'verifySaleType',//销售款台
        value: 'sale'
    },
    {
        label: 'verifySaleAndCashierType',//核销/销售一体款台
        value: 'combine'
    },
];
//节点类型
export const nodeList = [
    {
        label: 'company',//公司
        value: 'company'
    },
    {
        label: 'department',//部门
        value: 'department'
    },
    {
        label: 'scene',//景区
        value: 'scene'
    },
    {
        label: 'cashier',//款台
        value: 'cashier'
    }
];

//是否团队产品
export const isTeamProduct = [
    {
        label: 'yes',//是
        value: 'yes'
    },
    {
        label: 'no',//否
        value: 'no'
    },
];

//预定时提交游客身份信息
export const orderInfo = [
    {
        label: 'noRequired',//无需提交身份信息
        value: 'noRequired'
    },
    {
        label: 'moreTicket',//每个证件可预订多张票
        value: 'more'
    },
    {
        label: 'oneTicket',//每个证件只能预订一张票
        value: 'one'
    }
];

//证件类型
export const idType = [
    {
        label: 'idCard',//身份证
        value: 'identity'
    },
    {
        label: 'passport',//护照
        value: 'passport'
    },
    {
        label: 'drivingLicense',//驾照
        value: 'driver'
    },
    {
        label: 'officersCert',//军官证
        value: 'officer'
    },
    {
        label: 'policeCert',//警官证
        value: 'police'
    }
];

//限制库存
export const limitStore = [
    {
        label: 'limitDay',//限制每日库存
        value: 'everyday'
    },
    {
        label: 'limitTotal',//限制库存总量
        value: 'total'
    },
    {
        label: 'noLimit',//不限库存
        value: 'is_no_limit'
    }
];

//产品有效性设置
export const productEffectSet = [
    {
        label: 'dayToStart',//自游玩之日起X天有效
        value: 'dayToStart'
    },
    {
        label: 'toPolicy',//同销售政策适用游玩期限
        value: 'toPolicy'
    },
];

//售票方式
export const saleType = [
    {
        label: 'one_ticket',//一票制
        value: 'one'
    },
    {
        label: 'more_ticket',//多票制
        value: 'more'
    },
];

//认证方式
export const authenticationType = [
    {
        label: 'fingerprint',//指纹验证
        value: 'fingerprint'
    },
];

