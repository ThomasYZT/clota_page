
//表头配置
export const columnData = [
    {
        title : 'couponNameV2',
        minWidth : 200,
        field : 'couponName'
    },
    {
        title : '批次号',
        minWidth : 150,
        field : 'couponName'
    },
    {
        title : 'couponTypeV2',
        minWidth : 150,
        enWidth : 170,
        field : 'couponType'
    },
    {
        title : 'applicationScenario',
        minWidth : 150,
        field : 'discountRate'
    },
    {
        title : 'useCondition',
        minWidth : 250,
        field : 'discountRate'
    },
    {
        title : 'validityPeriod',
        minWidth : 230,
        field : 'discountRate'
    },
    {
        title : 'createdDateTime',
        minWidth : 230,
        field : 'createdTime',
        type : 'date'
    },
    {
        title : 'operate  ',
        minWidth : 400,
        enWidth : 400,
    }
];

//代金券详情表头
export const viewCodeCashCouponHead = [
    {
        title : '金额',
        minWidth : 150,
        field : 'nominalValue',
        type : 'money'
    },
    {
        title : '券码',
        minWidth : 150,
        field : 'couponCode',
    },
    {
        title : '状态',
        minWidth : 150,
        field : 'status',
    }
];

//兑换券详情表头
export const viewCodeExchangeCouponHead = [
    {
        title : '商品信息',
        minWidth : 150,
        field : 'remark',
    },
    {
        title : '券码',
        minWidth : 150,
        field : 'couponCode',
    },
    {
        title : '状态',
        minWidth : 150,
        field : 'status',
    }
];

//折扣券详情表头
export const viewCodeDiscountCouponHead = [
    {
        title : '折扣',
        minWidth : 150,
        field : 'nominalValue',
    },
    {
        title : '券码',
        minWidth : 150,
        field : 'couponCode',
    },
    {
        title : '状态',
        minWidth : 150,
        field : 'status',
    }
];
