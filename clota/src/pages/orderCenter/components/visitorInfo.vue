<!--
内容：
作者：
日期：
-->

<template>
    <div class="">
        <div class="block-title">{{$t('游客信息')}}</div>
        <div class="form-wrap">
            <div class="form-item-wrap">
                <label>{{$t("游客姓名")}}：</label><span>{{moduleInfo.visitorName | contentFilter}}</span>
            </div>
            <div class="form-item-wrap">
                <label>{{$t("手机号")}}：</label><span>{{moduleInfo.phoneNumber | contentFilter}}</span>
            </div>
            <!--站位标签-->
            <div class="form-item-wrap"></div>
            <div class="form-item-wrap">
                <label>{{$t("证件类型")}}：</label><span>{{moduleInfo.documentInfo.type | contentFilter}}</span>
            </div>
            <div class="form-item-wrap">
                <label>{{$t("证件号码")}}：</label><span>{{moduleInfo.documentInfo.data | contentFilter}}</span>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">

    export default {
        components: {},
        props: {
            moduleInfo: Object,
        },
        data() {
            return {}
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
