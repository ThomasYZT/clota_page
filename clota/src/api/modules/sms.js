export default {
    /***********************************在线支付账户设置***********************************/
    //获取在线支付账户列表
    'queryOnlineAccount' : '/organize/queryOnlineAccount',
    //新增在线支付账户
    'addOnlineAccount' : '/organize/addOnlineAccount',
    //编辑在线账户
    'updateOnlineAccount' : '/organize/updateOnlineAccount',
    //删除在线支付账户
    'deleteOnlineAccount' : '/organize/deleteOnlineAccount',

    /***********************************短信管理***********************************/
    //获取短信模板列表
    'getSmsTempletList' : '/sms/getSmsTempletList',
    //修改/新增短信模板
    'updateSmsTemplet' : '/sms/updateSmsTemplet',
    //购买短信服务
    'orderBuySmsPackage' : '/sms/orderBuySmsPackage',
    //获取短信服务包列表
    'getSmsPackageList' : '/sms/getSmsPackageList',
    //短信支付接口
    'getPayQRCodePageForPc' : '/pay/getPayQRCodePageForPc',
    //查询购买短信记录
    'queryPurchaseRecords' : '/sms/queryPurchaseRecords',

    /***********************************重置全员密码***********************************/
    //重置员工密码
    'resetAccountPassword' : '/account/resetAccountPassword',
    //获取员工账号列表
    'getEmployeeList' : '/account/getEmployeeList'
};
