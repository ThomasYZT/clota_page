
//订单接口
export default {
    //查询所属景区信息
    'getAllScenic' : 'order/getAllScenic.json',
    //查询下单企业信息
    'getOrderCompany' : 'order/getOrderCompany.json',
    //查询订单列表
    'querySecondOrder' : 'order/querySecondOrder.json',
    //获取营销类别信息
    'getMarketType' : 'order/getMarketType.json',
    //获取营销级别信息
    'getMarketLevel' : 'order/getMarketLevel.json',
    //查询团队产品信息
    'queryGroupDistributionInformation' : 'order/queryGroupDistributionInformation.json',
    //查询订单下游客，司机，导游信息
    'queryOrderPlacer' : 'order/queryOrderPlacer.json',
    //查询产品明细
    'groupProductDetail' : 'order/groupProductDetail.json',
    //订单操作日志
    'queryOperationLog' : 'order/queryOperationLog.json',
    //查询散客产品明细信息
    'queryIndividualProductDetail' : 'order/queryIndividualProductDetail.json',
    //查询退票日志
    'queryRefundLog' : 'order/queryRefundLog.json',
    //查询核销日志
    'queryVerificationLog' : 'order/queryVerificationLog.json',
    //查询分销信息
    'queryDistributionInformation' : 'order/queryDistributionInformation.json',
    //重发短信
    'resendSMS' : 'order/resendSMS.json',
    //团队订单预审核
    'updateGroupOrderAudit' : 'order/updateGroupOrderAudit.json',
    //获取退票手续费
    'getRefundProcedureFee' : 'order/getRefundProcedureFee.json',
    //散客产品退改申请
    'saveOrderProductRefundAlter' : 'order/saveOrderProductRefundAlter.json',
    //获取产品可改签时间
    'getProductPolicyPlayDate' : 'order/getProductPolicyPlayDate.json',
    //查询产品操作日志
    'queryTicketOperationLog' : 'order/queryTicketOperationLog.json',
    //散客订单退改签审核
    'updateIndividualOrderRefundAlterAudit' : 'order/updateIndividualOrderRefundAlterAudit.json',
    //散客产品退改签审核
    'updateProductRefundAlterAudit' : 'order/updateProductRefundAlterAudit.json',
    //申请取消订单
    'applyCancleTeamOrder' : 'order/applyCancleTeamOrder.json',
    //取消订单审核通过
    'passCancelTeamOrderApply' : 'order/passCancelTeamOrderApply.json',
    //取消订单审核不通过
    'rejectCancelTeamOrderApply' : 'order/rejectCancelTeamOrderApply.json',

};
