<!--
    综合设置
    作者：杨泽涛
-->
<template>
    <div class="comprehensive-setup">
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        components : {
        },
        data () {
            return {};
        },
        methods : {}
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .comprehensive-setup {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color_fff;
        border-radius : 4px;
    }
</style>
