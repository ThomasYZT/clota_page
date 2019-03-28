
//表头配置
export const columnData = [
    {
        title : 'couponNameV2',
        minWidth : 200,
        field : 'couponName'
    },
    {
        title : 'batchNumber',
        minWidth : 150,
        field : 'batchCode'
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
        enWidth : 200,
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
    },
    {
        title : 'operate  ',
        minWidth : 350,
        enWidth : 570,
    }
];

//代金券详情表头
export const viewCodeCashCouponHead = [
    {
        title : 'money',
        minWidth : 150,
        field : 'nominalValue',
        type : 'money'
    },
    {
        title : 'ticketYard',
        minWidth : 150,
        field : 'couponCode',
    },
    {
        title : 'status',
        minWidth : 150,
        field : 'status',
    }
];

//兑换券详情表头
export const viewCodeExchangeCouponHead = [
    {
        title : 'goodInfo',
        minWidth : 150,
        field : 'remark',
    },
    {
        title : 'ticketYard',
        minWidth : 150,
        field : 'couponCode',
    },
    {
        title : 'status',
        minWidth : 150,
        field : 'status',
    }
];

//折扣券详情表头
export const viewCodeDiscountCouponHead = [
    {
        title : 'allowance',
        minWidth : 150,
        field : 'nominalValue',
    },
    {
        title : 'ticketYard',
        minWidth : 150,
        field : 'couponCode',
    },
    {
        title : 'status',
        minWidth : 150,
        field : 'status',
    }
];
