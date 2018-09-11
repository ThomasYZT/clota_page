
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
    //获取短信供应商列表
    'getSmsProviderList' : '/organize/getSmsProviderList',
    //新增员工
    'addEmployee' : '/account/addEmployee',
    //获取员工账号列表
    'getEmployeeList' : '/account/getEmployeeList',
    //删除员工
    'deletedEmployee' : '/account/deletedEmployee',
    //获取管理上级或财务上级
    'getOrgsByManageType' : '/organize/getOrgsByManageType',

}
