<!--
    帮助中心
    作者：杨泽涛
-->
<template>
    <div class="helper-center">
        <menuTree></menuTree>
    </div>
</template>

<script>
    import menuTree from './components/menuTree'
    export default {
        components : {
            menuTree
        },
        data () {
            return {};
        },
        methods : {}
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .helper-center {
        @include block_outline();
        overflow: auto;
        background: $color_fff;
    }
</style>
