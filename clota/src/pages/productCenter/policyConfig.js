
// 我定义的销售政策
export const myPolicyHead = [
    {
        title : 'salePolicyName', // 销售政策名称
        width : 160,
        field : 'name'
    },
    {
        title : 'industryType', // 业态类型
        minWidth : 130,
        field : 'productTypeDesc'
    },
    {
        title : 'desc', // 描述
        minWidth : 200,
        field : 'policyDesc'
    },
    {
        title : 'status', // 状态
        minWidth : 120,
        field : 'auditStatus'
    },
    {
        title : 'saleChannelsGroup', // 销售渠道分组
        minWidth : 180,
        field : 'groupNames'
    },
    {
        title : 'operate', // 操作
        width : 120,
        enWidth : 150,
        field : ''
    },
];

// 分销给我的销售政策
export const distributePolicyHead = [
    {
        title : 'salePolicyName', // 销售政策名称
        width : 160,
        enWidth : 180,
        field : 'name'
    },
    {
        title : 'scenePlace', // 所属景区
        minWidth : 150,
        field : 'scenicName'
    },
    {
        title : 'industryType', // 业态类型
        minWidth : 100,
        enMinWidth : 150,
        field : 'productTypeDesc'
    },
    {
        title : 'desc', // 描述
        minWidth : 220,
        field : 'policyDesc'
    },
    {
        title : 'superiorDistribution', // 上级分销商
        minWidth : 100,
        enMinWidth : 180,
        field : 'parentDistributor'
    },
    {
        title : 'operate', // 操作
        minWidth : 110,
        enMinWidth : 170,
        field : ''
    },
];

//我分配的销售政策列表
export const myAllocatedPolicyHead = [
    {
        title : 'salePolicyName', // 销售政策名称
        width : 200,
        enWidth : 200,
        field : 'policyName'
    },
    {
        title : 'scenePlace', // 所属景区
        minWidth : 150,
        field : 'scenicName'
    },
    {
        title : 'desc', // 描述
        minWidth : 220,
        field : 'policyDesc'
    },
    {
        title : 'productName', // 产品名称
        minWidth : 180,
        enMinWidth : 180,
        field : 'productName'
    },
    {
        title : 'settlePrice', // 产品单价
        minWidth : 100,
        enMinWidth : 180,
        type : 'money',
        field : 'settlePrice'
    },
];
