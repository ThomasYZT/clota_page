
// 我定义的销售政策
export const myPolicyHead = [
    {
        title: '',      //多选
        width: 90,
        field: 'select'
    },
    {
        title: '销售政策名称',      // 销售政策名称
        width: 160,
        field: 'id'
    },
    {
        title: '业态类型',   // 业态类型
        minWidth: 150,
        field: 'productCode'
    },
    {
        title: '描述',   // 描述
        minWidth: 100,
        field: 'productName'
    },
    {
        title: '状态',      // 状态
        minWidth: 220,
        field: 'productDesc'
    },
    {
        title: '销售渠道分组',      // 销售渠道分组
        minWidth: 100,
        field: 'sellingOrg'
    },
    {
        title: 'operate',       // 操作
        width: 80,
        field: ''
    },
];

// 分销给我的销售政策
export const distributePolicyHead = [
    {
        title: '销售政策名称',      // 销售政策名称
        width: 160,
        field: 'id'
    },
    {
        title: '所属景区',   // 所属景区
        minWidth: 150,
        field: 'productCode'
    },
    {
        title: '业态类型',   // 业态类型
        minWidth: 100,
        field: 'productName'
    },
    {
        title: '描述',      // 描述
        minWidth: 220,
        field: 'productDesc'
    },
    {
        title: '上级分销商',      // 上级分销商
        minWidth: 100,
        field: 'sellingOrg'
    },
    {
        title: '操作',        // 操作
        minWidth: 90,
        field: ''
    },
];
