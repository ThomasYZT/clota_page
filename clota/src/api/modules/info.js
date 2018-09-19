
//会员信息接口
export default {

    /***********************************会员信息***********************************/
    //分页查询
    'queryMemberPage' : '/member/queryMemberPage',
    //删除会员
    'deleteMemberInfo' : '/member/deleteMemberInfo',
    //新增会员
    'saveNewMemberInfo' : '/member/saveNewMemberInfo',
    //修改会员信息
    'editMemberInfo' : '/member/editMemberInfo',
    //根据会员获取会员信息和会员卡信息
    'showMemberDetail' : '/member/showMemberDetail',
    //查询成长值
    'getGrowthBalance' : '/member/getGrowthBalance',
    //根据会员卡获取账户信息
    'listCardAccountInfo' : '/member/memberAccount/listCardAccountInfo',
    //获取更多优惠券
    'listCouponsByStatus' : '/member/memberCoupon/listCouponsByStatus',
    //查询自定义账户
    'queryDefineAccountType' : '/member/memberAccount/queryDefineAccountType',
    //新增账户
    'addAccountInfo' : '/member/memberAccount/addAccountInfo',
    //新增储值
    'addAmount' : '/member/memberAccount/addAmount',
    //会员信息详情-获取账户应用范围
    'listAccountDetailRange' : '/member/memberAccount/listAccountRange',
    //更新会员卡信息
    'updateMemberCard' : '/member/updateMemberCard',
    //冻结/启用会员卡
    'manualUpdateCardStatus' : '/member/manualUpdateCardStatus',
    //获取母卡或子卡
    'queryChildOrMotherCard' : '/member/queryChildOrMotherCard',
    //兑现
    'transferAccountBalance' : '/member/memberAccount/transferAccountBalance',
    //调储值账户积分
    'adjustScore' : '/member/memberAccount/adjustScore',
    //调储值账户余额
    'adjustAmount' : '/member/memberAccount/adjustAmount',
    //查询账户明细
    'queryAccountChange' : '/member/memberAccount/queryAccountChange',
    //根据会员卡id获取折扣率说明
    'listMemberCardRate' : '/members/listMemberCardRate',
    //充值时获取实际所得到的金额
    'getRechargeActMoney' : '/member/memberAccount/getRechargeActMoney',


    /***********************************会员积分***********************************/
    //会员积分、折扣率查询
    'memberDiscountOfMemberList' : '/members/memberDiscountOfMemberList',
    //获取特殊会员的折扣率和积分率
    'getSpecialMemberDiscount' : '/members/getSpecialMemberDiscount',
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
    //删除特殊会员类别
    'deleteMemberStaffType' : '/members/deleteMemberStaffType',
    //查询特殊会员类别
    'memberStaffTypeList' : '/members/memberStaffTypeList',
    //查询特殊会员与普通会员对照表
    'getStaffLevelInfo' : '/members/getStaffLevelInfo',
    //设置特殊会员折扣率
    'setSpecialMemberDiscountOfMember' : '/members/setSpecialMemberDiscountOfMember',

    /***********************************会员卡券***********************************/
    //设置特殊会员折扣率
    'queryCoupons' : '/member/memberCoupon/queryCoupons',
    //新增或修改卡券
    'updateCoupon' : '/member/memberCoupon/updateCoupon',
    //查询所有店铺信息
    'listAllSubStore' : '/member/memberBasicSet/listAllSubStore',
    //查询店铺商品信息
    'queryProduct' : '/product/queryProduct',
    //查询会员渠道，只包含自营渠道和ota
    'querySelfChannel':'/member/channelSet/querySelfChannel',

    /***********************************初始化设置***********************************/
    //基础设置-会员基础设置-查询
    'findBasicSet' : '/member/memberBasicSet/findBasicSet',
    //基础设置-会员基础设置-保存/修改
    'basicSet' : '/member/memberBasicSet/basicSet',
    //基础设置-查询证件
    'queryDocument' : '/member/memberBasicSet/queryDocument',
    //基础设置-增加/修改/删除证件
    'updateDocument' : '/member/memberBasicSet/updateDocument',
    //基础设置-查询调账原因
    'listAdjustReason' : '/member/memberBasicSet/listAdjustReason',
    //基础设置-删除调账原因
    'deleteAdjustReason' : '/member/memberBasicSet/deleteAdjustReason',
    //基础设置-增加调账原因
    'addAdjustReason' : '/member/memberBasicSet/addAdjustReason',
    //获取所有产品类型
    'queryProductType' : '/member/productType/queryProductType',
    //新增或修改产品类型
    'saveProductType' : '/member/productType/saveProductType',
    //删除产品类别
    'deleteProductType' : '/member/productType/deleteProductType',

    //渠道设置-会员渠道-查询
    'queryChannelSet' : '/member/channelSet/queryChannelSet',
    //渠道设置-会员渠道-增加/修改/删除
    'updateChannelSet' : '/member/channelSet/updateChannelSet',

    //会员级别-查询
    'queryMemberLevels' : '/member/memberLevel/queryMemberLevels',
    //会员级别-增加/修改
    'updateMemberLevel' : '/member/memberLevel/updateMemberLevel',
    //会员级别-删除会员级别
    'deleteMemberLevel' : '/member/memberLevel/deleteMemberLevel',
    //会员级别-批量设置会员等级晋升规则
    'batchUpdateMemberLevels' : '/member/memberLevel/batchUpdateMemberLevels',

    //储值设置-查询收款方式
    'queryPaymentType' : '/member/memberBasicSet/queryPaymentType',
    //储值设置-新增/修改/删除收款方式
    'updatePaymentType' : '/member/memberBasicSet/updatePaymentType',
    //储值设置-查询储值账户
    'queryMemberAccountDefine' : '/member/memberBasicSet/queryMemberAccountDefine',
    //储值设置-保存/更改/删除储值账户设置
    'updateMemberAccountDefine' : '/member/memberBasicSet/updateMemberAccountDefine',
    //储值设置-获取储值赠送金额应用范围
    'listAccount' : '/member/memberAccount/listAccount',
    //判断账户归属是否存在
    'existAccountBelong' : '/member/memberBasicSet/existAccountBelong',


    /***********************************会员统计***********************************/
    //获取会员总量
    'getMemberSumCount' : '/member/getMemberSumCount',
    //获取会员增长数量
    'getIncreaseMemberCount' : '/member/getIncreaseMemberCount',
    //获取会员等级数量
    'getMemberLevelCount' : '/member/getMemberLevelCount',

    /***********************************财务管理***********************************/
    //转账记录
    'queryChangeList' : '/members/orgAccount/queryChangeList',
    //获取账户余额
    'getOrgAccount' : '/members/orgAccount/getOrgAccount',
    //转账
    'transfer' : '/members/orgAccount/transfer',
    //获取资金交易明细
    'queryOrgAccountChange' : '/member/memberAccount/queryOrgAccountChange',
    //储值信息
    'queryChargingAccountInfo' : '/member/memberAccount/queryChargingAccountInfo',
    //获取转入账户信息
    'getUpperlevelOrgList' : '/organize/getUpperlevelOrgList',
    //查询储值明细
    'queryChargingList' : '/member/memberAccount/queryChargingList',

    /***********************************首页***********************************/
    //获取会员消费笔数
    'getMemberConsumeCount' : '/member/getMemberConsumeCount',
    //获取会员消费金额和和积分的信息
    'getMemberConsumeSum' : '/member/getMemberConsumeSum',
    //获取会员消费金额和积分的图表信息
    'getMemberConsumeSumGroupBy' : '/member/getMemberConsumeSumGroupBy'

}
