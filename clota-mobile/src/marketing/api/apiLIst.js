
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
};

export default apiList;
