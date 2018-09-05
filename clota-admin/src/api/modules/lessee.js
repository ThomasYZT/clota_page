
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
}
