
//产品中心接口
export default {

    /***********************************产品列表***********************************/
    //查询产品列表
    'queryProductPage' : '/product/queryProductPage',
    //根据产品id查明细
    'findProductById' : '/product/findProductById',
    //添加产品
    'addProduct' : '/product/addProduct',
    //更新产品
    'updateProduct' : '/product/updateProduct',
    //删除产品
    'deleteProduct' : '/product/deleteProduct',
    //查询权限下的园区
    'queryScenicOrgByAccountRole' : '/organize/queryScenicOrgByAccountRole',
    //获取核销分组下的核销设备
    'getCheckItems' : '/organize/getCheckItems',
    //审核操作
    'auditProduct' : '/product/auditProduct',
    //根据IDS获取产品信息
    'queryProducts' : '/product/queryProducts',
    //获取包含该产品的销售政策
    'getPolicyIncludeProduct' : 'product/getPolicyIncludeProduct',


    /***********************************销售政策***********************************/
    //获取销售政策列表
    'queryPolicy' : '/salePolicy/queryPolicy',
    //获取机构分组列表
    'queryOrgGroupVoList' : '/salePolicy/queryOrgGroupVoList',
    //获取有效的假期数据
    'getNormalHolidaysData' : '/salePolicy/getNormalHolidaysData',
    //获取销售政策详情（包含销售组、产品）
    'getPolicyInfo' : '/salePolicy/getPolicyInfo',
    //获取销售政策详情（基本信息、政策规则）-- 分销的销售政策
    'getPolicyBase' : '/salePolicy/getPolicyBase',
    //新增销售政策
    'addPolicy' : '/salePolicy/addPolicy',
    //更新销售政策
    'modifyPolicy' : '/salePolicy/modifyPolicy',
    //更新销售政策状态
    'modifyPolicyStatus' : '/salePolicy/modifyPolicyStatus',
    //删除销售政策
    'deletePolicy' : '/salePolicy/deletePolicy',
    //获取所有销售政策业态类型
    'getAllPolicyType' : '/salePolicy/getAllPolicyType',
    //获取分销详情
    'getPolicyAllocationInfo' : '/salePolicy/getPolicyAllocationInfo',
    //保存分销设置
    'savePolicyAllocation' : '/salePolicy/savePolicyAllocation',
    //删除分销
    'deletePolicyAllocation' : '/salePolicy/deletePolicyAllocation',
    //获取分销已选择销售组列表
    'queryHaveAllocationSaleGroups' : '/salePolicy/queryHaveAllocationSaleGroups',
    //获取政策列表对应的所属景区列表
    'queryPolicyFromScenic' : '/salePolicy/queryPolicyFromScenic',
    //分配过销售政策的销售渠道
    'getAllocatedChannels' : '/salePolicy/getAllocatedChannels',
    //查询我分配的销售政策
    'queryAllocatedPolicy' : '/salePolicy/queryAllocatedPolicy',
    //添加日期方案
    'addDatePlan' : '/salePolicy/addDatePlan',
    //删除日期方案
    'deletedDatePlan' : '/salePolicy/deletedDatePlan',
    //更新日期方案
    'updateDatePlan' : '/salePolicy/updateDatePlan',
    //获取自定义日期方案
    'queryDatePlanList' : '/salePolicy/queryDatePlanList',
    //查询类别、标签列表
    'queryTagDefines' : '/tag/queryTagDefines',
    //新增类别、标签
    'addTagDefine' : '/tag/addTagDefine',
    //修改类别、标签
    'updateTagDefine' : '/tag/updateTagDefine',
    //强制删除标签
    'forceDeleteTagDefines' : '/tag/forceDeleteTagDefines',
    //删除标签(使用中会返回错误码)
    'deleteTagDefines' : '/tag/deleteTagDefines',
    //新增标签关系
    'addTagRelation' : '/tag/addTagRelation',
    //删除关联
    'deleteTagRelations' : '/tag/deleteTagRelations',
    //删除产品标签，做使用校验
    'deleteProductTags' : '/product/deleteProductTags',
    //删除产品类别，做使用校验
    'deletedProductTagType' : '/product/deletedProductTagType'
};
