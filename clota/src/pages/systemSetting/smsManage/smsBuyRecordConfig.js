export const smsByRecordHead = [
    {
        title : 'smsPackageName', //短信套餐名称
        minWidth : 200,
        field : 'packageName'
    },
    {
        title : 'packagePrice', //套餐单价
        minWidth : 150,
        enMinWidth : 166,
        field : 'price',
        type : 'money'
    },
    {
        title : 'packageSmsCount', //套餐短信数量
        minWidth : 150,
        enMinWidth : 210,
        field : 'smsCount'
    },
    {
        title : 'payType', //支付方式
        minWidth : 160,
        enMinWidth : 160,
        field : 'payType'
    },
    {
        title : 'paymentStatus', //支付状态
        minWidth : 130,
        enMinWidth : 150,
        field : 'txnStatus'
    },
    {
        title : 'systemStatus', //系统状态
        minWidth : 100,
        enMinWidth : 135,
        field : 'bizStatus'
    },
    {
        title : 'transactionSerialNumber', // 交易流水号
        minWidth : 200,
        enMinWidth : 212,
        field : 'transactionId'
    },
    {
        title : 'totalPrice', //总价
        minWidth : 120,
        field : 'amount',
        type : 'money'
    },
    {
        title : 'buyTime', //购买时间
        minWidth : 120,
        enMinWidth : 140,
        field : 'purchaseTime',
        type : 'date'
    },
    {
        title : 'operate',
        width : 80,
        enWidth : 105,
        field : ''
    },
];
