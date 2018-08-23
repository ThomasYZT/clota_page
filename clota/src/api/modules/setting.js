
//会员信息接口
export default {

    /*---------------------------------基础设置-------------------------------*/
    //会员基础设置-查询
    'findBasicSet' : '/member/memberBasicSet/findBasicSet',
    //会员基础设置-保存/修改
    'basicSet' : '/member/memberBasicSet/basicSet',
    //查询证件
    'queryDocument' : '/member/memberBasicSet/queryDocument',
    //增加/修改/删除证件
    'updateDocument' : '/member/memberBasicSet/updateDocument',
    //查询调账原因
    'listAdjustReason' : '/member/memberBasicSet/listAdjustReason',
    //删除调账原因
    'deleteAdjustReason' : '/member/memberBasicSet/deleteAdjustReason',
    //增加调账原因
    'addAdjustReason' : '/member/memberBasicSet/addAdjustReason',

    /*---------------------------------渠道设置-------------------------------*/
    //会员渠道-查询
    'queryChannelSet' : '/member/channelSet/queryChannelSet',
    //会员渠道-增加/修改/删除
    'updateChannelSet' : '/member/channelSet/updateChannelSet',

    /*---------------------------------会员级别-------------------------------*/
    //会员级别-查询
    'queryMemberLevels' : '/member/memberLevel/queryMemberLevels',
    //会员级别-增加/修改
    'updateMemberLevel' : '/member/memberLevel/updateMemberLevel',
    //删除会员级别
    'deleteMemberLevel' : '/member/memberLevel/deleteMemberLevel',
    //批量设置会员等级晋升规则
    'batchUpdateMemberLevels' : '/member/memberLevel/batchUpdateMemberLevels',

    /*---------------------------------储值设置-------------------------------*/
    //查询收款方式
    'queryPaymentType' : '/member/memberBasicSet/queryPaymentType',
    //新增/修改/删除收款方式
    'updatePaymentType' : '/member/memberBasicSet/updatePaymentType',
    //查询储值账户
    'queryMemberAccountDefine' : '/member/memberBasicSet/queryMemberAccountDefine',
    //保存/更改/删除储值账户设置
    'updateMemberAccountDefine' : '/member/memberBasicSet/updateMemberAccountDefine',
    //获取储值赠送金额应用范围
    'listAccount' : '/member/memberAccount/listAccount',
    //获取储值账户-(本金/赠送金额)应用范围
    'listAmountRange' : '/member/memberBasicSet/listAmountRange',

}
