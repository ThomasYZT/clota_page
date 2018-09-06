
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
    //修改公司、景区、部门的启用状态
    'updateOrgInfoStatus' : 'tenant/updateOrgInfoStatus.json',
    //获取公司、景区、部门的详细信息
    'getServiceProvider' : 'tenant/getServiceProvider.json',
    //重置账号密码吗
    'resetPassword' : 'tenant/resetPassword.json',
}
