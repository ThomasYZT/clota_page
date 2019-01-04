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
                <span class="operater">{{$t('operator')}}：{{item.createOrg}} {{item.createName ? item.createName : $t('systemer')}} </span>
            </Step>
        </Steps>
    </div>
</template>

<script>
    export default {
        props : {
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
            },
            //是否是产品日志
            'is-product-log' : {
                type : Boolean,
                default : false
            }
        },
        data () {
            return {
                //各种状态对应的类名
                constClassDefined : {
                    //订单退票申请
                    'ORDER_REFUND_APPLY' : 'green-status',
                    //订单退票审核
                    'ORDER_REFUND_AUDIT' : 'red-status',
                    //订单改签申请
                    'ORDER_ALTER_APPLY' : 'green-status',
                    //订单改签审核
                    'ORDER_ALTER_AUDIT' : 'red-status',
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
                    //过期核销 -- 订单
                    'ORDER_OVERDUE_VERIFY' : 'green-status',
                    //散客过期核销 -- 订单
                    'ORDER_INDIVIDUAL_OVERDUE_VERIFY' : 'green-status',
                    //团队过期核销 -- 订单
                    'ORDER_TEAM_OVERDUE_VERIFY' : 'green-status',
                    //过期核销 -- 产品明细
                    'ORDER_OVERDUE_VERIFY_TICKET' : 'green-status',
                    //团队订单退单申请
                    'ORDER_CANCEL_APPLY' : 'green-status',
                    //团队订单退单驳回
                    'ORDER_CANCEL_AUDIT_REJECT' : 'red-status',
                    //团队订单退单通过
                    'ORDER_CANCEL_AUDIT_PASS' : 'green-status',
                    //团队订单取票
                    'ORDER_TEAM_PICK_TICKET' : 'green-status'
                }
            };
        },
        methods : {
            /**
             * 获取日志详细内容
             * @param itemData
             */
            getContentDetail (itemData) {
                let contentsObj = {};
                if (itemData.contents && itemData.contents.substr(0,1) === '{') {
                    contentsObj = JSON.parse(itemData.contents);
                } else {
                    contentsObj = {};
                }

                switch (itemData.operationStatus) {
                    //订单退票申请
                    case 'ORDER_REFUND_APPLY' :
                        // 申请退票，数量：
                        return {
                            content : `${this.$t('ApplyForRefund')}，${this.$t('quantity')}：${contentsObj.reqNum}。`
                        };
                    //订单退票审核
                    case 'ORDER_REFUND_AUDIT' :
                        //是否是产品的日志信息
                        if (this.isProductLog) {
                            //退票审核，
                            return {
                                content : `${contentsObj.auditType === 'success' ? this.$t('checkPass') : this.$t('checkNoPass')}
                                ${'refundRate' in contentsObj ? ( '，' + this.$t('handlingRate') + ':' + contentsObj.refundRate ) : '' }
                                ${contentsObj['remark'] ? ( '，' + this.$t('remark') + ':' + contentsObj.remark + ',' ) : '' }。`,
                                className : contentsObj.auditType === 'success' ? 'green-status' : 'red-status'
                            };
                        } else {
                            //退票审核，
                            return {
                                content : `${this.$t('refundAndAudit')}，${this.$t('passedNum')}：${contentsObj.passNum}
                            ${'passOrderTicketIds' in contentsObj ? ( '，' + this.$t('productDetailNo') + '：' + contentsObj.passOrderTicketIds ) : '' }
                            ${contentsObj['remark'] ? ( '，' + this.$t('remark') + '：' + contentsObj.remark + ',' ) : '' }
                            ${this.$t('rejectedNum')}：${contentsObj.rejectNum}。`,
                                className : contentsObj.rejectedNum === '0' ? 'green-status' : 'red-status'
                            };
                        }
                    //订单改签申请
                    case 'ORDER_ALTER_APPLY' :
                        // 申请改签，数量：
                        return {
                            content : `${this.$t('applyForUpgrade')}，
                           ${this.$t('quantity')}：${contentsObj.reqNum}，
                           ${this.$t('applyForUpgradeTo')}：${contentsObj.afterAlterDate}。`
                        };
                    //订单改签审核
                    case 'ORDER_ALTER_AUDIT' :
                        //是否是产品的日志信息
                        if (this.isProductLog) {
                            // 改签审核，通过数量：
                            return {
                                content : `${contentsObj.auditType === 'success' ? this.$t('checkPass') : this.$t('checkNoPass')}
                            ${contentsObj['alterDate'] ? ( '，' + this.$t('playDateUpgradeTo') + '：' + contentsObj.alterDate) : '' }
                            ${contentsObj['rejectNum'] ? ( '，' + this.$t('rejectedNum') + '：' + contentsObj.rejectNum ) : '' }
                            ${contentsObj['remark'] ? ( '，' + this.$t('remark') + '：' + contentsObj.remark + '。' ) : '' }`,
                                className : contentsObj.auditType === 'success' ? 'green-status' : 'red-status'
                            };
                        } else {
                            // 改签审核，通过数量：
                            return {
                                content : `${this.$t('alterAndAudit')}，
                            ${this.$t('passedNum')}：${contentsObj.passNum}
                            ${'passOrderTicketIds' in contentsObj ? ( '，' + this.$t('productDetailNo') + '：' + contentsObj.passOrderTicketIds ) : '' }
                            ${contentsObj['afterAlterDate'] ? ( '，' + this.$t('playDateUpgradeTo') + '：' + contentsObj.afterAlterDate ) : '' }
                            ${contentsObj['remark'] ? ( '，' + this.$t('remark') + '：' + contentsObj.remark) : '' }。`,
                                className : !contentsObj.passedNum === '0' ? 'red-status' : 'green-status'
                            };
                        }
                    //新建订单
                    case 'ORDER_NEW_ORDER' :
                        // 预定成功，预定数量：
                        return {
                            content : `${this.$t('reverseSuccess')}，${this.$t('reserveNum')}：${contentsObj.orderNum}。`
                        };
                    //新增票券
                    case 'ORDER_NEW_TICKET' :
                        // 预定成功
                        return {
                            content : this.$t('reverseSuccess') + '。'
                        };
                    //"团队订单审核驳回
                    case 'ORDER_AUDIT_REJECT' :
                        // 审核不通过，备注：
                        return {
                            content : `${this.$t('preCheckReject')}
                            ${contentsObj['remark'] ? ( '，' + this.$t('remark') + '：' + contentsObj.remark + '。') : '' }`
                        };
                    //"团队订单审核通过
                    case 'ORDER_AUDIT_PASS' :
                        // 审核通过，备注：
                        return {
                            content : `${this.$t('preCheckPass')}
                            ${contentsObj['remark'] ? ( '，' + this.$t('remark') + '：' + contentsObj.remark + '。') : '' }`
                        };
                    //核销
                    case 'ORDER_VERIFY_TICKET' :
                        //是否是产品的日志信息
                        if (this.isProductLog) {
                            // 核销数量：
                            return {
                                content : `${this.$t('verifySN')}：${contentsObj.checkSerialNo}
                            ${contentsObj['remark'] ? ( '，' + this.$t('remark') + '：' + contentsObj.remark + '。') : '' }`
                            };
                        } else {
                            // 核销数量：
                            return {
                                content : `${this.$t('verificationNum')}：${contentsObj.verifyNum}，
                            ${this.$t('productDetailNo')}：${contentsObj.ticketId}，
                            ${this.$t('verifySN')}：${contentsObj.checkSerialNo}
                            ${contentsObj['remark'] ? ( '，' + this.$t('remark') + '：' + contentsObj.remark + '。') : '' }`
                            };
                        }
                    //过期核销 -- 订单
                    case 'ORDER_OVERDUE_VERIFY' :
                        return {
                            content : `${this.$t('overDueVarifyNum')}：${contentsObj.verifyNum}，
                        ${this.$t('productDetailNo')}：${contentsObj.ticketId}，
                        ${this.$t('verifySN')}：${contentsObj.checkSerialNo}`
                        };
                    //过期核销 -- 产品明细
                    case 'ORDER_OVERDUE_VERIFY_TICKET' :
                        return {
                            content : `${this.$t('expiredVerify')}，${this.$t('verifySN')}：${contentsObj.checkSerialNo}`
                        };
                    //团队退单 -- 申请
                    case 'ORDER_CANCEL_APPLY' :
                        return {
                            content : `${this.$t('applyCancelOrder')}`
                        };
                    //团队退单 -- 驳回
                    case 'ORDER_CANCEL_AUDIT_REJECT' :
                        return {
                            content : `${this.$t('teamOrderCancelApply')}：${this.$t('reject')}
                        ${contentsObj['remark'] ? ( '，' + this.$t('remark') + '：' + contentsObj.remark + '。') : '' }`
                        };
                    case 'ORDER_CANCEL_AUDIT_PASS' :
                        return {
                            content : `${this.$t('teamOrderCancelApply')}：${this.$t('checkPass')}
                        ${contentsObj['remark'] ? ( '，' + this.$t('remark') + '：' + contentsObj.remark + '。') : '' }`
                        };
                    default : return '';
                }
            }
        },
        computed : {
            //操作记录数据处理
            operateLogDeal () {
                return this.orderRecordList.map(item => {
                    let contentDetail = this.getContentDetail(item);
                    return {
                        ...item,
                        className : contentDetail.className ?
                            contentDetail.className :
                            (this.constClassDefined[item.operationStatus] ?
                                this.constClassDefined[item.operationStatus] :
                                'blue-status'),
                        contentDeal : contentDetail.content
                    };
                });
            }
        }
    };
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
