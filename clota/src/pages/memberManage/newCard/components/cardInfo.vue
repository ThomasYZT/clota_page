<!--
内容：会员卡信息
作者：djc
日期：
-->

<template>
    <div class="card-info">
        <div class="card-info-title">{{$t('selectCardAttribution')}}</div>
        <i-col class="split-class">
            <span class="key-label">{{$t('colonSetting',{ key : $t('memberCardType') })}}</span>
            <span class="value-label">{{memberInfo.levelDesc | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">{{$t('colonSetting',{ key : $t('effectiveStartDate') })}}</span>
            <span class="value-label">{{memberInfo.effDate | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">{{$t('colonSetting',{ key : $t('effectiveEndDate') })}}</span>
            <span class="value-label">{{memberInfo.expDate | contentFilter}}</span>
        </i-col>
    </div>
</template>
<script type="text/ecmascript-6">

    export default {
        components : {},
        props : {
            //会员信息
            'member-info' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {};
        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .card-info{
        width: 850px;
        margin: 0 auto;

        .card-info-title{
            text-align: center;
            font-size: $font_size_16px;
            color: $color_333;
            padding: 47px 0 16px 0;
        }
        .split-class{
            width: 33%;
            height: 34px;
            padding: 6px 0;
            font-size: $font_size_14px;
            display: inline-flex;

            .key-label{
                color: $color_333;
            }

            .value-label{
                flex: 1;
                color: $color_666;
                @include overflow_tip();
            }
        }
    }
</style>
