<!--
内容：游客信息
作者：djc
日期：
-->

<template>
    <div class="">
        <!--游客信息-->
        <div class="block-title">{{$t('touristInfo')}}</div>
        <div class="form-wrap">
            <!--游客姓名-->
            <div class="form-item-wrap">
                <label>{{$t("touristName")}}：</label><span>{{moduleInfo.visitorName | contentFilter}}</span>
            </div>
            <!--手机号-->
            <div class="form-item-wrap">
                <label>{{$t("mobilePhone")}}：</label><span>{{moduleInfo.phoneNumber | contentFilter}}</span>
            </div>
            <!--站位标签-->
            <div class="form-item-wrap"></div>
            <!--证件类型-->
            <div class="form-item-wrap">
                <label>{{$t("credentialsType")}}：</label><span>{{moduleInfo.documentInfo.type | contentFilter}}</span>
            </div>
            <!--证件号码-->
            <div class="form-item-wrap">
                <label>{{$t("IdentificationNumber")}}：</label><span>{{moduleInfo.documentInfo.data | contentFilter}}</span>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">

    export default {
        components : {},
        props : {
            moduleInfo : Object,
        },
        data () {
            return {};
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
    }
</style>
