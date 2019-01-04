<!--
    散客订单二级详情--基本信息
    作者：杨泽涛
-->
<template>
    <div class="individual-order-base-info">
        <div class="title">{{$t('individualOrderBaseInfo')}}</div>
        <!--下单企业和景区视图内容只相差一个字段，因此只和分销商做区分-->
        <ul class="order-detail">
            <li class="row">
                <ul class="list">
                    <li class="col">{{$t('orderDetailNo')}}：{{baseInfo.orderDetailNo | contentFilter}}</li>
                    <li class="col">{{$t('OTAOrderNo')}}：{{baseInfo.thirdOrderNo | contentFilter}}</li>
                    <li class="col">{{$t('orderTime')}}：{{baseInfo.createdTime | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <li class="col">{{$t('scenePlace')}}：{{baseInfo.orgName | contentFilter}}</li>
                    <li class="col">{{$t('sellingOrg')}}：{{baseInfo.saleAgency | contentFilter}} </li>
                    <li class="col">{{$t('orderChannel')}}：{{baseInfo.orderChannel ? $t('order.' + baseInfo.orderChannel) : '' | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <li class="col">{{$t('orderOrg')}}：{{baseInfo.placeOrderOrgName | contentFilter}}</li>
                    <li class="col">{{$t('SN')}}：<span class="code">{{baseInfo.serialNo | contentFilter}}</span></li>
                    <li class="col">{{$t('smsStatus')}}：{{$t(transSMSStatus(baseInfo.smsStatus)) | contentFilter}}</li>

                </ul>
            </li>
        </ul>

        <div class="buttun-wrapper">
            <Button v-if="canToUpOrder"
                    type="primary"
                    @click.native="toUpDetail">
                {{$t('CheckOrdersFromSuperiors')}}
            </Button>
            <Button :disabled="!canResendMsg"
                    type="primary"
                    @click="reSendMsg">
                {{$t('reSending')}}
            </Button>
        </div>

        <div class="audit-result">
            <img :src="auditResultImg" alt="">
        </div>
    </div>
</template>

<script>
    import ajax from '@/api/index.js';
    import { transSMSStatus } from '../../../commFun';
    export default {
        props : {
            'baseInfo' : {
                type : Object,
                default : {}
            },
        },
        computed : {
            //是否异常显示
            auditResultImg () {
                if (this.baseInfo.smsStatus === 'failure' || this.baseInfo.syncStatus === 'failure') {
                    return require('../../../../../assets/images/icon-abnormal.svg');
                }
            },
            //是否可以重发短信
            canResendMsg () {
                //未取票数量大于0,且从订单查询页面跳转过啦，可以重新发送短信
                return this.smsLeft >= 0 && this.smsLeft <= 5 &&
                    (this.baseInfo.quantity - this.baseInfo.quantityRefunded - this.baseInfo.quantityPicked > 0) &&
                    this.$route.name === 'individualOrderDetail2Level';
            },
            //是否可以查看上级订单
            canToUpOrder () {
                //只有从订单查询过来查看详情才可以查看上级订单
                return this.$route.name === 'individualOrderDetail2Level';
            }
        },
        data () {
            return {
                //转换短信发送状态
                transSMSStatus : transSMSStatus,
                //短信重发次数
                smsLeft : -1
            };
        },
        methods : {
            //查看上级订单
            toUpDetail () {
                this.$router.push({
                    name : 'individualOrderDetail1Level',
                    params : {
                        orderDetail : this.baseInfo
                    }
                });
            },
            /**
             * 给游客重发短信
             */
            reSendMsg () {
                ajax.post('resendSMS',{
                    visitorProductId : this.baseInfo.visitorProductId
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('sending') }));
                    } else {
                        this.$Message.error(this.$t('failureTip',{ tip : this.$t('sending') }));
                    }
                    this.checkResendSMS();
                });
            },
            /**
             * 校验重发短信次数
             */
            checkResendSMS () {
                ajax.post('checkResendSMS',{
                    visitorProductId : this.baseInfo.visitorProductId
                }).then(res => {
                    if (res.status === 200) {
                        this.smsLeft = res.data;
                    } else {
                        this.smsLeft = -1;
                    }
                });
            }
        },
        watch : {
            baseInfo (newVal) {
                if (newVal && Object.keys(newVal).length > 0) {
                    this.checkResendSMS();
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .individual-order-base-info{
        border-radius: 2px;
        margin: 10px 0 6px;
        padding: 2px 0 16px 0;
        position: relative;
        background: #f5f7fa;

        .title{
            position: relative;
            padding: 15px 0 0 0;
            @include block_outline($height : 50px);
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
        .buttun-wrapper {
            @include absolute_pos(absolute,20px,10px);

            .ivu-btn-primary{
                margin-left: 10px;
            }
        }

        .audit-result{
            @include absolute_pos(absolute,$right : 0,$bottom : 0);

            img{
                @include block_outline(100,100,false);
            }
        }
    }
</style>

