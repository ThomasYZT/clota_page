<!--
    散客订单二级详情--基本信息
    作者：杨泽涛
-->
<template>
    <div class="individual-order-base-info">
        <div class="title">散客订单基本信息</div>
        <!--下单企业和景区视图内容只相差一个字段，因此只和分销商做区分-->
        <ul class="order-detail">
            <li class="row">
                <ul class="list">
                    <li class="col">订单明细编号：{{baseInfo.orderDetailNo | contentFilter}}</li>
                    <li class="col">OTA订单号：{{baseInfo.thirdOrderNo | contentFilter}}</li>
                    <li class="col">下单时间：{{baseInfo.thirdOrderNo | timeFormat('yyyy-MM-dd')}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <li class="col">所属景区：{{baseInfo.scenic | contentFilter}}</li>
                    <li class="col">发售机构：{{baseInfo.saleOrg | contentFilter}} </li>
                    <li class="col">下单渠道：{{$t(baseInfo.orderChannel) | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <li class="col">下单企业：{{baseInfo.channel | contentFilter}}</li>
                    <!--仅下单企业和景区视图可见字段-->
                    <li v-if="orderOrgType === 'channel' || orderOrgType === 'scenic'"
                        class="col">串码：<span class="code">{{baseInfo.serialNo | contentFilter}}</span></li>
                    <!--仅景区视图字段-->
                    <li v-if="orderOrgType === 'scenic'" class="col">短信发送状态：{{transSMSStatus(baseInfo.smsStatus) | contentFilter}}</li>
                    <!--仅分销商视图字段-->
                    <li v-if="orderOrgType === 'allocation'" class="col">预定数量：{{transSMSStatus(baseInfo.quantity) | contentFilter}}</li>

                </ul>
            </li>
        </ul>

        <div class="buttun-wrapper">
            <Button type="primary"  @click.native="toUpDetail">查看上级订单</Button>
            <Button v-if="canResendMsg" type="primary" @click="reSendMsg">重发短信</Button>
        </div>

        <div class="audit-result">
            <img :src="auditResultImg" alt="">
        </div>
    </div>
</template>

<script>
    import ajax from '../../../../../api/index'
    import {transSMSStatus} from '../../../commFun'
    export default {
        props: {
            'baseInfo': {
                type: Object,
                default: {}
            },
            'view-type': {
                type: String,
                default: ''
            }
        },
        computed: {
            //机构对应订单角色
            orderOrgType() {
                if(Object.keys(this.baseInfo).length > 0 && this.baseInfo.orderOrgType) {
                    return this.baseInfo.orderOrgType;
                }else {
                    return '';
                }
            },
            //审核结果图片
            auditResultImg () {
                if(this.baseInfo.auditStatus === 'success'){
                    return require('../../../../../assets/images/icon-audit-success.svg');
                }else if(this.baseInfo.auditStatus === 'audit'){
                    return require('../../../../../assets/images/icon-wait-audit.svg');
                }else{
                    return require('../../../../../assets/images/icon-audit-fail.svg');
                }
            },
        },
        data() {
            return {
                //转换短信发送状态
                transSMSStatus: transSMSStatus
            }
        },
        methods: {
            //是否可以重发短信
            canResendMsg () {
                //景区下，审核成功，取票前可重发短信
                return this.viewType === 'scenic' &&
                    this.baseInfo.auditStatus === 'success' &&
                    (this.baseInfo.quantity > this.baseInfo.quantityPicked) ;
            },
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
                ajax.post('noticeGuidesAuditResult',{
                    visitorProductId : this.baseInfo.visitorProductId
                }).then(res => {
                    if(res.success){
                        this.$Message.success('发送成功');
                    }else{
                        this.$Message.error('发送失败');
                    }
                });
            },
        }
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
        .buttun-wrapper {
            @include absolute_pos(absolute,20px,24px)
            .ivu-btn-108px{
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

