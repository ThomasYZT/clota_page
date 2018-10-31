<!--订单操作日志-->

<template>
    <div class="order-operate-log">
        <div class="title" v-if="showTitle">{{$t('orderOperateLog')}}</div>
        <Steps direction="vertical" size="small" class="ivu-steps-clota">
            <Step v-for="item in operateLogDeal"
                  :key="item.createdTime"
                  icon="clota"
                  :class="item.className"
                  :title="item.contentDeal" >
                <span class="time">{{item.createdTime}}</span>
                <span class="operater">{{$t('operator')}}：{{item.createOrg}} {{item.createName}} </span>
            </Step>
        </Steps>
    </div>
</template>

<script>
    export default {
        props :{
            //操作记录
            'order-record-list' : {
                type : Array,
                default () {
                    return [];
                }
            },
            //是否显示标题
            'show-title' : {
                type : Boolean,
                default : true
            }
        },
        data() {
            return {
                //各种状态对应的类名
                constClassDefined : {
                    //订单退票申请
                    'ORDER_REFUND_APPLY' : 'blue-status',
                    //订单退票审核
                    'ORDER_REFUND_AUDIT' : 'green-status',
                    //订单改签申请
                    'ORDER_ALTER_APPLY' : 'green-status',
                    //订单改签审核
                    'ORDER_ALTER_AUDIT' : 'green-status',
                    //新建订单
                    'ORDER_NEW_ORDER' : 'blue-status',
                    //新增票券
                    'ORDER_NEW_TICKET' : 'blue-status',
                    //"团队订单审核驳回
                    'ORDER_AUDIT_REJECT' : 'red-status',
                    //"团队订单审核通过
                    'ORDER_AUDIT_PASS' : 'green-status',
                    //核销
                    'ORDER_VERIFY_TICKET' : 'green-status',
                }
            }
        },
        methods: {
            /**
             * 获取日志详细内容
             * @param itemData
             */
            getContentDetail (itemData) {
                let contentsObj = {};
                if(itemData.contents && itemData.contents.substr(0,1) === '{'){
                    contentsObj = JSON.parse(itemData.contents);
                }else{
                    contentsObj = {};
                }
                switch(itemData.operationStatus) {
                    //订单退票申请
                    case 'ORDER_REFUND_APPLY' :
                        // 申请退票，数量：
                        return `${this.$t('ApplyForRefund')}，${this.$t('quantity')}：${contentsObj.reqNum}。`;
                    //订单退票审核
                    case 'ORDER_REFUND_AUDIT' :
                        //退票审核，通过数量：                                                                    // 手续费率                                                                                 // 驳回数量                                         // 备注
                        return `${this.$t('refundAndAudit')}，${this.$t('passedNum')}：${contentsObj.passNum}，${this.$t('handlingRate')}：${contentsObj.refundRate}，${contentsObj.passOrderTicketIds}；${this.$t('rejectedNum')}：${contentsObj.rejectNum}。${this.$t('remark')}：${contentsObj.remark}`;
                    //订单改签申请
                    case 'ORDER_ALTER_APPLY' :
                        // 申请改签，数量：                                                                      // 申请改签至
                        return `${this.$t('applyForUpgrade')}，${this.$t('quantity')}：${contentsObj.reqNum}，${this.$t('applyForUpgradeTo')}：${contentsObj.afterAlterDate}。`;
                    //订单改签审核
                    case 'ORDER_ALTER_AUDIT' :
                        // 改签审核，通过数量：                                                                  // 产品明细编号                                                           // 游玩日期改签至                                          // 备注
                        return `${this.$t('alterAndAudit')}，${this.$t('passedNum')}：${contentsObj.passNum}，${this.$t('productDetailNo')}：${contentsObj.passOrderTicketIds}，${this.$t('playDateUpgradeTo')}：${contentsObj.afterAlterDate}。${this.$t('remark')}：${contentsObj.remark}`;
                    //新建订单
                    case 'ORDER_NEW_ORDER' :
                        // 预定成功，预定数量：
                        return `${this.$t('reverseSuccess')}，${this.$t('reserveNum')}：${contentsObj.orderNum}。`;
                    //新增票券
                    case 'ORDER_NEW_TICKET' :
                        // 预定成功
                        return this.$t('reverseSuccess');
                    //"团队订单审核驳回
                    case 'ORDER_AUDIT_REJECT' :
                        // 审核不通过，备注：
                        return `${this.$t('checkNoPass')}，${this.$t('remark')}：${contentsObj.remark}。`;
                    //"团队订单审核通过
                    case 'ORDER_AUDIT_PASS' :
                        // 审核通过，备注：
                        return `${this.$t('checkPass')}，${this.$t('remark')}：${contentsObj.remark}。`;
                    //核销
                    case 'ORDER_VERIFY_TICKET' :
                        // 核销数量：                                                       // 产品明细编号                                          // 核销串码                                           // 备注
                        return `${this.$t('verificationNum')}：${contentsObj.verifyNum}，${this.$t('productDetailNo')}：${contentsObj.ticketId}，${this.$t('verifySN')}：${contentsObj.checkSerialNo}。${this.$t('remark')}：${contentsObj.remark}`;
                    default : return ''
                }
            }
        },
        computed : {
            //操作记录数据处理
            operateLogDeal () {
                return this.orderRecordList.map(item => {
                    return {
                        ...item,
                        className : this.constClassDefined[item.operationStatus] ? this.constClassDefined[item.operationStatus] : 'blue-status',
                        contentDeal : this.getContentDetail(item)
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .order-operate-log{

        .title{
            position: relative;
            padding: 15px 0;
            @include block_outline($height : 52px);
            font-size: $font_size_16px;
            color: $color_333;

            &::before{
                content : '';
                @include block_outline(absolute,2px);
                @include block_outline(4px,16px);
                background: $color_blue;
                display: inline-block;
                margin-right: 14px;
                vertical-align: middle;
            }
        }
    }
</style>
