

//短信购买记录表土
export const smsBuyHead = [
    {
        title: '租户名称',
        minWidth: 120,
        field: 'orgName',
        filters : true
    },
    {
        title: '短信套餐名称',
        minWidth: 200,
        field: 'smsPackageName'
    },
    {
        title: '服务商',
        minWidth: 100,
        field: 'providerName'
    },
    {
        title: '套餐单价',
        minWidth: 100,
        field: 'price'
    },
    {
        title: '套餐短息数量',
        minWidth: 120,
        field: 'smsTotal'
    },
    {
        title: '购买数量',
        minWidth: 100,
        field: 'smsCount'
    },
    {
        title: '购买短信总数',
        minWidth: 130,
        field: 'smsCount'
    },
    {
        title: '总价',
        minWidth: 120,
        field: 'totalPrice'
    },
    {
        title: '购买时间',
        minWidth: 180,
        field: 'createTime'
    },
];
