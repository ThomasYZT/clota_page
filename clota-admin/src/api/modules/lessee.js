
//租户接口
export default {
    //查询服务提供商列表
    'queryServiceProvider' : 'tenant/listServiceProvider.json',
    //查询合作渠道
    'queryPartners' : 'tenantPartner/getPartners.json',
    //判断管理员账号是否存在
    'queryAccountExist' : 'tenant/isAccount.json',
    //获取合作渠道的详细信息
    'getPartnerDetail' : 'tenantPartner/getPartner.json',
    //查询渠道下的合作伙伴
    'getChannelPartners' : 'tenantPartner/getChannelPartners.json',
    //审核渠道
    'auditPartner' : 'tenantPartner/auditPartner.json',
    //获取公司、景区、部门、款台数据
    'getCompanyTree' : 'tenant/getCompanyTree.json',
    //新增公司、景区、部门
    'addOrgInfo' : 'tenant/addOrgInfo.json',
    //修改公司、景区、部门
    'updateOrgInfo' : 'tenant/updateOrgInfo.json',
    //修改公司、景区、部门的启用状态
    'updateOrgInfoStatus' : 'tenant/updateOrgInfoStatus.json',
    //获取公司、景区、部门的详细信息
    'getServiceProvider' : 'tenant/getServiceProvider.json',
    //重置账号密码
    'resetPwd' : 'tenant/resetPwd.json',
    //批量重密码
    'updatePassword' : 'tenant/updatePassword.json',
    //删除节点
    'deleteNode' : 'tenant/deleteNode.json',
    //查询指定节点下的员工列表
    'getEmployees' : 'tenant/getEmployees.json',
    //查询指定节点下开通的服务
    'getOrgServices' : 'tenant/getOrgServices.json',
    //查询指定节点下下属公司、景区、部门列表
    'getSubsidiaries' : 'tenant/getSubsidiaries.json',
    //删除员工
    'deleteEmployees' : 'tenant/deleteEmployees.json',
    //删除部门
    'deleteDepartments' : 'tenant/deleteDepartments.json',
    //获取指定公司短信发送记录
    'getSmsConsumeRecords' : 'tenant/getSmsConsumeRecords.json',
    //更新公司服务状态
    'updateServicesStatus' : 'tenant/updateServicesStatus.json',
    //延期公司服务
    'extensionServices' : 'tenant/extensionServices.json',
    //查询所有服务套餐
    'getSysServiceCombos' : 'tenant/getSysServiceCombos.json',
    //查询所有服务
    'getServices' : 'tenant/getServices.json',
    //为公司添加服务
    'addServices' : 'tenant/addServices.json',
    //获取指定公司短信购买记录
    'getSmsPurchaseRecords' : 'tenant/getSmsPurchaseRecords.json',
    //获取指定公司短信发送详情
    'getSmsConsumeRecordDetails' : 'tenant/getSmsConsumeRecordDetails.json',
    //查询管理上级和财务上级
    'getParentManages' : 'tenant/getParentManages.json',
    //查询指定景区的合作伙伴列表
    'getScenicPartners' : 'tenant/getScenicPartners.json',
    //获取指定景区上级管理公司已开通的服务
    'getOpenServices' : 'tenant/getOpenServices.json',
    //给指定景区开通服务
    'openScenicServices' : 'tenant/openScenicServices.json',
    //指定景区删除服务
    'deleteServices' : 'tenant/deleteServices.json',
    //查询款台信息
    'getTableData' : 'tenant/table.json',
    //添加收款账户信息
    'addPayInfo' : 'tenant/addPayInfo.json',
    //获取上级公司支付账户信息
    'getCompanyPayInfo' : 'tenant/getCompanyPayInfo.json',
    //更新合作伙伴信息
    'updatePartner' : 'tenantPartner/updatePartner.json',
    //查询公司公众号配置
    'getWxMpSet' : 'tenant/getWxMpSet.json',
    //配置公司公众号配置
    'setWxMpSet' : 'tenant/setWxMpSet.json',
    //保存会员配置
    'setUserService' : 'tenant/setUserService.json',
    //获取会员配置
    'getMemberServiceSetting' : 'tenant/getMemberServiceSetting.json',
    //删除微信上的支付即会员规则
    'deletePayGiftCardRule' : 'tenant/deletePayGiftCardRule.json',
    //上传微信api证书
    'uploadWxApiCertificate' : 'tenant/uploadWxApiCertificate.json',

};
