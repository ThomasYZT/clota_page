/**
 * Created by Sasha on 2018/6/1.
 */


const apiList = {
    //会员注册
    registerMember: '/external/member/registerMember2',
    //会员注册 获取验证码
    getCode: '/external/member/getPhoneVerificationCode',
    //会员登录
    login: '/external/member/login2',
    //获取卡包信息
    getCardPackage: '/external/member/getCardPackage',
    //主页信息
    queryMemberPage:'/external/memberInfo/queryMemberPage',
    //资金积分明细接口
    queryOrgAccountChange: '/external/memberAccount/queryOrgAccountChange',
    //获取储值账户类型
    queryMemberAccountDefine: '/external/memberAccount/queryMemberAccountDefine',
    //获取账户信息
    listCardAccountInfo: '/external/memberAccount/listCardAccountInfo',
    //查看订单信息
    queryMemberOrder: '/external/order/queryMemberOrder',
    //查看订单信息详情
    queryOrderDetail: '/external/order/queryOrderDetail',
    //获取个人信息
    getMemberDetail: '/external/memberInfo/getMemberDetail',
    //修改手机号码
    updatePhoneNum: '/external/memberInfo/updatePhoneNum',
    //修改个人信息
    updateMemberInfo: '/external/memberInfo/updateMemberInfo',
    //设置交易密码
    updateTradePassword: '/external/memberInfo/updateTradePassword',
    //校验验证码是否正确
    checkCode: '/external/memberInfo/checkCode',
    //获取成长值
    getGrowthBalance: '/external/memberInfo/getGrowthBalance',
    //查询所有证件类型
    queryDocument: '/external/memberInfo/queryDocument',
    //会员权益
    listMemberCardRate: '/external/memberInfo/listMemberCardRate',
    //上传头像
    uploadMemberImageInfo: '/uploadFile',
    //获取用户信息
    getOAuth2UserInfo: '/wechat/mp/getOAuth2UserInfo'
};

export default apiList;
