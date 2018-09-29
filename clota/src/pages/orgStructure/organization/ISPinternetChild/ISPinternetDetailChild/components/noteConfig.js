//短信发送表头配置
export const sendColumns = [
    {
        title: 'orderNo',//订单编号
        minWidth: 210,
        field: 'orderNo'
    },
    {
        title: 'mobilePhone',//手机号
        minWidth: 150,
        field: 'target'
    },
    {
        title: 'count',//条数
        minWidth: 130,
        field: 'amount'
    },
    {
        title: 'sendTime',//发送时间
        minWidth: 190,
        field: 'createdTime'
    },
    {
        title: 'invokeType',//触发
        minWidth: 130,
        field: 'invokeType'
    },
    {
        title: 'provider',//服务商
        minWidth: 130,
        field: 'provider'
    },
    {
        title: 'sendStatus',//发送状态
        minWidth: 130,
        field: 'status'
    },
    {
        title: 'operate',//操作
        minWidth: 90,
        field: 'operate'
    }
];
//短信购买表头配置
export const buyColumns = [
    {
        title: 'smsPackageName',//短信套餐名称
        minWidth: 160,
        field: 'smsPackageName',
    },
    {
        title: 'packagePrice',//套餐单价
        minWidth: 150,
        field: 'price'
    },
    {
        title: 'packageSmsCount',//套餐短息数量
        minWidth: 140,
        field: 'smsCount',
    },
    {
        title: 'packageCount',//购买数量
        minWidth: 130,
        field: 'packageCount'
    },
    {
        title: 'buySmsCount',//购买短信总数
        minWidth: 130,
        field: 'smsTotal'
    },
    {
        title: 'totalPrice',//总价
        minWidth: 130,
        field: 'totalPrice'
    },
    {
        title: 'buyTime',//购买时间
        minWidth: 190,
        field: 'createTime',
        filters: true
    },
];
