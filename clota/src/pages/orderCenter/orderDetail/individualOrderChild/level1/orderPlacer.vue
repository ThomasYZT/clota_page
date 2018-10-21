<!--
    散客一级订单详情--下单人
    作者：杨泽涛
-->
<template>
    <div class="order-placer">
        <div class="title">散客订单基本信息</div>

        <ul class="detail">
            <li class="row">
                <ul class="list">
                    <li class="col">下单人姓名：{{orderVisitor.visitorName | contentFilter}}</li>
                    <li class="col">下单人身份证：{{documentInfo | contentFilter}}</li>
                    <li class="col">下单人手机号：{{orderVisitor.phoneNumber | contentFilter}}</li>
                </ul>
            </li>
        </ul>
    </div>

</template>

<script>

    export default {
        props: {
            //下单人信息
            orderVisitor: {
                type: Object,
                default: {}
            }
        },
        components: {},
        data() {
            return {}
        },
        computed: {
            documentInfo() {
                if(this.orderVisitor.documentInfo) {
                    let documentInfo = JSON.parse(this.orderVisitor.documentInfo);
                    return documentInfo[0].data;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .order-placer{
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

        .detail{
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

    }
</style>
