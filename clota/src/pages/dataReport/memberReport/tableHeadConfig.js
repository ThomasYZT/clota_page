//会员卡销售报表
export const memberCardHead = [
    {
        title : 'saleDate',
        minWidth : 140,
        field : 'createdTime',
        type : 'date'
    },
    {
        title : 'saleChannels',
        minWidth : 100,
        field : 'orgName'
    },
    {
        title : 'memberCardType',
        minWidth : 100,
        field : 'typeName'
    },
    {
        title : 'memberCardLevel',
        minWidth : 100,
        field : 'levelDesc'
    },
    {
        title : 'memberCardSales',
        minWidth : 100,
        field : 'saleMoney',
        type : 'money'
    },
    {
        title : 'memberNameAndPhone',
        minWidth : 150,
        field : ''
    },
    {
        title : 'cardBalance',
        minWidth : 100,
        field : 'openMoney',
        type : 'money'
    },
    {
        title : 'modeOfPayment',
        minWidth : 100,
        field : 'payType'
    }
];

//会员消费数据报表
export const consumeHead = [
    {
        title : 'scenicName',
        minWidth : 120,
        field : 'outOrgName'
    },
    {
        title : 'industryType',
        minWidth : 100,
        field : 'productType'
    },
    {
        title : 'checkoutName',
        minWidth : 100,
        field : 'outCashName'
    },
    {
        title : 'memberName',
        minWidth : 100,
        field : 'memberName'
    },
    {
        title : 'memberCardName',
        minWidth : 120,
        field : 'cardLevelName'
    },
    {
        title : 'memberCardType',
        minWidth : 120,
        field : 'cardTypeName'
    },
    {
        title : 'consumeTime',
        minWidth : 150,
        field : 'createdTime',
        type : 'date'
    },
    {
        title : 'consumption',
        minWidth : 100,
        field : 'actAmount',
        type : 'money',
    },
    {
        title : 'scoreInfo',
        minWidth : 100,
        field : 'score'
    },
    {
        title : 'operate',
        minWidth : 100,
        feild : ''
    }
];

//消费记录
export const consumeRecordHead = [
    {
        title : 'scenicName',
        minWidth : 120,
        field : 'orgName'
    },
    {
        title : 'productName',
        minWidth : 100,
        field : 'itemName'
    },
    {
        title : 'productSalePrice',
        minWidth : 100,
        field : 'price',
        type : 'money'
    },
    {
        title : 'amount',
        minWidth : 100,
        field : 'amount'
    },
    {
        title : 'consumeMoneyAdd',
        minWidth : 150,
        field : 'consumeAmount',
        type : 'money'
    },
];

//会员储值记录表头
export const memberStoreValueHead = [
    {
        title : 'scenicName',
        minWidth : 100,
        field : 'orgName'
    },
    {
        title : 'memberName',
        minWidth : 100,
        field : 'custName'
    },
    {
        title : 'memberCardType',
        minWidth : 100,
        field : 'typeName'
    },
    {
        title : 'memberCardLevel',
        minWidth : 100,
        field : 'levelDesc'
    },
    {
        title : 'rechargeDate',
        minWidth : 150,
        field : 'createdTime',
        type : 'date'
    },
    {
        title : 'rechargeAmount',
        minWidth : 100,
        field : 'amount',
        type : 'money'
    },
    {
        title : 'giftSum',
        minWidth : 100,
        field : 'donateMoney',
        type : 'money'
    },
    {
        title : 'cardBalance',
        minWidth : 100,
        field : 'endingBalance',
        type : 'money'
    },
    {
        title : 'rechargeType',
        minWidth : 100,
        field : 'paymentType'
    }
];

export const memberConsumeDetailHead = [
    {
        title : 'productName',
        minWidth : 100,
        field : 'itemName'
    },
    {
        title : 'packageCount',
        minWidth : 100,
        field : 'consumeCount'
    },
    {
        title : 'numOfBuyChance',
        minWidth : 100,
        field : 'quantity'
    },
    {
        title : 'consumeDate',
        minWidth : 100,
        field : ''
    },
];
