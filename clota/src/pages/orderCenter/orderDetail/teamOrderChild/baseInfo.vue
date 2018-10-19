<!--团队订单基本信息-->

<template>
    <div class="team-order-base-info">
        <div class="title">团队订单基本信息</div>
        <!--下单企业视图-->
        <ul class="order-detail" v-if="viewType === 'channel'">
            <li class="row">
                <ul class="list">
                    <li class="col">订单编号：{{baseInfo.orderNo | contentFilter}}</li>
                    <li class="col">下单时间：{{baseInfo.createdTime | contentFilter}}</li>
                    <li class="col">支付状态：{{baseInfo.paymentStatus | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <li class="col">支付方式：{{baseInfo.paymentType | contentFilter}} </li>
                    <li class="col">支付时间：{{baseInfo.paymentTime | contentFilter}}</li>
                    <li class="col">所属景区：{{baseInfo.scenic | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <li class="col">发售机构：{{baseInfo.saleOrg | contentFilter}} </li>
                    <li class="col">下单渠道：{{baseInfo.orderChannel | contentFilter}}</li>
                    <li class="col">订单金额：{{baseInfo.orderAmount | moneyFilter |  contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <li class="col">取票串码：<span class="code">{{baseInfo.serialNo | contentFilter}}</span> </li>
                    <li class="col">游玩日期：{{baseInfo.originVisitDate | contentFilter}}</li>
                </ul>
            </li>
        </ul>
        <!--景区视图-->
        <ul class="order-detail" v-else-if="viewType === 'scenic'">
            <li class="row">
                <ul class="list">
                    <li class="col">订单编号：{{baseInfo.orderNo | contentFilter}}</li>
                    <li class="col">下单时间：{{baseInfo.createdTime | contentFilter}}</li>
                    <li class="col">支付状态：{{baseInfo.paymentStatus | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <li class="col">支付方式：{{baseInfo.paymentType | contentFilter}} </li>
                    <li class="col">支付时间：{{baseInfo.paymentTime | contentFilter}}</li>
                    <li class="col">所属景区：{{baseInfo.scenic | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <li class="col">发售机构：{{baseInfo.saleOrg | contentFilter}} </li>
                    <li class="col">下单渠道：{{baseInfo.orderChannel | contentFilter}}</li>
                    <li class="col">下单企业：{{baseInfo.channel | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <li class="col">订单金额：{{baseInfo.orderAmount | moneyFilter | contentFilter}}</li>
                    <li class="col">取票串码：<span class="code">{{baseInfo.serialNo | contentFilter}}</span> </li>
                    <li class="col">游玩日期：{{baseInfo.originVisitDate | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <li class="col">短信发送状态：{{baseInfo.smsStatus | contentFilter}}</li>
                </ul>
            </li>
        </ul>

        <!--中间分销商视图-->
        <ul class="order-detail" v-else-if="viewType === 'allocation'">
            <li class="row">
                <ul class="list">
                    <li class="col">订单编号：{{baseInfo.orderNo | contentFilter}}</li>
                    <li class="col">下单时间：{{baseInfo.createdTime | contentFilter}}</li>
                    <li class="col">支付状态：{{baseInfo.paymentStatus | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <li class="col">支付方式：{{baseInfo.paymentType | contentFilter}} </li>
                    <li class="col">支付时间：{{baseInfo.paymentTime | contentFilter}}</li>
                    <li class="col">所属景区：{{baseInfo.scenic | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <li class="col">游玩日期：{{baseInfo.originVisitDate | contentFilter}}</li>
                    <li class="col">发售机构：{{baseInfo.saleOrg | contentFilter}} </li>
                    <li class="col">下单渠道：{{baseInfo.orderChannel | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <li class="col">下单企业：{{baseInfo.channel | contentFilter}}</li>
                </ul>
            </li>
        </ul>

        <Button  type="primary" class="ivu-btn-108px" @click="reSendMsg">重发短信</Button>
    </div>
</template>

<script>
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
                ajax.post('reSendMsg',{
                    visitorProductId : this.baseInfo.visitorProductId
                }).then(res => {
                    if(res.success){
                        this.$Message.success('发送成功');
                    }else{
                        this.$Message.error('发送失败');
                    }
                });
            }
        },
        computed : {
            //是否可以重发短信
            canResendMsg () {

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
    }
</style>
