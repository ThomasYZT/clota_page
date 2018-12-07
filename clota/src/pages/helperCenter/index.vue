<!--
    帮助中心
    作者：杨泽涛
-->
<template>
    <div class="helper-center">
        <div class="article-wrapper">
            <menuTree :nowItem.sync="nowItem"></menuTree>
        </div>

        <div class="menu-tree-wrapper">
            <helperArticle :pageInfo="nowItem"></helperArticle>
        </div>
    </div>
</template>

<script>
    import helperArticle from './components/helperArticle';
    import menuTree from './components/menuTree';
    export default {
        components : {
            helperArticle,
            menuTree
        },
        data () {
            return {
                nowItem : {}
            };
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
        min-width: $content_min_width;
        overflow: auto;
        background: $color-fff;
        border-radius: 4px;

        .article-wrapper {
            padding-right: 10px;
            flex: 1 0;
            flex-basis: 20%;
            border-right: 1px solid $color_gray;
        }

        .menu-tree-wrapper {
            flex: 1 0;
            flex-basis: 80%;
        }
    }
</style>
