
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
    'resetPassword' : 'tenant/resetPassword.json',
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
}
