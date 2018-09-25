<!--可用范围-->

<template>

    <div class="use-area">
        <div class="title">
            <span class="iconfont icon-alipay"></span>
            <span class="font-label">可用范围</span>
        </div>
        <div class="scene-list">
            <span class="scene">北京欢乐谷景区</span>
            <span class="scene">北京欢乐谷景区</span>
            <span class="scene">北京景区</span>
            <span class="scene">北京欢乐谷景区北京欢乐谷景区</span>
            <span class="scene">北京欢乐谷景区</span>
            <span class="scene">北京欢乐谷景区</span>
        </div>
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

    .use-area{
        margin-top: 8.5px;
        background: $color_fff;
        min-height: 118px;

        .scene-list{
            padding: 12px 14px;

            .scene{
                display: inline-block;
                border-radius: 100px;
                height: 34px;
                background: $color_fafa;
                padding: 7px 14px;
                line-height: 20px;
                margin-bottom: 8px;
            }
        }
    }
</style>
