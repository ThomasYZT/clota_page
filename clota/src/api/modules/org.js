
//组织架构接口
export default {

    /***********************************组织架构***********************************/

    //获取下级店铺
    'getSubNode' : '/organize/getSubNode',
    //获取组织架构树
    'getOrgTree' : '/organize/getOrgTree',
    //获取组织架构节点详情
    'getOrgInfo' : '/organize/getOrgInfo',
    //重置管理账号密码
    'resetAccountPassword' : '/account/resetAccountPassword',
    //新增/修改员工 (本接口已停止使用)
    'addEmployee' : '/account/addEmployee',
    //新增/修改员工
    'addOrUpdateEmployee' : '/account/addOrUpdateEmployee',
    //获取员工账号列表
    'getEmployeeList' : '/account/getEmployeeList',
    //查找员工详情
    'findEmployeeDetail' : '/account/findEmployeeDetail',
    //删除员工
    'deletedEmployee' : '/account/deletedEmployee',
    //获取管理上级或财务上级
    'getOrgsByManageType' : '/organize/getOrgsByManageType',
    //新增组织树节点
    'addOrgInfo' : '/organize/addOrgInfo',
    //删除节点
    'deleteOrg' : '/organize/deleteOrg',
    //获取核销和销售分组信息
    'getOrgGroupList' : '/organize/getOrgGroupList',
    //获取上级开通的服务
    'getOrgServiceList' : '/organize/getOrgServiceList',
    //修改组织架构节点
    'modifyOrgInfo' : '/organize/modifyOrgInfo',
    //获取下属机构列表
    'getSubNodePage' : '/organize/getSubNodePage',
    //查询合作伙伴列表
    'queryPartnerList' : '/partner/queryPartnerList',
    //编辑款台信息
    'modifyTable' : '/organize/modifyTable',
    //获取省列表
    'getProvinceList' : '/organize/getProvinceList',
    //获取市列表
    'getCityList' : '/organize/getCityList',
    //获取区列表
    'getAreaList' : '/organize/getAreaList',
    //验证管理账号是否唯一
    'checkLoginNameUnique' : '/account/checkLoginNameUnique',
    //查询部门名称列表
    'queryDepartments' : '/organize/queryDepartments',
    //查询角色权限列表
    'queryRoleList' : '/role/queryRoleList',
    //验证款台服务名的唯一性
    'checkServerUrlUnique' : '/selfChannel/checkServerUrlUnique',
    //下级景区添加服务
    'addOrgServiceList' : '/organize/addOrgServiceList',
    //下级景区删除服务
    'deleteOrgServiceList' : '/organize/deleteOrgServiceList',
    //查询全部角色列表
    'queryRoles' : '/role/queryRoles',
    //查询组织机构对应的菜单权限
    'getAllPrivilege' : '/privilege/getAllPrivilege',
    //查询角色在各机构的权限
    'findRolePrivInOrg' : '/role/findRolePrivInOrg',
    //新增角色
    'addRole' : '/role/addRole',
    //重置管理员密码
    'resetManagerPassword' : '/account/resetManagerPassword',
    //查询所有合作伙伴
    'queryAllPartnerList' : '/partner/queryAllPartnerList',
    //新增合作伙伴
    'addPartner' : '/partner/addPartner',
    //修改合作伙伴信息
    'updatePartner' : '/partner/updatePartner',
    //合作伙伴启用、禁用协议
    'updatePartnerStatus' : '/partner/updatePartnerStatus',
    //合作伙伴启用、禁用协议
    'deletePartners' : '/partner/deletePartners',
    //角色详情
    'findById' : '/role/findById',
    //新增或修改自营渠道
    'addOrUpdateSelfChannel' : '/selfChannel/addOrUpdateSelfChannel',
    //查询自营渠道列表
    'querySelfOwnedChannel' : '/selfChannel/querySelfOwnedChannel',
    //禁用启用自营渠道
    'updateChannelStatus' : '/selfChannel/updateChannelStatus',
    //删除自营渠道
    'deleteChannels' : '/selfChannel/deleteChannels',
    //查询销售渠道分组
    'getSaleChannelPage' : '/organize/getSaleChannelPage',
    //新增销售或渠道分组
    'addOrUpdateOrgGroup' : '/organize/addOrUpdateOrgGroup',
    //移动销售渠道分组
    'batchMoveChannelGroup' : '/organize/batchMoveChannelGroup',
    //删除销售渠道分组
    'deleteChannelGroup' : '/organize/deleteChannelGroup',
    //修改角色
    'updateRole' : '/role/updateRole',
    //删除角色下员工
    'deleteRoleOfEmps' : '/role/deleteRoleOfEmps',
    //查询所有的核销设备分组
    'getCheckItemPage' : '/organize/getCheckItemPage',
    //移动核销设备分组
    'batchMoveItemGroup' : '/organize/batchMoveItemGroup',
    //删除核销设备分组
    'deleteItemGroup' : '/organize/deleteItemGroup',
    //查询导游和司机
    'queryPagedOrgStaff' : '/organize/queryPagedOrgStaff',
    //新增导游或司机
    'addOrUpdateOrgStaff' : '/organize/addOrUpdateOrgStaff',
    //删除导游或司机
    'batchDeleteOrgStaff' : '/organize/batchDeleteOrgStaff',
    //查询当前机构对应景区
    'queryScenicByOrgId' : '/organize/queryScenicByOrgId',
    //生成自营渠道appid/appSecretId
    'generateChannelAccount' : '/selfChannel/generateChannelAccount',
    //合作伙伴获取组织架构信息
    'getWholeOrgTree' : '/organize/getWholeOrgTree',
    //校验该机构是否拥有该服务包
    'checkOrgServiceById' : '/privilege/checkOrgServiceById',
    //下载base64图片
    'base64Str2Img' : '/base64Str2Img',

};
