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
                    <li class="col">{{$t('orderTime')}}：{{baseInfo.orderTime}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <li class="col">{{$t('scenePlace')}}：{{baseInfo.scenic | contentFilter}}</li>
                    <li class="col">{{$t('sellingOrg')}}：{{baseInfo.saleOrg | contentFilter}} </li>
                    <li class="col">{{$t('orderChannel')}}：{{baseInfo.orderChannel ? $t('order.' + baseInfo.orderChannel) : '' | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <li class="col">{{$t('orderOrg')}}：{{baseInfo.channel | contentFilter}}</li>
                    <!--仅下单企业和景区视图可见字段-->
                    <li v-if="orderOrgType === 'channel' || orderOrgType === 'scenic'"
                        class="col">{{$t('SN')}}：<span class="code">{{baseInfo.serialNo | contentFilter}}</span></li>
                    <!--仅景区视图字段-->
                    <li v-if="orderOrgType === 'scenic'" class="col">{{$t('smsStatus')}}：{{$t(transSMSStatus(baseInfo.smsStatus)) | contentFilter}}</li>
                    <!--仅分销商视图字段-->
                    <li v-if="orderOrgType === 'allocation'" class="col">{{$t('reserveNum')}}：{{baseInfo.quantity | contentFilter}}</li>

                </ul>
            </li>
        </ul>

        <div class="buttun-wrapper">
            <Button type="primary"  @click.native="toUpDetail">{{$t('CheckOrdersFromSuperiors')}}</Button>
            <Button v-if="canResendMsg"
                    :disabled="!resendBtnCanUsed"
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
    import ajax from '../../../../../api/index'
    import { transSMSStatus } from '../../../commFun'
    import { mapGetters } from 'vuex';
    export default {
        props: {
            'baseInfo': {
                type: Object,
                default: {}
            },
            'view-type': {
                type: String,
                default: ''
            },
            //可重发短信次数
            'reSend-times' : {
                type: [String,Number],
                default: 0
            }
        },
        computed: {
            ...mapGetters([
                'permissionInfo'
            ]),
            //权限是否允许可以重发短信
            perMissioncanResendSms () {
                return this.permissionInfo && 'resendSms' in this.permissionInfo;
            },
            //机构对应订单角色
            orderOrgType() {
                if(Object.keys(this.baseInfo).length > 0 && this.baseInfo.orderOrgType) {
                    return this.baseInfo.orderOrgType;
                }else {
                    return '';
                }
            },
            //是否异常显示
            auditResultImg () {
                if(this.baseInfo.smsStatus === 'failure' || this.baseInfo.syncStatus === 'failure'){
                    return require('../../../../../assets/images/icon-abnormal.svg');
                }
            },
            //是否可以重发短信
            canResendMsg () {
                //景区下，审核成功，取票前可重发短信
                return this.viewType === 'scenic' &&
                    this.perMissioncanResendSms;
            },
            //重发短信按钮是否可以使用
            resendBtnCanUsed () {
                return this.reSendTimes > 0;
            }
        },
        data() {
            return {
                //转换短信发送状态
                transSMSStatus: transSMSStatus,
            }
        },
        methods: {
            //查看上级订单
            toUpDetail() {
                this.$router.push({
                    name: 'individualFirstLevel',
                    params : {
                        orderId : this.baseInfo.orderId
                    }
                })
            },
            /**
             * 给导游重发短信
             */
            reSendMsg () {
                ajax.post('noticeVisitorToPick',{
                    visitorProductId : this.baseInfo.visitorProductId
                }).then(res => {
                    if(res.success){
                        this.$Message.success(this.$t('successTip',{ tip: this.$t('sending') }));
                    }else{
                        this.$Message.error(this.$t('failureTip',{ tip: this.$t('sending') }));
                    }
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .individual-order-base-info{
        border-radius: 2px;
        margin: 10px 0 6px;
        padding: 2px 0 16px 0;
        position: relative;

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
            @include absolute_pos(absolute,20px,0);

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

