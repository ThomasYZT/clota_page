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
        value: 'true'
    },
    {
        label: 'no',//否
        value: 'false'
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
        label: 'identity',//身份证
        value: 'identity'
    },
    {
        label: 'passport',//护照
        value: 'passport'
    },
    {
        label: 'driver',//驾照
        value: 'driver'
    },
    {
        label: 'officer',//军官证
        value: 'officer'
    },
    {
        label: 'police',//警官证
        value: 'police'
    }
];

//限制库存
export const limitStore = [
    {
        label: 'everyday',//限制每日库存
        value: 'everyday'
    },
    {
        label: 'total',//限制库存总量
        value: 'total'
    },
    {
        label: 'is_no_limit',//不限库存
        value: 'is_no_limit'
    }
];

//产品有效性设置
export const productEffectSet = [
    {
        label: 'since_the_play',//自游玩之日起M天有效
        value: 'since_the_play'
    },
    {
        label: 'same_to_policy',//同销售政策适用游玩期限
        value: 'same_to_policy'
    },
];

//售票方式
export const saleType = [
    {
        label: 'one_ticket',//一票制
        value: 'one_ticket'
    },
    {
        label: 'assort',//多票制
        value: 'assort'
    },
];

//认证方式
export const authenticationType = [
    {
        label: 'fingerprint',//指纹验证
        value: 'fingerprint'
    },
];

// 批量操作 - 组织架构（合作伙伴、自营渠道）
export const batchOperate = [
    {
        label: 'commissioned',   // 启用
        value: 'valid',
        status: 'invalid',
    },
    {
        label: 'disabled',   // 禁用
        value: 'invalid',
        status: 'valid'
    },
    {
        label: 'del',   // 删除
        value: 'del',
        status: 'del',
    },
];

//销售渠道批量操作
export const saleOperateBatch = [
    {
        label : 'toOtherGroup',   // 移至其它分组
        value : 'toOtherGroup'
    },
    {
        label : 'outGroup',     // 移出分组
        value : 'outGroup'
    }
];

//政策可售期
export const policyValidity = [
    {
        label : 'playBeforeSold',//游玩日期之前 N 天可售
        value : 'playBeforeSold'
    },
    {
        label : 'specifiedPeriodSold',//指定期间可售
        value : 'specifiedPeriodSold'
    },
    {
        label: 'specifiedDateSold',//指定日期方案
        value : 'specifiedDateSold'
    }
];

//游玩期限
export const playDeadline = [
    {
        label : 'specifiedPeriodPlay',//指定期间可玩
        value : 'specifiedPeriodSold'
    },
    {
        label: 'customPlay',//自定义可玩日期
        value : 'specifiedDateSold'
    }
];


//退票规则
export const returnRule = [
    {
        label : 'notAllow',//不允许退票
        value : 'notAllow'
    },
    {
        label : 'needAudit',//允许退票并需要审核
        value : 'needAudit'
    },
    {
        label: 'noAudit',//允许退票不需要审核
        value : 'noAudit'
    }
];


//改签规则
export const alterRule = [
    {
        label : 'notAllow',//不允许改签
        value : 'notAllow'
    },
    {
        label : 'needAudit',//允许改签并需要审核
        value : 'needAudit'
    },
    {
        label: 'noAudit',//允许改签不需要审核
        value : 'noAudit'
    }
];

//指定日期-节假日
export const specialHoliday = [
    {
        holidayName : 'custom',//自定义
        id : 'custom'
    },
];

//订单类型
export const orderType = [
    {
        label : 'team',//团队
        value : 'team'
    },
    {
        label : 'Fit',//散客
        value : 'individual'
    },
];

//取票状态
export const takeTicketStatusList = [
    {
        label : 'all',
        value : 'allStatus' //全部状态
    },
    {
        label : 'noHaveTickets',    //未取票
        value : 'none'
    },
    {
        label : 'haveSomeTickets',     //部分取票
        value : 'some'
    },
    {
        label : 'haveAllTickets',     //全部取票
        value : 'all'
    }
];
//退票状态
export const refundStatusList = [
    {
        label : 'all',
        value : 'allStatus' //全部状态
    },
    {
        label : 'waitChecking',     //待审核
        value : 'wait'
    },
    {
        label : 'order.no_refund',      //未退票
        value : 'none'
    },
    {
        label : 'someRefund',       //部分退票
        value : 'some'
    },
    {
        label : 'someRefund',       //全部退票
        value : 'all'
    }
];

//改签状态
export const rescheduleStatus = [
    {
        label : 'all',
        value : 'allStatus' //全部状态
    },
    {
        label : 'waitChecking',     //待审核
        value : 'wait'
    },
    {
        label : 'order.no_alter',   //未改签
        value : 'none'
    },
    {
        label : 'someAlter', //部分改签
        value : 'some'
    },
    {
        label : 'allAlter',     //全部改签
        value : 'all'
    }
];

//同步状态
export const synchronizationList = [
    {
        label : 'all',
        value : 'allStatus'
    },
    {
        label : 'syncSucceed',      // 同步成功
        value : 'success'
    },
    {
        label : 'syncFailed',     // 同步失败
        value : 'failure'
    }
];

//核销状态列表
export const verifyStatusList  = [
    {
        label : 'all',
        value : 'allStatus' //全部状态
    },
    {
        label : 'noConsumed',   //未核销
        value : 'none'
    },
    {
        label : 'someVerified',     //部分核销
        value : 'some'
    },
    {
        label : 'allVerified',     //全部核销
        value : 'all'
    }
];

// 下单渠道--分销商下的下单渠道
export const distributorChannelList = [
    {
        label : 'all',
        value : 'allStatus'
    },
    {
        label : 'OTA',//ota
        value : 'OTA'
    },
    {
        label : 'tour',//旅行社
        value : 'tour'
    },
    {
        label : 'scenic',//景区
        value : 'scenic'
    }
];

// 下单渠道--非分销商下的下单渠道
export const notDistributorChannelList = [
    {
        label : 'all',
        value : 'allStatus'
    },
    {
        label : 'market',//全民营销
        value : 'market'
    },
    {
        label : 'OTA',//ota
        value : 'OTA'
    },
    {
        label : 'tour',//旅行社
        value : 'tour'
    },
    {
        label : 'scenic',//景区
        value : 'scenic'
    }
];

//审核状态列表
export const auditStatusList = [
    {
        label : 'all',
        value : 'allStatus'
    },
    {
        label : 'audited',//已审核
        value : 'true'
    },
    {
        label : 'notAudited',//未审核
        value : 'false'
    }
];

//支付状态列表
export const payStatusList = [
    {
        label : 'all',
        value : 'allStatus'
    },
    {
        label : 'paid',//已支付
        value : 'true'
    },
    {
        label : 'unPaid',//未支付
        value : 'false'
    }
];

//短信发送状态
export const smsStatusList = [
    {
        label : 'waitingSend',  // 待发送
        value : 'wait'
    },
    {
        label : 'success',  // 成功
        value : 'success'
    },
    {
        label : 'failure',  // 失败
        value : 'failure'
    },
    {
        label : 'isRending',  // 发送中
        value : 'doing'
    },
];
//开、腿、补卡类型列表
export const  tradeTypeList = [
    {
        label : 'all',
        value : 'all'
    },
    {
        label : '开卡记录',
        value : 'open_card，batch_open_card-batch_open_card'
    },
    {
        label : '补卡记录',
        value : 'reissue_card'
    },
    {
        label : '退卡记录',
        value : 'return_card'
    },
    {
        label : '储值',
        value : 'recharge'
    }
];
