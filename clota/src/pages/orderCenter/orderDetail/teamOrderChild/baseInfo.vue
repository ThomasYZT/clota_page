<!--团队订单基本信息-->

<template>
    <div class="team-order-base-info">
        <!--团队订单基本信息-->
        <div class="title">{{$t('teamOrderBaseInfo')}}</div>
        <!--下单企业视图-->
        <ul class="order-detail" v-if="viewType === 'channel'">
            <li class="row">
                <ul class="list">
                    <!--订单编号-->
                    <li class="col">{{$t('orderNo')}}：{{baseInfo.orderNo | contentFilter}}</li>
                    <!--下单时间-->
                    <li class="col">{{$t('orderTime')}}：{{baseInfo.createdTime | contentFilter}}</li>
                    <!--支付状态-->
                    <li class="col">{{$t('paymentStatus')}}：{{$t(transPaymentStatus(baseInfo.paymentStatus)) | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <!--支付方式-->
                    <li class="col">{{$t('payType')}}：{{$t('payType.' + baseInfo.paymentType) | contentFilter}} </li>
                    <!--支付时间-->
                    <li class="col">{{$t('paymentTime')}}：{{baseInfo.paymentTime | contentFilter}}</li>
                    <!--所属景区-->
                    <li class="col">{{$t('scenePlace')}}：{{baseInfo.scenic | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <!--发售机构-->
                    <li class="col">{{$t('sellingOrg')}}：{{baseInfo.saleOrg | contentFilter}} </li>
                    <!--下单渠道-->
                    <li class="col">{{$t('orderChannel')}}：{{$t(baseInfo.orderChannel) | contentFilter}}</li>
                    <!--订单金额-->
                    <li class="col">{{$t('orderAmount')}}：{{baseInfo.orderAmount | moneyFilter |  contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <!--取票串码-->
                    <li class="col">{{$t('ticketGetterSN')}}：<span class="code">{{baseInfo.serialNo | contentFilter}}</span> </li>
                    <!--游玩日期-->
                    <li class="col">{{$t('playDate')}}：{{baseInfo.originVisitDate | contentFilter}}</li>
                </ul>
            </li>
        </ul>
        <!--景区视图-->
        <ul class="order-detail" v-else-if="viewType === 'scenic'">
            <li class="row">
                <ul class="list">
                    <!--订单编号-->
                    <li class="col">{{$t('orderNo')}}：{{baseInfo.orderNo | contentFilter}}</li>
                    <!--下单时间-->
                    <li class="col">{{$t('orderTime')}}：{{baseInfo.createdTime | contentFilter}}</li>
                    <!--支付状态-->
                    <li class="col">{{$t('paymentStatus')}}：{{$t(transPaymentStatus(baseInfo.paymentStatus)) | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <!--支付方式-->
                    <li class="col">{{$t('payType')}}：{{$t('payType.' + baseInfo.paymentType) | contentFilter}} </li>
                    <!--支付时间-->
                    <li class="col">{{$t('paymentTime')}}：{{baseInfo.paymentTime | contentFilter}}</li>
                    <!--所属景区-->
                    <li class="col">{{$t('scenePlace')}}：{{baseInfo.scenic | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <!--发售机构-->
                    <li class="col">{{$t('sellingOrg')}}：{{baseInfo.saleOrg | contentFilter}} </li>
                    <!--下单渠道-->
                    <li class="col">{{$t('orderChannel')}}：{{$t(baseInfo.orderChannel) | contentFilter}}</li>
                    <!--下单企业-->
                    <li class="col">{{$t('orderOrg')}}：{{baseInfo.channel | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <!--订单金额-->
                    <li class="col">{{$t('orderAmount')}}：{{baseInfo.orderAmount | moneyFilter | contentFilter}}</li>
                    <!--取票串码-->
                    <li class="col">{{$t('ticketGetterSN')}}：<span class="code">{{baseInfo.serialNo | contentFilter}}</span> </li>
                    <!--游玩日期-->
                    <li class="col">{{$t('playDate')}}：{{baseInfo.originVisitDate | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <!--短信发送状态-->
                    <li class="col">{{$t('smsStatus')}}：{{$t(transSMSStatus(baseInfo.smsStatus)) | contentFilter}}</li>
                </ul>
            </li>
        </ul>

        <!--中间分销商视图-->
        <ul class="order-detail" v-else-if="viewType === 'allocation'">
            <li class="row">
                <ul class="list">
                    <!--订单编号-->
                    <li class="col">{{$t('orderNo')}}：{{baseInfo.orderNo | contentFilter}}</li>
                    <!--下单时间-->
                    <li class="col">{{$t('orderTime')}}：{{baseInfo.createdTime | contentFilter}}</li>
                    <!--支付状态-->
                    <li class="col">{{$t('paymentStatus')}}：{{$t(transPaymentStatus(baseInfo.paymentStatus)) | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <!--支付方式-->
                    <li class="col">{{$t('payType')}}：{{$t('payType.' + baseInfo.paymentType) | contentFilter}} </li>
                    <!--支付时间-->
                    <li class="col">{{$t('paymentTime')}}：{{baseInfo.paymentTime | contentFilter}}</li>
                    <!--所属景区-->
                    <li class="col">{{$t('scenePlace')}}：{{baseInfo.scenic | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <!--游玩日期-->
                    <li class="col">{{$t('playDate')}}：{{baseInfo.originVisitDate | contentFilter}}</li>
                    <!--发售机构-->
                    <li class="col">{{$t('sellingOrg')}}：{{baseInfo.saleOrg | contentFilter}} </li>
                    <!--下单渠道-->
                    <li class="col">{{$t('orderChannel')}}：{{$t(baseInfo.orderChannel) | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <!--下单企业-->
                    <li class="col">{{$t('orderOrg')}}：{{baseInfo.channel | contentFilter}}</li>
                </ul>
            </li>
        </ul>

        <!--重发短信-->
        <Button  v-if="canResendMsg"
                 :disabled="!resendBtnCanUsed"
                 type="primary"
                 class="ivu-btn-108px"
                 @click="reSendMsg">
            {{$t('reSending')}}
        </Button>
        <div class="audit-result">
            <img :src="auditResultImg" alt="">
        </div>
    </div>
</template>

<script>
    import {transPaymentStatus,transSMSStatus} from '../../commFun';
    import ajax from '@/api/index.js';
    export default {
        props : {
            //基本信息
            'base-info' : {
                type : Object,
                default () {

                }
            },
            //当前显示的视图信息
            'view-type' : {
                type : String,
                default : ''
            },
            //产品信息
            'product-info-list' : {
                type : Array,
                default () {
                    return [];
                }
            },
            //订单是否过期
            'is-over-due' : {
                type : String,
                default : ''
            },
            //可重发短信次数
            'reSend-times' : {
                type: [String,Number],
                default: 0
            }
        },
        data() {
            return {}
        },
        methods: {
            /**
             * 给导游重发短信
             */
            reSendMsg () {
                ajax.post('noticeGuidesAuditResult',{
                    visitorProductId : this.baseInfo.visitorProductId
                }).then(res => {
                    if(res.success){
                        this.$Message.success(this.$t('successTip', {tip: this.$t('sending')}));  // 发送成功
                    }else{
                        this.$Message.error(this.$t('failureTip', {tip: this.$t('sending')}));    // 发送失败
                    }
                });
            },
            //支付状态过滤
            transPaymentStatus : transPaymentStatus,
            //短信发送状态
            transSMSStatus : transSMSStatus
        },
        computed : {
            //是否可以重发短信
            canResendMsg () {
                //景区下可显示重发短信按钮
                return this.viewType === 'scenic';
            },
            //审核结果图片
            auditResultImg () {
                //团队订单 已过期
                if (this.isOverdue === 'true') {
                    if (this.baseInfo.auditStatus === 'cancel_audit' || this.baseInfo.auditStatus === 'cancel_success') {
                        if (this.baseInfo.auditStatus === 'cancel_audit') {
                            return require('../../../../assets/images/icon-cancel-wait-audit.svg');
                        } else {
                            return require('../../../../assets/images/icon-canceled.svg');
                        }
                    } else {
                        return require('../../../../assets/images/icon-past-due.svg');
                    }
                } else {
                //团队订单 未过期
                    if (this.baseInfo.auditStatus === 'success') {
                        return require('../../../../assets/images/icon-audit-success.svg');
                    } else if(this.baseInfo.auditStatus === 'audit') {
                        return require('../../../../assets/images/icon-wait-audit.svg');
                    } else if (this.baseInfo.auditStatus === 'reject') {
                        return require('../../../../assets/images/icon-audit-fail.svg');
                    } else if (this.baseInfo.auditStatus === 'cancel_audit') {
                        return require('../../../../assets/images/icon-cancel-wait-audit.svg');
                    } else {
                        return require('../../../../assets/images/icon-canceled.svg');
                    }
                }
            },
            //重发短信按钮是否可以使用
            resendBtnCanUsed () {
                //可重发次数大于0，审核通过，有未取票的可以点击重发短信按钮
                return  this.reSendTimes > 0 &&
                    this.baseInfo.auditStatus === 'success' &&
                    this.productInfoList.some(item => item.quantityPicked + item.quantityRefunded === 0);
            }

        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .team-order-base-info{
        background: #F5F7FA;
        border-radius: 2px;
        margin: 10px 0 6px;
        padding: 2px 0 16px 0;
        position: relative;

        .title{
            position: relative;
            padding: 15px 0 0 0;
            @include block_outline($height : 45px);
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

        .order-detail{
            padding-left: 28px;

            .list{
                overflow: auto;

                .col{
                    font-size: $font_size_14px;
                    height: 31px;
                    padding: 6px 0;
                    float: left;
                    width: 310px;
                    color: $color_666;
                    @include overflow_tip();

                    .code{
                        color: $color_yellow;
                    }
                }
            }
        }

        .ivu-btn-108px{
            @include absolute_pos(absolute,20px,24px)
        }

        .audit-result{
            @include absolute_pos(absolute,$right : 0,$bottom : 0);

            img{
                @include block_outline(100,100,false);
            }
        }
    }
</style>
