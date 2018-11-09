// 在线交易记录列表
export const tradeRecordHead = [
    {
        title : '类型', // 类型
        minWidth : 130,
        field : 'bizType'
    },
    {
        title : '交易金额', // 交易金额
        minWidth : 100,
        field : 'txnAmt',
        type : 'money'
    },
    {
        title : '日期', // 日期
        minWidth : 180,
        field : 'txnReqTime'
    },
    {
        title : '会员卡信息', // 会员卡信息
        minWidth : 150,
        field : 'cardLevelName'
    },
    {
        title : '持卡人信息', // 持卡人信息
        minWidth : 200,
        field : 'memberName'
    },
    {
        title : '支付方式', // 支付方式
        minWidth : 100,
        field : 'payType'
    },
    {
        title : '支付状态', // 支付状态
        minWidth : 100,
        field : 'txnStatus'
    },
    {
        title : '会员系统状态', // 会员系统状态
        minWidth : 150,
        field : 'bizStatus'
    },
    {
        title : '操作人', // 操作人
        width : 100,
        field : 'operateUserName'
    },
    {
        title : 'operate', // 操作人
        width : 130,
        field : ''
    }
];
