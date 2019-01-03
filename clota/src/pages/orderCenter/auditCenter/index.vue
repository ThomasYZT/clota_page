<!--
内容：审核中心
作者：djc
日期：
-->

<template>
    <div class="audit-center">
        <router-view>
        </router-view>
    </div>
</template>

<script>
    export default {
        data () {
            return {};
        },
        methods : {}
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .audit-center{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color_fff;
        border-radius : 4px;


    }
</style>
