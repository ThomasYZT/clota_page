/**
 * Created by Sasha on 2018/6/1.
 */


const apiList = {
    //会员注册
    registerMember : '/external/member/registerMember2',
    //获取验证码
    getCode : '/external/member/getPhoneVerificationCode',
    //会员登录
    login : '/external/member/login2',
    //获取卡包信息
    getCardPackage : '/external/member/getCardPackage',
    //主页信息
    queryMemberPage : '/external/memberInfo/queryMemberPage',
    //资金积分明细接口
    queryOrgAccountChange : '/external/memberAccount/queryOrgAccountChange',
    //获取储值账户类型
    queryMemberAccountDefine : '/external/memberAccount/queryMemberAccountDefine',
    //获取账户信息
    listCardAccountInfo : '/external/memberAccount/listCardAccountInfo',
    //查看订单信息
    queryMemberOrder : '/external/order/queryMemberOrder',
    //查看订单信息详情
    queryOrderDetail : '/external/order/queryOrderDetail',
    //获取个人信息
    getMemberDetail : '/external/memberInfo/getMemberDetail',
    //修改手机号码
    updatePhoneNum : '/external/memberInfo/updatePhoneNum',
    //修改个人信息
    updateMemberInfo : '/external/memberInfo/updateMemberInfo',
    //设置交易密码
    updateTradePassword : '/external/memberInfo/updateTradePassword',
    //校验验证码是否正确
    checkCode : '/external/memberInfo/checkCode',
    //获取成长值
    getGrowthBalance : '/external/memberInfo/getGrowthBalance',
    //查询所有证件类型
    queryDocuments : '/external/memberInfo/queryDocuments',
    //会员权益
    listMemberCardRate : '/external/memberInfo/listMemberCardRate',
    //上传头像
    uploadMemberImageInfo : '/uploadFile',
    //获取用户信息
    getOAuth2UserInfo : '/wechat/mp/getOAuth2UserInfo',
    //查询支付协议
    getAgreementToPay : '/external/memberAccount/getAgreementToPay',
    //充值时获取实际所得金额
    getRechargeActMoney : '/external/memberAccount/getRechargeActMoney',
    //获取微信配置信息
    getWxConfig : '/wechat/mp/getConfig',
    //上传头像
    uploadBase64File : '/uploadBase64File',
    //查询商品列表
    queryPagedGoods : '/external/memberMall/queryPagedGoods',
    //查询商品信息
    queryGoodsInfo : '/external/memberMall/queryGoodsInfo',
    //会员兑换商品
    exchangeGoods : '/external/memberMall/exchangeGoods',
    //查询兑换记录
    queryChangeRecordByDrawStatus : '/external/memberMall/queryChangeRecordByDrawStatus',
    //获取会员卡信息列表
    queryMemberCardList : '/external/memberInfo/queryMemberCardList',
    //获取业主卡账户信息
    queryCardAccountInfo : '/external/memberAccount/queryCardAccountInfo',
    //激活会员卡
    activationMemberCard : '/external/member/activationMemberCard',
    //根据卡面号及密码查询实体卡
    queryEntityCardByFaceNumAndPassword : '/external/memberInfo/queryEntityCardByFaceNumAndPassword',
    //获取会员卡及会员详情
    queryMemberCardDetail : '/external/memberInfo/queryMemberCardDetail',
    //获取手机网页支付信息
    getPayPageForMobile : '/external/pay/getPayPageForMobile',
    //微信内微信支付获取支付信息
    getPayPageForOfficialAccount : '/external/pay/getPayPageForOfficialAccount',
    //储值账户充值
    rechargeAccount : '/external/memberAccount/rechargeAccount',
    //查询消费结果更新业务
    queryConsumeUpdateBiz : '/external/pay/queryConsumeUpdateBiz',
    //支付结果同步结果
    syncPayTransactionResult : '/external/pay/syncPayTransactionResult',
    //撤销交易
    revocation : '/api/external/pay/revocation',
};

export default apiList;
