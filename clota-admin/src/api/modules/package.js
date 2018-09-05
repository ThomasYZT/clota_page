//套餐接口
export default {
    //获取套餐列表
    'queryPackageList' : 'servicePackage/list.json',
    //获取服务列表
    'queryServiceList' : 'service/list.json',
    //新增套餐
    'addPackage' : 'servicePackage/add.json',
    //修改套餐
    'updatePackage' : 'servicePackage/update.json',
    //根据id获取单个套餐详情
    'queryPackageInfoById' : 'servicePackage/get.json',
    //删除套餐
    'deletePackage' : 'servicePackage/delete.json',
    //短信套餐列表
    'smsPackageList' : 'smsPackage/list.json',
    //添加短信套餐
    'addSmsPackage' : 'smsPackage/add.json',
    //修改短信套餐
    'updateSmsPackage' : 'smsPackage/update.json',
    //获取单个短信套餐
    'getSmsPackage' : 'smsPackage/get.json',
    //获取服务开通记录
    'getServiceRecord' : 'service/setupRecord.json',
    //获取短信购买记录
    'purchaseRecordList' : 'sms/purchaseRecordList.json',
    //获取短信供应商列表
    'smsProviderList' : 'sms/providerList.json',
    //获取短信发送记录
    'getSmsSendRecord' : 'sms/sendRecord.json',
    //查询租户列表
    'listServiceProvider' : 'tenant/listServiceProvider.json',
    //获取单个短信发送记录详情
    'getSmsDetail' : 'sms/get.json',
}
