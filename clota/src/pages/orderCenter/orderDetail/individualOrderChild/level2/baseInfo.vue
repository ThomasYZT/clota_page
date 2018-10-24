<!--
    散客订单二级详情--基本信息
    作者：杨泽涛
-->
<template>
    <div class="individual-order-base-info">
        <div class="title">散客订单基本信息</div>
        <!--下单企业视图-->
        <ul class="order-detail">
            <li class="row">
                <ul class="list">
                    <li class="col">订单明细编号：{{baseInfo.orderDetailNo | contentFilter}}</li>
                    <li class="col">OTA订单号：{{baseInfo.thirdOrderNo | contentFilter}}</li>
                    <li class="col">下单时间：{{baseInfo.thirdOrderNo | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <li class="col">所属景区：{{baseInfo.scenic | contentFilter}}</li>
                    <li class="col">发售机构：{{baseInfo.saleOrg | contentFilter}} </li>
                    <li class="col">下单渠道：{{baseInfo.orderChannel | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <li class="col">下单企业：{{baseInfo.channel | contentFilter}}</li>
                    <li class="col">串码：<span class="code">{{baseInfo.serialNo | contentFilter}}</span></li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        props: {
            'baseInfo': {
                type: Object,
                default: {}
            }
        },
        components: {},
        data() {
            return {}
        },
        methods: {}
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

        .ivu-btn-108px{
            @include absolute_pos(absolute,20px,24px)
        }

    }
</style>

