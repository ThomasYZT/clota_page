<!---->

<template>
    <div class="use-explain">
        <div class="title">
            <span class="iconfont icon-alipay"></span>
            <span class="font-label">使用说明</span>
        </div>
        <ul class="explain-list">
            <li class="explain">1、仅限年卡成员使用</li>
            <li class="explain">2、年卡不可与其他优惠同时使用</li>
        </ul>
    </div>
</template>

<script>
    export default {
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

            .explain{
                font-size: $font_size_12px;
                color: #4A4A4A;
                line-height: 18px;
            }
        }
    }
</style>
