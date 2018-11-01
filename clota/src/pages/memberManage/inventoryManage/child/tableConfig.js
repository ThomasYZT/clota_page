
//商品管理 列表表头配置
export const goodsListHead = [
    {
        title : 'goodsName', //商品名称
        minWidth : 100,
        field : 'goodsName'
    },
    {
        title : 'stockNum', //库存数量
        minWidth : 100,
        field : 'stockNum'
    },
    {
        title : 'unconverted', //已兑换未领取
        minWidth : 100,
        field : 'unconverted'
    },
    {
        title : 'alreadyReceived', //已领取
        minWidth : 100,
        field : 'received'
    },
    {
        title : 'unit', //单位
        minWidth : 100,
        field : 'unit'
    },
    {
        title : 'goodsName', //商品状态
        minWidth : 100,
        field : 'status'
    },
    {
        title : 'operate', //操作
        minWidth : 100,
        field : ''
    },
];

//商品入库记录 表头配置
export const inBoundHead = [
    {
        title : 'goodsName', //商品名称
        minWidth : 100,
        field : 'goodsName'
    },
    {
        title : 'addNum', //新增数量
        minWidth : 100,
        field : 'addNum'
    },
    {
        title : 'purchasePrice', //采购价（单位：元）
        minWidth : 100,
        field : 'purchasePrice'
    },
    {
        title : 'marketPrice', //市场价
        minWidth : 100,
        field : 'marketPrice'
    },
    {
        title : 'purchaser', //采购人
        minWidth : 100,
        field : 'purchaser'
    },
    {
        title : 'purchaseTime', //采购时间
        minWidth : 100,
        field : 'purchaseTime'
    },
    {
        title : 'inBoundTime', //入库时间
        minWidth : 100,
        field : 'inBoundTime'
    },
    {
        title : 'remark', //备注
        minWidth : 100,
        field : 'remark'
    }
];


//商品出库记录 表头配置
export const outBoundHead = [
    {
        title : 'goodsName', //商品名称
        minWidth : 100,
        field : 'goodsName'
    },
    {
        title : 'outBoundTime', //出库时间
        minWidth : 100,
        field : 'outBoundTime'
    },
    {
        title : 'outBoundNum', //出库数量
        minWidth : 100,
        field : 'outBoundNum'
    },
    {
        title : 'changerInfo', //兑换人信息
        minWidth : 100,
        field : 'changerInfo'
    },
    {
        title : 'changeTime', //兑换时间
        minWidth : 100,
        field : 'changeTime'
    },
    {
        title : 'integralConsumption', //消耗积分
        minWidth : 100,
        field : 'integralConsumption'
    },
    {
        title : 'receiveState', //领取状态
        minWidth : 100,
        field : 'receiveState'
    }
];

//商品异常 表头配置
export const abnormalHead = [
    {
        title : 'goodsName', //商品名称
        minWidth : 100,
        field : 'goodsName'
    },
    {
        title : 'editTime', //编辑时间
        minWidth : 100,
        field : 'editTime'
    },
    {
        title : 'editNum', //编辑数量
        minWidth : 100,
        field : 'editNum'
    },
    {
        title : 'editReason', //编辑原因
        minWidth : 100,
        field : 'editReason'
    },
    {
        title : 'operator', //操作人
        minWidth : 100,
        field : 'operator'
    }
];
