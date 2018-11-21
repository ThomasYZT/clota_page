//短信发送表头配置
export const sendColumns = [
    {
        title : '订单编号',
        minWidth : 210,
        field : 'orderNo'
    },
    {
        title : '手机号',
        minWidth : 150,
        field : 'target'
    },
    {
        title : '条数',
        minWidth : 130,
        field : 'amount'
    },
    {
        title : '发送时间',
        minWidth : 190,
        field : 'createdTime'
    },
    {
        title : '触发',
        minWidth : 130,
        field : 'invokeType'
    },
    {
        title : '服务商',
        minWidth : 130,
        field : 'provider'
    },
    {
        title : '发送状态',
        minWidth : 130,
        field : 'status'
    },
    {
        title : '操作',
        minWidth : 90,
        field : 'operate'
    }
];
//短信购买表头配置
export const buyColumns = [
    {
        title : '短信套餐名称',
        minWidth : 160,
        field : 'smsPackageName',
    },
    {
        title : '套餐单价',
        minWidth : 150,
        field : 'price'
    },
    {
        title : '套餐短息数量',
        minWidth : 140,
        field : 'smsCount',
    },
    {
        title : '购买数量',
        minWidth : 130,
        field : 'packageCount'
    },
    {
        title : '购买短信总数',
        minWidth : 130,
        field : 'smsTotal'
    },
    {
        title : '总价',
        minWidth : 130,
        field : 'totalPrice'
    },
    {
        title : '购买时间',
        minWidth : 190,
        field : 'createTime',
        filters : true
    },
];
