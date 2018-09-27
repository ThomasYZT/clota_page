<!--卡包说明-->

<template>
    <div class="use-explain">
        <div class="title">
            <span class="iconfont icon-alipay"></span>
            <span class="font-label">{{$t('instructions')}}</span>
        </div>
        <div class="explain-list">
            {{explain}}
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            //订单说明
            'explain' : {
                type : String,
                default : ''
            }
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';

    .use-explain{
        margin-top: 8.5px;
        background: $color_fff;
        min-height: 118px;

        .explain-list{
            padding: 10px 24px;
            font-size: $font_size_12px;
            color: #4A4A4A;
            line-height: 18px;
        }
    }
</style>
