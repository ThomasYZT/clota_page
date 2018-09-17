
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


    /***********************************销售政策***********************************/
    //获取销售政策列表
    'queryPolicy' : '/salePolicy/queryPolicy',
    //新增销售政策
    'addPolicy' : '/salePolicy/addPolicy',
    //获取销售政策详情（包含销售组、产品）
    'getPolicyInfo' : '/salePolicy/getPolicyInfo',
    //获取销售政策详情（基本信息、政策规则）-- 分销的销售政策
    'getPolicyBase' : '/salePolicy/getPolicyBase',
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



}
