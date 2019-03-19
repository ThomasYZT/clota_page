//导出卡券记录表头
export const exportCouponRecordHead = [
    {
        title : 'exportTime', //导出时间
        field : 'createdTime',
        minWidth : 150,
    },
    {
        title : 'exportNum', //导出数量
        field : 'optCount',
        minWidth : 150,
    },
    {
        title : 'couponNameV2', //优惠券名称
        field : 'couponName',
        minWidth : 150,
    },
    {
        title : 'recipientInformation', //领取人信息
        field : 'nickName',
        minWidth : 150,
    },
    {
        title : 'filePassword', //文件密码
        field : 'password',
        minWidth : 150,
    },
];

//生成链接记录表头
export const generateLinkRecordHead = [
    {
        title : 'generationTime', //生成时间
        field : 'createdTime',
        minWidth : 150,
    },
    {
        title : 'couponNameV2', //优惠券名称
        field : 'couponName',
        minWidth : 150,
    },
    {
        title : 'generationNum', //生成数量
        field : 'optCount',
        minWidth : 150,
    },
    {
        title : 'founder', //创建人
        field : 'nickName',
        minWidth : 150,
    },
    {
        title : 'links', //链接
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
        enWidth : 200,
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
        title : 'name',
        field : 'custName',
        minWidth : 150,
    },
    {
        title : 'telephone',
        field : 'phoneNum',
        minWidth : 150,
    },
    {
        title : 'couponStatus',
        field : 'couponStatus',
        minWidth : 150,
    },
];
