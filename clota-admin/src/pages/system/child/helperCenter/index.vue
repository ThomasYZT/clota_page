<!--
    帮助中心
    作者：杨泽涛
-->
<template>
    <div class="helper-center">
        <div class="menu-wrapper">
            <menuTree></menuTree>
        </div>

        <div class="article-wrapper">
            <editPanel></editPanel>
        </div>
    </div>
</template>

<script>
    import menuTree from './components/menuTree';
    import editPanel from './components/editPanel';
    export default {
        components : {
            menuTree,
            editPanel
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
        padding: 20px;
        @include block_outline();
        display: flex;
        overflow: auto;
        background: $color_fff;

        .menu-wrapper {
            padding: 0 10px;
            flex: 1 0;
            flex-basis: 25%;
            border-right: 1px solid $color_gray;
        }

        .article-wrapper {
            padding: 0 20px;
            flex: 1 0;
            flex-basis: 75%;
        }
    }
</style>
