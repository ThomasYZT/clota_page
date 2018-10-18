<!--
内容：
作者：
日期：
-->

<template>
    <div class="">
        <div class="block-title">{{$t('散客订单基本信息')}}</div>
        <div class="form-wrap">
            <div class="form-item-wrap">
                <label>{{$t("订单明细编号")}}：</label><span v-w-title="moduleInfo.orderDetailNo">{{moduleInfo.orderDetailNo | contentFilter}}</span>
            </div>
            <div class="form-item-wrap">
                <label>{{$t("OTA订单号")}}：</label><span v-w-title="moduleInfo.thirdOrderNo">{{moduleInfo.thirdOrderNo | contentFilter}}</span>
            </div>
            <div class="form-item-wrap">
                <label>{{$t("下单时间")}}：</label><span>{{moduleInfo.orderTime | contentFilter}}</span>
            </div>
            <div class="form-item-wrap">
                <label>{{$t("所属景区")}}：</label><span>{{moduleInfo.scenic | contentFilter}}</span>
            </div>
            <div class="form-item-wrap">
                <label>{{$t("发售机构")}}：</label><span>{{moduleInfo.saleOrg | contentFilter}}</span>
            </div>
            <div class="form-item-wrap">
                <label>{{$t("下单渠道")}}：</label><span>{{moduleInfo.orderChannel | contentFilter}}</span>
            </div>
            <div class="form-item-wrap">
                <label>{{$t("下单企业")}}：</label><span>{{moduleInfo.channel | contentFilter}}</span>
            </div><div class="form-item-wrap">
                <label>{{$t("串码")}}：</label><span v-w-title="moduleInfo.serialNo">{{moduleInfo.serialNo | contentFilter}}</span>
            </div><div class="form-item-wrap">
                <label>{{$t("短信发送状态")}}：</label><span>{{moduleInfo.smsStatus | contentFilter}}</span>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">

    export default {
        components: {},
        props: {
            moduleInfo: Object
        },
        data() {
            return {}
        },

    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .block-title {
        @include info-block-title(20px, 20px, 18px, 14px, $color_blue, 4px);
    }

    .form-wrap{
        width: 100%;
        margin-top: 15px;
        @include clearfix();

        .form-item-wrap{
            width: 30%;
            float: left;
            margin-right: 10px;
            height: 30px;
            line-height: 30px;
            font-size: $font_size_14px;
            color: $color-666;
            display: flex;
            >label{
                color: $color-333;
            }
            >span{
                flex: 1;
                display: inline-block;
                vertical-align: middle;
                @include overflow_tip();
            }
        }
    }
</style>
