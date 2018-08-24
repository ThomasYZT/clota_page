
//会员信息接口
export default {

    //会员信息-分页查询
    'queryMemberPage' : '/member/queryMemberPage',
    //会员信息-删除会员
    'deleteMemberInfo' : '/member/deleteMemberInfo',
    //会员信息-新增会员
    'saveNewMemberInfo' : '/member/saveNewMemberInfo',
    //会员信息-修改会员信息
    'editMemberInfo' : '/member/editMemberInfo',

    /***********************************会员积分***********************************/
    //会员积分、折扣率查询
    'memberDiscountOfMemberList' : '/members/memberDiscountOfMemberList',
    //设置会员积分、折扣率查询
    'setMemberDiscountOfMember' : '/members/setMemberDiscountOfMember',
    //店铺会员折扣查询
    'memberDiscountOfStoreList' : '/members/memberDiscountOfStoreList',
    //设置店铺折扣率
    'setMemberDiscountOfStore' : '/members/setMemberDiscountOfStore',
    //获取产品折扣率
    'memberDiscountOfProductList' : '/members/memberDiscountOfProductList',
    //设置产品折扣率
    'setMemberDiscountOfProduct' : '/members/setMemberDiscountOfProduct',
    //新增特殊会员类别
    'setMemberStaffType' : '/members/setMemberStaffType',
    //查询特殊会员类别
    'memberStaffTypeList' : '/members/memberStaffTypeList',
    //查询特殊会员与普通会员对照表
    'specialMemberDiscountOfMemberList' : '/members/specialMemberDiscountOfMemberList',
    //设置特殊会员折扣率
    'setSpecialMemberDiscountOfMember' : '/members/setSpecialMemberDiscountOfMember',

    /***********************************会员卡券***********************************/
    //设置特殊会员折扣率
    'queryCoupons' : '/member/memberCoupon/queryCoupons',
    //新增或修改卡券
    'updateCoupon' : '/member/memberCoupon/updateCoupon',
    //查询所有店铺信息
    'listAllSubStore' : '/member/memberBasicSet/listAllSubStore',
}
