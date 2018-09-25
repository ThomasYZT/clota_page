

export const infoListHead = [
    {
        title: 'memberCode',
        width: 250,
        field: 'cardCode'
    },
    {
        title: 'memberName',
        minWidth: 160,
        field: 'custName'
    },
    {
        title: 'phoneNum',
        minWidth: 150,
        field: 'phoneNum'
    },
    {
        title: 'gender',
        minWidth: 80,
        enMinWidth : 100,
        field: 'gender'
    },
    {
        title: 'levelSetting',
        minWidth: 100,
        enMinWidth : 150,
        field: 'levelDesc'
    },
    {
        title: 'memberType',
        minWidth: 170,
        field: 'status'
    },
    {
        title: 'pointBalance',
        minWidth: 100,
        enMinWidth : 200,
        field: 'pointBalance'
    },
    {
        title: 'defaultAccountMoney',
        minWidth: 140,
        field: 'moneyBalance'
    },
    {
        title: 'signTime',
        minWidth: 140,
        enMinWidth : 170,
        field: 'updatedTime'
    },
    {
        title: 'operate',
        width: 140,
        field: ''
    },
];

// 我的订单列表表头
export const orderListHead = [
    {
        title: '交易号',      // 交易号
        minWidth: 150,
        field: 'outOrderNo'
    },
    {
        title: '景区',        // 景区
        minWidth: 160,
        enMinWidth : 100,
        field: 'outOrgName'
    },
    {
        title: '会员方交易流水号',  // 会员方交易流水号
        minWidth: 160,
        enMinWidth : 150,
        field: 'orderNo'
    },
    {
        title: '整单交易金额',    // 整单交易金额
        minWidth: 150,
        field: 'amount'
    },
    {
        title: '订单状态(支付、退款)',      // 订单状态(支付、退款)
        minWidth: 180,
        enMinWidth : 200,
        field: 'status'
    },
    {
        title: '交易时间',    // 交易时间
        minWidth: 200,
        field: 'tradeTime'
    },
    {
        title: '会员系统交易时间',      // 会员系统交易时间
        minWidth: 200,
        field: 'createdTime'
    },
    {
        title: 'operate',
        width: 140,
        field: ''
    },
];

// 我的订单列表表头
export const cardOwnerHead = [
    {
        title: '成员序号',       // 成员序号
        field: 'no'
    },
    {
        title: 'name',       // 姓名
        field: 'name'
    },
    {
        title: '身份证号',       // 身份证号
        field: 'idno'
    },
    {
        title: 'mobilePhone',       // 手机号
        field: 'phone'
    },
    {
        title: 'gender',       // 性别
        field: 'gender'
    },
];

/*** 订单详情 - 积分率相关表格表头 ***/
// 按会员级别享受积分、折扣率信息 - 列表表头
export const byLevelHead = [
    {
        title: 'IntegralRate',       // 积分率
        field: 'IntegralRate'
    },
    {
        title: 'discountRate',       // 折扣率
        field: 'discountRate'
    },
];

// 按店铺享受积分、折扣率信息 - 列表表头
export const byShopHead = [
    {
        title: 'shop',       // 店铺
        field: 'shop'
    },
    ...byLevelHead
];

// 按产品享受积分、折扣率信息 - 列表表头
export const byProductHead = [
    {
        title: 'shop',       // 店铺
        field: 'shop'
    },
    {
        title: 'goods',       // 商品
        field: 'goods'
    },
    ...byLevelHead
];

// 年卡、次卡可使用的第三方卡 - 列表表头
export const cardInfosHead = [
    {
        title: 'name',       // 名称
        field: 'cardName'
    },
    {
        title: 'thirdCardFaceNum',       // 第三方卡面号
        field: 'displayNo'
    },
    {
        title: 'thirdCardNum',       // 第三方卡号
        field: 'cardNo'
    },
];



// 订单状态的过滤显示
export const orderStatus = function (status) {
    let statusName = '-';
    switch (status) {
        case 'pay' :
            statusName = this.$t('pay');        // 支付
            break;
        case 'refund' :
            statusName = this.$t('refund');        // 退款
            break;
        case 'cancel_pay' :
            statusName = this.$t('cancelPay');        // 撤销支付
            break;
        case 'cancel_refund' :
            statusName = this.$t('cancelRefund');        // 撤销退款
            break;
    }
    return statusName;
};

