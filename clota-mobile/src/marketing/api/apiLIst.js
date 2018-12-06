
//会员系统接口
const apiList = {
    //获取验证码
    'market_getPhoneVerificationCode' : '/external/sms/getPhoneVerificationCode',
    //注册账号
    'market_userRegister' : '/market/marketUser/userRegister',
    //校验验证码
    'market_checkVerifyCode' : '/market/marketUser/checkVerifyCode',
    //登录
    'market_login' : '/market/marketUser/login',
    //重置密码
    'market_resetPassword' : '/market/marketUser/resetPassword',
    //产品列表
    'market_queryMarketSaleProductList' : '/market/marketUser/queryMarketSaleProductList',
    //获取用户信息
    'market_getUserInfo' : '/market/marketUser/getUserInfo',
    //获取订单信息
    'market_queryMyMarkOrderList' : '/market/marketUser/queryMyMarkOrderList',
    //获取所有产品信息
    'market_getUserProducts' : '/market/marketUser/getUserProducts',
    //订单申请提现
    'market_orderSalaryWithdrawApply' : '/market/marketUser/orderSalaryWithdrawApply',
    //获取我的信息
    'market_getMarketUserMyInfo' : '/market/marketUser/getMarketUserMyInfo',
    //修改手机号
    'market_modifyMobile' : '/market/marketUser/modifyMobile',
    //获取订单统计信息
    'market_getOrderCount' : '/market/marketUser/getOrderCount',
    //获取订单统计信息
    'market_modifyPassword' : '/market/marketUser/modifyPassword',
    //修改收款账户信息
    'market_updateBankAccount' : '/market/marketUser/updateBankAccount',
    //获取游客查看的订单
    'market_queryMarketProductsForVisitor' : '/market/marketUser/queryMarketProductsForVisitor',
};

export default apiList;
