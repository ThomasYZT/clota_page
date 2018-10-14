
//预订中心接口
export default {
    //查询所属景区列表
    'getScenicList' : '/order/getScenicList',
    //订单预购页面 发售机构及下单机构的下拉列表
    'queryOrderOptionList' : '/order/queryOrderOptionList',
    //查询预订产品列表
    'queryReserveProductList' : '/order/queryReserveProductList',
    //获取下单企业可用余额
    'findByOrgIdAndPeerId' : '/organize/findByOrgIdAndPeerId',
    //新建散客订单
    'addIndividualOrder' : '/order/addIndividualOrder',
    //查询产品销售规则
    'findProductSaleRule' : '/product/findProductSaleRules',
    //查询下单企业
    'getOrderOrgList' : '/order/getOrderOrgList',
    //查询团队审核订单
    'queryTeamOrder' : '/order/queryTeamOrder',
}
