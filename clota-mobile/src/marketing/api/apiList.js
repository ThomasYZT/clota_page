
//营销系统接口
export default {
    //获取微信配置信息
    getWxConfig : '/wechat/mp/getConfig',
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
    //注册时获取参数信息
    'market_registerPage' : '/market/marketUser/registerPage',
    //根据companyCode获取公司名称
    'market_toLoginPage' : '/market/marketUser/toLoginPage',
    //查询用户绑定的所属类别信息
    'market_queryUserType' : '/market/marketUser/queryUserType',
    //获取登录信息
    'market_getLoginInfo' : '/market/marketUser/getLoginInfo',
    //获取图形验证码
    'market_createIMGValidCode' : '/market/marketUser/createIMGValidCode',
    //校验地理位置信息
    'market_checkMarketForbidden' : '/market/marketUser/checkMarketForbidden',
    //查询用户所属类别信息
    'market_queryUserTypeForReset' : '/market/marketUser/queryUserTypeForReset',
    //查询产品销售规则
    'market_findProductSaleRules' : '/market/marketUser/findProductSaleRules',
    //校验所下订单是否正确
    'market_checkOrderBeforePay' : '/market/marketUser/checkOrderBeforePay',
    //游客下单
    'market_addVisitorOrder' : '/market/marketUser/addVisitorOrder',
    //查询支付方式
    'market_queryExtOnlineAccount' : '/market/marketUser/queryExtOnlineAccount',
    //在微信中调用微信支付
    'market_getPayPageForOfficialAccount' : '/external/pay/getPayPageForOfficialAccountNoLogin',
    //在微信外调用支付
    'market_getPayPageForMobileNoLogin' : '/external/pay/getPayPageForMobileNoLogin',
    //更新下单结果
    'market_updateTransction' : '/market/marketUser/updateTransction',
    //校验下单是否符合规则
    'market_checkExtProductSaleRule' : '/market/marketUser/checkExtProductSaleRule',
    //校验订单是否可以提现
    'market_checkCanWithdrawApply' : '/market/marketUser/checkCanWithdrawApply',
    //订单详情申请提现
    'market_singleOrderSalaryWithdrawApply' : '/market/marketUser/singleOrderSalaryWithdrawApply',
    //下载图片
    'market_downloadImage' : '/downloadImage',
    //获取机构下的所有景区信息
    'market_getAllScenicInCompany' : '/external/organize/getAllScenicInCompany',
    //获取景区下的所属类别
    'market_queryMarketTypes' : '/market/marketUser/queryMarketTypes',
    //撤销交易
    'revocation' : '/external/pay/revocation',
    //查询支付结果
    'market_queryPayRecordByOutTradeNo' : '/external/pay/queryPayRecordByOutTradeNo',
    //查询消费结果更新业务
    'queryConsumeUpdateBiz' : '/external/pay/queryConsumeUpdateBiz',
    //获取用户信息
    'getOAuth2UserInfo' : '/wechat/mp/getOAuth2UserInfo',
    //获取用户信息
    'market_autoLogin' : '/market/marketUser/autoLogin',
    //微信直连支付
    'market_getPayPageForMobile' : '/external/pay/getPayPageForMobile',
    //微信公众号支付
    'market_getPayPageForOfficialAccountNoLogin' : '/external/pay/getPayPageForOfficialAccountNoLogin',
    //获取微信授权地址
    'market_generateWxAuthUrl' : '/external/pay/generateWxAuthUrl',
    //获取微信openId
    'market_getOpenid' : '/external/pay/getOpenid',
};
