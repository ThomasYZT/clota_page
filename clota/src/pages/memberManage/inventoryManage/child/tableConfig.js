
//商品管理 列表表头配置
export const goodsListHead = [
    {
        title : 'goodsName', //商品名称
        minWidth : 120,
        field : 'name'
    },
    {
        title : 'stockNum', //库存数量
        minWidth : 120,
        field : 'stockNum'
    },
    {
        title : 'unconverted', //已兑换未领取
        minWidth : 120,
        field : 'undrawNum'
    },
    {
        title : 'alreadyReceived', //已领取
        minWidth : 120,
        field : 'drawNum'
    },
    {
        title : 'unit', //单位
        minWidth : 120,
        field : 'unit'
    },
    {
        title : 'goodsStatus', //商品状态
        minWidth : 120,
        field : 'goodsStatus'
    },
    {
        title : 'operate', //操作
        minWidth : 160,
        field : ''
    },
];

//商品入库记录 表头配置
export const inBoundHead = [
    {
        title : 'goodsName', //商品名称
        minWidth : 120,
        field : 'goodsName'
    },
    {
        title : 'addNum', //新增数量
        minWidth : 120,
        field : 'changeQuantity'
    },
    {
        title : 'purchasePrice', //采购价（单位：元）
        minWidth : 200,
        field : 'purchasePrice',
        type : 'money'
    },
    {
        title : 'marketPrice', //市场价
        minWidth : 120,
        field : 'marketPrice',
        type : 'money'
    },
    {
        title : 'purchaser', //采购人
        minWidth : 120,
        field : 'purchaser'
    },
    {
        title : 'purchaseTime', //采购时间
        minWidth : 200,
        field : 'purchaseDate'
    },
    {
        title : 'inBoundTime', //入库时间
        minWidth : 200,
        field : 'storageTime'
    },
    {
        title : 'remark', //备注
        minWidth : 120,
        field : 'remark'
    }
];

//商品出库记录 表头配置
export const outBoundHead = [
    {
        title : 'goodsName', //商品名称
        minWidth : 120,
        field : 'goodsName'
    },
    {
        title : 'outBoundTime', //出库时间
        minWidth : 120,
        field : 'outTime'
    },
    {
        title : 'outBoundNum', //出库数量
        minWidth : 120,
        field : 'changeQuantity'
    },
    {
        title : 'changerInfo', //兑换人信息
        minWidth : 120,
        field : 'memberName'
    },
    {
        title : 'changeTime', //兑换时间
        minWidth : 120,
        field : 'exchangeTime'
    },
    {
        title : 'integralConsumption', //消耗积分
        minWidth : 120,
        field : 'changeCredit'
    },
    {
        title : 'receiveState', //领取状态
        minWidth : 120,
        field : 'drawStatus'
    }
];

//商品异常 表头配置
export const abnormalHead = [
    {
        title : 'goodsName', //商品名称
        minWidth : 120,
        field : 'goodsName'
    },
    {
        title : 'editTime', //编辑时间
        minWidth : 120,
        field : 'updatedTime'
    },
    {
        title : 'editNum', //编辑数量
        minWidth : 120,
        field : 'changeQuantity'
    },
    {
        title : 'editReason', //编辑原因
        minWidth : 120,
        field : 'remark'
    },
    {
        title : 'operator', //操作人
        minWidth : 120,
        field : 'operator'
    }
];

export const stockingHead = [
    {
        title : 'goodsName', //商品名称
        minWidth : 120,
        field : 'name'
    },
    {
        title : 'stockInAndstockOutNum', //入库/出库总量
        minWidth : 120,
        field : 'total'
    },
    {
        title : 'stockTotalNum', //库存总量
        minWidth : 120,
        field : 'stockNum'
    },
    {
        title : 'unconverted', //已兑换未领取
        minWidth : 120,
        field : 'undrawNum'
    },
    {
        title : 'alreadyReceived', //已领取
        minWidth : 120,
        field : 'drawNum'
    },
    {
        title : 'unit', //单位
        minWidth : 120,
        field : 'unit'
    },
    {
        title : 'goodsStatus', //商品状态
        minWidth : 120,
        field : 'goodsStatus'
    },
    {
        title : 'more', //操作
        minWidth : 120,
        field : ''
    },
];


