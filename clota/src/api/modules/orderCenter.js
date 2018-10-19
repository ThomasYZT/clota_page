
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
    //校验订单产品售卖规则
    'checkProductSaleRule' : 'order/checkProductSaleRule',
    //新建团队订单
    'addTeamOrder' : 'order/addTeamOrder',
    //查询订单下的产品
    'queryOrderProductByOrderId' : '/order/queryOrderProductByOrderId',
    //审核团队订单
    'auditTeamOrder' : '/order/auditTeamOrder',
    //查询退票/改签待审核订单列表
    'queryOrderRefundAlterAuditList' : '/order/queryOrderRefundAlterAuditList',
    //订单(单个)批量退票改签审核
    'auditBatchOrderProduct' : '/order/auditBatchOrderProduct',
    //景区给旅行社下单查询上次导游和司机信息
    'getRecentVisitors' : '/order/getRecentVisitors',
    //获取订单列表
    'getOrderList' : '/order/getOrderList',
    //查询二级散客订单详情
    'querySecondIndividualOrderDetail' : '/order/querySecondIndividualOrderDetail',
}