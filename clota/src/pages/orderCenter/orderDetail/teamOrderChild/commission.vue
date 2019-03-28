<!--分销佣金-->

<template>
    <div class="commission">
        <div class="title">{{$t('distributionBrokerage')}}</div>
        <div class="money-detail">
            {{$t('EstimatedDistributionBrokerage')}}：{{allocationCommission | moneyFilter | contentFilter}}
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            //分销佣金
            allocationCommission : {
                type : [String,Number],
                default : ''
            }
        },
        data () {
            return {};
        },
        methods : {}
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .commission{

        .title{
            position: relative;
            padding: 15px 0;
            @include block_outline($height : 52px);
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

        .money-detail{
            font-size: $font_size_14px;
            color: $color_666;
            line-height: 20px;
            padding-left: 20px;
        }
    }
</style>
