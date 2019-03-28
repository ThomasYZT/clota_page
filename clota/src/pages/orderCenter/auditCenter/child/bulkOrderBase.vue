<!--
内容：散客订单基本信息
作者：djc
日期：
-->

<template>
    <div class="">
        <!--散客订单基本信息-->
        <div class="block-title">{{$t('individualOrderBaseInfo')}}</div>
        <div class="form-wrap">
            <!--订单明细编号-->
            <div class="form-item-wrap">
                <label>{{$t("orderDetailNo")}}：</label><span v-w-title="moduleInfo.orderDetailNo">{{moduleInfo.orderDetailNo | contentFilter}}</span>
            </div>
            <!--OTA订单号-->
            <div class="form-item-wrap">
                <label>{{$t("OTAOrderNo")}}：</label><span v-w-title="moduleInfo.thirdOrderNo">{{moduleInfo.thirdOrderNo | contentFilter}}</span>
            </div>
            <!--下单时间-->
            <div class="form-item-wrap">
                <label>{{$t("orderTime")}}：</label><span>{{moduleInfo.orderTime | contentFilter}}</span>
            </div>
            <!--所属景区-->
            <div class="form-item-wrap">
                <label>{{$t("scenePlace")}}：</label><span>{{moduleInfo.scenic | contentFilter}}</span>
            </div>
            <!--发售机构-->
            <div class="form-item-wrap">
                <label>{{$t("sellingOrg")}}：</label><span>{{moduleInfo.saleOrg | contentFilter}}</span>
            </div>
            <!--下单渠道-->
            <div class="form-item-wrap">
                <label>{{$t("orderChannel")}}：</label><span>{{$t(transOrderOrg(moduleInfo.orderChannel))}}</span>
            </div>
            <!--下单企业-->
            <div class="form-item-wrap">
                <label>{{$t("orderOrg")}}：</label><span>{{moduleInfo.channel | contentFilter}}</span>
            </div>
            <!--串码-->
            <div class="form-item-wrap">
                <label>{{$t("SN")}}：</label><span class="serial-num" v-w-title="moduleInfo.serialNo">{{moduleInfo.serialNo | contentFilter}}</span>
            </div>
            <!--短信发送状态-->
            <div class="form-item-wrap">
                <label>{{$t("smsStatus")}}：</label><span>{{$t(transSMSStatus(moduleInfo.smsStatus))}}</span>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import { transOrderOrg, transSMSStatus } from '../../commFun';

    export default {
        components : {},
        props : {
            moduleInfo : Object
        },
        data () {
            return {};
        },
        methods : {
            // 下单渠道code转换
            transOrderOrg : transOrderOrg,
            // 短信发送状态code转换
            transSMSStatus : transSMSStatus,
        },

    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .block-title {
        margin: 15px 0;
        @include info-block-title(20px, 20px, 18px, 14px, $color_blue, 4px);
    }

    .form-wrap{
        width: 100%;
        margin-top: 15px;
        padding: 0 28px;
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

        .serial-num {
            color: $color_yellow;
        }
    }
</style>
