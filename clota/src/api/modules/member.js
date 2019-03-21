
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
    //充值时获取实际所得到的金额
    'getCardPackage' : '/member/getCardPackage',
    //订单-查询订单信息
    'queryMemberOrder' : '/member/memberOrder/queryMemberOrder',
    //订单-订单详情
    'queryOrderDetail' : '/member/memberOrder/queryOrderDetail',
    //查询实体卡是否可以使用
    'findByPhysicalNum' : '/member/entityCard/findByPhysicalNum',
    //挂失实体卡
    'reportTheLoss' : '/member/entityCard/reportTheLoss',
    //补退卡查询
    'listMemberCards' : '/member/listMemberCards',
    //补卡、关联实体卡
    'entityCardrelationEntityCard' : '/member/entityCard/relationEntityCard',
    //补卡
    'reissueEntityCard' : '/member/entityCard/reissueEntityCard',
    //查询在线交易记录
    'queryPayTransactionRecordList' : '/pay/queryPayTransactionRecordList',
    //批量开卡
    'batchOpenCards' : '/member/batchOpenCards',
    //查询会员卡信息
    'listCardsByMemberId' : '/member/listCardsByMemberId',
    //查询退卡金额
    'findRefundCardMoney' : '/member/findRefundCardMoney',
    //退卡
    'refundCard' : '/member/refundCard',
    //查询支付结果
    'queryConsumeUpdateBiz' : '/pay/queryConsumeUpdateBiz',
    //查询补卡费
    'queryCardReplaceFee' : '/member/memberBasicSet/findReplacementCardFee',
    //修改支付交易密码
    'updateTradePassword' : '/member/updateTradePassword',
    //查看会员类别分布情况
    'countCardsByTyeId' : '/member/report/countCardsByTyeId',
    //个人资金支出、储值明细
    'showRechargeAndAdjust' : '/member/memberAccount/showRechargeAndAdjust',
    //查询主卡或副卡信息
    'findMainOrViceCard' : '/member/findMainOrViceCard',
    //新增副卡
    'saveViceCard' : '/member/saveViceCard',
    //导出个人交易明细
    'exportAccountDetail' : '/member/memberAccount/exportAccountDetail',
    //修改购房金额
    'updateHomeMoney' : '/member/updateHomeMoney',
    //查看修改购房金额记录
    'queryHouseMoneyEditRecord' : '/member/queryHouseMoneyEditRecord',
    //查看新增详情
    'getIncreaseMemberCountDetail' : '/member/getIncreaseMemberCountDetail',
    //撤销交易
    'revocation' : '/pay/revocation',


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
    //设置特殊会员折扣率
    'addSpecialPointRule' : '/member/memberRule/addRule',
    //查询特殊会员折扣率
    'listSpecialPointRules' : '/member/memberRule/listRules',
    //校验特殊会员折扣率设置是否正确
    'checkRuleDate' : '/member/memberRule/checkRuleDate',
    //修改特殊会员折扣率的启用状态
    'updateRulesStatus' : '/member/memberRule/updateRulesStatus',
    //复制特殊会员积分折扣率
    'copyRule' : '/member/memberRule/copyRule',

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
    'querySelfChannel' : '/member/channelSet/querySelfChannel',
    //查看优惠券详细（查看券码）
    'listCouponsDetai' : '/member/memberCoupon/listCouponsDetail',
    //生成链接
    'generateLinks' : '/member/memberCoupon/generateLinks',
    //手动推送卡券
    'manualPullCoupons' : '/member/memberCoupon/manualPullCoupons',
    //导出券码
    'downLoadCoupon' : '/member/memberCoupon/downLoadCoupon',
    //会员优惠券-查看卡券日志
    'queryCouponsLogs' : 'member/memberCoupon/queryCouponsLogs',
    //会员优惠券-日志详情
    'queryCouponsDetailByStatus' : '/member/memberCoupon/queryCouponsDetailByStatus',
    //会员优惠券 -报表查询
    'queryForReport' : '/member/memberCoupon/queryForReport',
    //会员优惠券-查看卡券可使用数量
    'countWaitNum' : '/member/memberCoupon/countWaitNum',
    //查询报表明细
    'queryReportDetail' : '/member/memberCoupon/queryReportDetail',
    //查询优惠券明细
    'findCouponById' : '/member/memberCoupon/findCouponById',
    //会员优惠券-查询推送级别名字
    'queryLevelNames' : '/member/memberCoupon/queryLevelNames',
    //查询自营渠道
    'querySelfOwnedChannelForCoupon' : '/selfChannel/querySelfOwnedChannelForCoupon',
    //更改卡券状态
    'updateCouponStatus' : '/member/memberCoupon/updateCouponStatus',

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
    //查询实体卡信息
    'queryEntityCard' : '/member/entityCard/queryEntityCard',
    //单个新增实体卡
    'saveEntityCard' : '/member/entityCard/saveEntityCard',
    //下载导入实体卡模板
    'downloadEntityCardTmp' : '/member/entityCard/downloadEntityCardTmp',
    //导入实体卡
    'resolverEntityCard' : '/member/entityCard/resolverEntityCard',
    //将解析后的数据导入
    'batchSaveEntityCards' : '/member/entityCard/batchSaveEntityCards',
    //获取包含根节点在内的组织树
    'getRootOrgTree' : '/organize/getRootOrgTree',

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
    //应用范围
    'listApplicationRange' : '/member/memberBasicSet/listApplicationRange',
    //会员类别和会员级别所有数据
    'getMemberLevelsInType' : '/member/memberLevel/getMemberLevelsInType',
    //会员类别数据
    'queryCardTypeList' : '/member/memberLevel/queryCardTypeList',
    //新增或修改会员卡类别
    'saveOrUpdateCardType' : '/member/memberLevel/saveOrUpdateCardType',
    //删除会员类别
    'deletedCardType' : '/member/memberLevel/deletedCardType',
    //查询会员卡类别下的会员级别
    'queryLevelsByCardType' : '/member/memberLevel/queryLevelsByCardType',
    //保存会员卡使用范围设置
    'saveOrUpdateCardRanges' : '/member/memberLevel/saveOrUpdateCardRanges',
    //查询会员卡使用范围设置
    'queryCardRangeList' : '/member/memberLevel/queryCardRangeList',
    //查询会员卡权益可用景区
    'getTicketList' : '/member/memberLevel/getTicketList',
    //发送会员活动短信
    'sendMassSms' : '/member/memberBasicSet/sendMassSms',
    //获取会员活动发送短信接口数量
    'countMemberInLevel' : '/member/memberLevel/countMemberInLevel',
    //短信发送记录
    'querySmsBizModels' : '/sms/querySmsBizModels',
    //短信发送记录详情
    'querySmsQueues' : '/sms/querySmsQueues',
    //重发短信
    'reSendSms' : '/sms/reSendSms',
    //查询所有成长型的会员卡级别
    'queryLevelsOfGrowth' : '/member/memberLevel/queryLevelsOfGrowth',
    //查询会员管理微信公众号配置
    'queryMemberWxMpSet' : '/member/memberBasicSet/queryMemberWxMpSet',
    //查询微信会员卡推送设置
    'queryDefaultDrawMemberLevel' : '/member/memberLevel/queryDefaultDrawMemberLevel',
    //创建/修改微信卡套
    'createOrModifyWxMpMemberCard' : '/member/wxCard/createOrModifyWxMpMemberCard',
    //上传图片至微信
    'uploadImage' : '/member/wxCard/uploadImage',
    //删除微信上的支付即会员规则
    'deletePayGiftCardRule' : '/member/wxCard/deletePayGiftCardRule',
    //创建微信上的支付即会员规则
    'createPayGiftCardRule' : '/member/wxCard/createPayGiftCardRule',
    //卡券报表导出
    'queryForReportForExport' : '/member/memberCoupon/queryForReportForExport',

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
    //查询储值账户信息
    'statisChargingAccount' : '/member/memberAccount/statisChargingAccount',

    /***********************************首页***********************************/
    //获取会员消费笔数
    'getMemberConsumeCount' : '/member/getMemberConsumeCount',
    //获取会员消费金额和和积分的信息
    'getMemberConsumeSum' : '/member/getMemberConsumeSum',
    //获取会员消费金额和积分的图表信息
    'getMemberConsumeSumGroupBy' : '/member/getMemberConsumeSumGroupBy',

    /***********************************进销存管理、积分商城***********************************/
    //批量下架商品
    'batchPullOffGoods' : '/goods/batchPullOffGoods',
    //批量上架商品
    'batchPutOnGoods' : '/goods/batchPutOnGoods',
    //更新商品信息
    'updateGoodsInfo' : '/goods/updateGoodsInfo',
    //查询商品列表
    'queryPagedGoods' : '/goods/queryPagedGoods',
    //查询库存变动记录
    'queryPagedStockChangeRecord' : '/goods/queryPagedStockChangeRecord',
    //商品异常管理
    'abnormalGoodsManage' : '/goods/abnormalGoodsManage',
    //新增/继续商品入库
    'addGoods' : '/goods/addGoods',
    //查询商品信息
    'queryGoodsInfo' : '/goods/queryGoodsInfo',
    //查询单位列表
    'queryUnitList' : '/goods/queryUnitList',
    //新增商品单位
    'addUnit' : '/goods/addUnit',
    //查询库存
    'queryGoodsStock' : '/goods/queryGoodsStock',
    //查询商品兑换信息
    'queryGoodsChangeInfo' : '/goods/queryGoodsChangeInfo',
    //领取奖品
    'drawGoods' : '/goods/drawGoods',
    //导出商品列表
    'exportGoodsList' : '/goods/exportGoodsList',
    //导出库存列表
    'exportGoodsStock' : '/goods/exportGoodsStock',
    //查询支付方式列表
    'queryOnlineAccount' : '/organize/queryOnlineAccount',
    //快速开卡
    'queryEntityCardByRange' : '/member/entityCard/queryEntityCardByRange',
    //查询会员卡有效期
    'queryLevelEffSets' : '/member/memberLevel/queryLevelEffSets',
    //保存会员卡有效期
    'saveLevelEffSet' : '/member/memberLevel/saveLevelEffSet',
    //删除会员卡有效期
    'deleteLevelEffSet' : '/member/memberLevel/deleteLevelEffSet',
    //获取会员报表凭证
    'getTableauTrustedUrl' : '/report/getTableauTrustedUrl',
    //批量退卡
    'batchRefundCard' : '/member/batchRefundCard',
    //查看卡级下的账户信息
    'queryLevelAccount' : '/member/memberAccount/queryLevelAccount',
    //查看储值账户信息
    'queryAccountSetList' : '/member/memberAccount/queryAccountSetList',
    //查看储值账户信息详情
    'findAccountSetDetail' : '/member/memberAccount/findAccountSetDetail',
    //查看储值账户信息
    'getRootOrgTreeWithCompany' : '/organize/getRootOrgTreeWithCompany',
    //计算会员卡类型总数
    'countCardTypeByType' : '/member/memberLevel/countCardTypeByType',
    //修改会员权益
    'updateMemberLevelRights' : '/member/memberLevel/updateMemberLevelRights',
    //计算会员数据统计信息
    'countCardsByType' : '/member/report/countCardsByType',
    //查询店铺下的可用渠道
    'querySelfOwnedChannelByOrgIds' : '/selfChannel/querySelfOwnedChannelByOrgIds',

    /*******************************商品管理*******************************/
    //会员优惠券-增加商品
    'saveProduct' : '/member/memberCoupon/saveProduct',
    //会员优惠券-查询产品
    'listProductList' : '/member/memberCoupon/listProductList',
    //会员优惠券-删除商品
    'member-deleteProduct' : '/member/memberCoupon/deleteProduct',
    //查询优惠券列表
    'queryCouponsList' : '/member/memberCoupon/queryCouponsList',
};
