
// 我定义的销售政策
export const myPolicyHead = [
    {
        title: 'salePolicyName',      // 销售政策名称
        width: 160,
        field: 'id'
    },
    {
        title: 'industryType',   // 业态类型
        minWidth: 200,
        field: 'industryType'
    },
    {
        title: 'desc',   // 描述
        minWidth: 120,
        field: 'desc'
    },
    {
        title: 'status',      // 状态
        minWidth: 120,
        field: 'status'
    },
    {
        title: 'saleChannelsGroup',      // 销售渠道分组
        minWidth: 180,
        field: 'saleChannelsGroup'
    },
    {
        title: 'operate',       // 操作
        width: 100,
        field: ''
    },
];

// 分销给我的销售政策
export const distributePolicyHead = [
    {
        title: 'salePolicyName',      // 销售政策名称
        width: 160,
        field: 'id'
    },
    {
        title: 'scenePlace',   // 所属景区
        minWidth: 150,
        field: 'productCode'
    },
    {
        title: 'industryType',   // 业态类型
        minWidth: 100,
        field: 'industryType'
    },
    {
        title: 'desc',      // 描述
        minWidth: 220,
        field: 'desc'
    },
    {
        title: 'superiorDistribution',      // 上级分销商
        minWidth: 100,
        field: 'superiorDistribution'
    },
    {
        title: 'operate',        // 操作
        minWidth: 90,
        field: ''
    },
];
