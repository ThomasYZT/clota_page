//导出卡券记录表头
export const exportCouponRecordHead = [
    {
        title : 'exportTime',
        field : 'createdTime',
        minWidth : 150,
    },
    {
        title : 'exportNum',
        field : 'optCount',
        minWidth : 150,
    },
    {
        title : 'couponNameV2',
        field : 'couponName',
        minWidth : 150,
    },
    {
        title : 'recipientInformation',
        field : 'nickName',
        minWidth : 150,
    },
    {
        title : 'filePassword',
        field : 'password',
        minWidth : 150,
    },
];

//生成链接记录表头
export const generateLinkRecordHead = [
    {
        title : 'generationTime',
        field : 'createdTime',
        minWidth : 150,
    },
    {
        title : 'couponNameV2',
        field : 'couponName',
        minWidth : 150,
    },
    {
        title : 'generationNum',
        field : 'optCount',
        minWidth : 150,
    },
    {
        title : 'founder',
        field : 'nickName',
        minWidth : 150,
    },
    {
        title : 'links',
        field : 'couponLink',
        minWidth : 150,
    },
];

//会员权益推送记录表头
export const pushRecordHead = [
    {
        title : 'pushTime',
        field : 'createdTime',
        minWidth : 200,
    },
    {
        title : 'ruleCreator',
        field : 'nickName',
        minWidth : 150,
    },
    {
        title : 'couponNameV2',
        field : 'couponName',
        minWidth : 150,
    },
    {
        title : 'couponTypeV2',
        field : '',
        minWidth : 150,
    },
    {
        title : 'pushType',
        field : 'optMark',
        minWidth : 150,
    },
    {
        title : 'invalidTime',
        field : 'expTime',
        minWidth : 220,
    },
    {
        title : 'issuedQuantity',
        field : '',
        minWidth : 150,
    },
    {
        title : 'used',
        field : 'usedNum',
        minWidth : 150,
    },
    {
        title : 'noUse',
        field : 'waitNum',
        minWidth : 150,
    },
    {
        title : 'operate',
        field : '',
        minWidth : 200,
    },
];

export const reportModalHead = [
    {
        title : '姓名',
        field : '',
        minWidth : 150,
    },
    {
        title : '电话',
        field : '',
        minWidth : 150,
    },
    {
        title : '优惠券状态',
        field : '',
        minWidth : 150,
    },
];
