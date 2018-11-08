<!--
内容：会员卡信息
作者：djc
日期：
-->

<template>
    <div class="card-info">
        <div class="block-title">{{$t('会员卡信息')}}</div>
        <i-col class="split-class">
            <span class="key-label">会员卡类型：</span>
            <span class="value-label">{{memberInfo.levelDesc | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">有效开始日期：</span>
            <span class="value-label">{{memberInfo.effDate | contentFilter}}</span>
        </i-col>
        <i-col class="split-class">
            <span class="key-label">有效结束日期：</span>
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
