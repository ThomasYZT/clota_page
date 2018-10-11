
// 我定义的销售政策
export const myPolicyHead = [
    {
        title: 'salePolicyName',      // 销售政策名称
        width: 160,
        field: 'name'
    },
    {
        title: 'industryType',   // 业态类型
        minWidth: 130,
        field: 'productTypeDesc'
    },
    {
        title: 'desc',   // 描述
        minWidth: 200,
        field: 'policyDesc'
    },
    {
        title: 'status',      // 状态
        minWidth: 120,
        field: 'auditStatus'
    },
    {
        title: 'saleChannelsGroup',      // 销售渠道分组
        minWidth: 180,
        field: 'groupNames'
    },
    {
        title: 'operate',       // 操作
        width: 110,
        field: ''
    },
];

// 分销给我的销售政策
export const distributePolicyHead = [
    {
        title: 'salePolicyName',      // 销售政策名称
        width: 160,
        field: 'name'
    },
    {
        title: 'scenePlace',   // 所属景区
        minWidth: 150,
        field: 'scenicName'
    },
    {
        title: 'industryType',   // 业态类型
        minWidth: 100,
        field: 'productTypeDesc'
    },
    {
        title: 'desc',      // 描述
        minWidth: 220,
        field: 'policyDesc'
    },
    {
        title: 'superiorDistribution',      // 上级分销商
        minWidth: 100,
        field: 'parentDistributor'
    },
    {
        title: 'operate',        // 操作
        minWidth: 110,
        field: ''
    },
];
