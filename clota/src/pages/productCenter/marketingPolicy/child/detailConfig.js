
// 产品列表表头
export const productColumn = [
    {
        title: '产品名称',      // 产品名称
        width: 160,
        field: 'parkName'
    },
    {
        title: '景区成本价',   // 景区成本价
        minWidth: 150,
        field: 'saleType'
    },
    {
        title: '产品单价',   // 产品单价
        minWidth: 130,
        field: 'itemCheckTimes'
    },
    {
        title: '限制库存',       // 限制库存
        width: 150,
        field: ''
    }
];

//销售渠道表头
export const saleChannelColumn = [
    {
        title: '选择销售渠道分组',      // 序号
        width: 200,
        field: 'id'
    },
    {
        title: '已选中的销售渠道',   // 设备名称
        minWidth: 300,
        field: 'name'
    }
];

//全民营销表头
export const marketingColumn = [
    {
        title: '类型',      // 类型
        width: 250,
        field: 'id'
    },
    {
        title: '等级',   // 等级
        minWidth: 250,
        field: 'name'
    }
];


//退票表头
export const refundColumn = [
    {
        title: '退票申请期限',      // 退票申请期限
        width: 300,
        field: 'year'
    },
    {
        title: '退票手续费率',   // 退票手续费率
        minWidth: 100,
        field: 'month'
    }
];
