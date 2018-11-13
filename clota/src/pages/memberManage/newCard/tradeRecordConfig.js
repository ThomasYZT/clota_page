// 在线交易记录列表
export const tradeRecordHead = [
    {
        title : 'type', // 类型
        minWidth : 130,
        field : 'bizType'
    },
    {
        title : 'tradeMoney', // 交易金额
        minWidth : 100,
        field : 'txnAmt',
        type : 'money'
    },
    {
        title : 'date', // 日期
        minWidth : 180,
        field : 'txnReqTime'
    },
    {
        title : 'selectCardAttribution', // 会员卡信息
        minWidth : 150,
        field : 'cardLevelName'
    },
    {
        title : 'cardOwnerInfo', // 持卡人信息
        minWidth : 200,
        field : 'memberName'
    },
    {
        title : 'payType', // 支付方式
        minWidth : 100,
        field : 'payType'
    },
    {
        title : 'paymentStatus', // 支付状态
        minWidth : 100,
        field : 'txnStatus'
    },
    {
        title : 'memberSystemStatus', // 会员系统状态
        minWidth : 150,
        field : 'bizStatus'
    },
    {
        title : 'operator', // 操作人
        width : 100,
        field : 'operateUserName'
    },
    {
        title : 'operate', // 操作人
        width : 177,
        field : ''
    }
];
