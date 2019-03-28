<!--
内容：积分账户信息
作者：djc
日期：
-->

<template>
    <div class="charge-account-info">
        <div class="title">{{$t(accountInfo.accountName) | contentFilter}}</div>
        <ul class="table-wrap">
            <li class="wrap-li">
                <span class="label-key">{{$t('colonSetting' , { key : $t('pointBalance') })}}</span>
                <span class="label-value">{{ parseInt(accountInfo.accountBalance) | contentFilter }}</span>
            </li>
        </ul>
        <div class="operate-taps">
            <slot></slot>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import tableCom from '@/components/tableCom/tableCom.vue';

    export default {
        components : { tableCom },
        props : {
            //积分账户信息
            'account-info' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {
            };
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .charge-account-info{
        @include block_outline($height : auto);
        border: 1px solid #E9E9E9;
        border-radius: 3px 3px 0 0;
        margin-bottom: 20px;
        overflow: auto;

        &:nth-last-of-type(1) {
            margin-bottom: 0;
        }

        .title{
            @include block_outline($height : 40px);
            background: rgba(245,247,250,0.50);
            line-height: 40px;
            font-size: $font_size_14px;
            color: rgba(0,0,0,0.85);
            padding-left: 20px;
            border-bottom: 1px solid #E9E9E9;
        }

        .table-wrap{
            @include block_outline($width : auto,$height : 60px);
            padding: 20px 0 20px 30px;
            display: inline-block;
            float: left;

            .wrap-li{
                float: left;
                margin-right: 50px;
            }
        }

        .operate-taps{
            @include block_outline(auto, 60px);
            float: right;
            margin-right: 34px;
            padding: 20px 0;
        }
    }
</style>
