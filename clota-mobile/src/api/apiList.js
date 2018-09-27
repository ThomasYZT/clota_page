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
    updatePhoneNum: '/external/memberInfo/updatePhoneNum'
};

export default apiList;
