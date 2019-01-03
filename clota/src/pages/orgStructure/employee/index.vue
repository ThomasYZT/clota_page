<!--
    会员注册
    作者：杨泽涛
-->
<template>
    <div class="container">
        <router-view>
        </router-view>
    </div>
</template>

<script>

    export default {
        components : {},
        data () {
            return {};
        },
        methods : {}
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .container{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color-fff;
        border-radius: 4px;
    }
</style>
